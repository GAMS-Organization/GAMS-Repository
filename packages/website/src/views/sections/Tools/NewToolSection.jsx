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

import serviceTools from '../../../services/api/tool';
import AddAlert from '@material-ui/icons/AddAlert';
import Snackbar from '../../components/Snackbar/Snackbar';
import newToolStyle from '../../../styles/jss/material-dashboard-react/sections/NewToolStyle';

class NewToolSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      notification: false,
    };
    this.formRef = {};
  }

  handleRol = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  createTool = async e => {
    e.preventDefault();

    const fields = ['name', 'totalQuantity', 'borrowQuantity'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));
    const response = await serviceTools.create(formValues);

    if (response.type === 'CREATED_SUCCESSFUL') {
      formElements.namedItem('name').value = '';
      formElements.namedItem('totalQuantity').value = '';
      formElements.namedItem('borrowQuantity').value = '';
      this.setState({ notification: true });
      this.formRef.reset();
      this.props.onSubmit(true);
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div id="section-new-tool">
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.errors}`
              : 'Herramienta creada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <form onSubmit={this.createTool} ref={ref => (this.formRef = ref)}>
              <Card>
                <CardHeader color="gamsBlue">
                  <h4 className={classes.cardTitleWhite}>Nueva Herramienta</h4>
                  <p className={classes.cardCategoryWhite}>Complete los campos</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
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
                          name: 'name',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Cantidad"
                        id="totalQuantity"
                        error={errors.totalQuantity}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customInput,
                        }}
                        inputProps={{
                          required: true,
                          name: 'totalQuantity',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Cantidad prestada"
                        id="borrowQuantity"
                        error={errors.borrowQuantity}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customInput,
                        }}
                        inputProps={{
                          required: true,
                          name: 'borrowQuantity',
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

NewToolSection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(newToolStyle)(NewToolSection);
