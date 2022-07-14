import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';

import serviceSector from '../../../services/api/sector';
import newSectorStyle from '../../../styles/jss/material-dashboard-react/sections/newSectorStyle';
import AddAlert from '@material-ui/icons/AddAlert';
import Snackbar from '../../components/Snackbar/Snackbar';

class NewSector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  //se crea el sector
  createSector = async e => {
    e.preventDefault();

    const fields = ['name', 'code'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    const response = await serviceSector.create(formValues);

    if (response.type === 'CREATED_SUCCESSFUL') {
      this.setState({ notification: true });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, name, code } = this.props;
    const { errors } = this.state;
    return (
      <div id="section-new-sector">
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.errors}`
              : 'Sector creado correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <form onSubmit={this.createSector}>
              <Card>
                <CardHeader color="gamsBlue">
                  <h4 className={classes.cardTitleWhite}>Nuevo Sector</h4>
                  <p className={classes.cardCategoryWhite}>Complete los campos</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <CustomInput
                        labelText="Nombre"
                        id="name"
                        error={errors.name}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customInput,
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: name,
                          name: 'name',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Codigo"
                        id="code"
                        error={errors.code}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customInput,
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: code,
                          name: 'code',
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter className={classes.buttonContainer}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button type="submit" color="gamsRed" block={true}>
                        Crear
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

NewSector.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  code: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(newSectorStyle)(NewSector);
