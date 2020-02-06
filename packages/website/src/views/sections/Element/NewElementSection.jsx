import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/icons components
import AddAlert from '@material-ui/icons/AddAlert';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';

import serviceElement from '../../../services/api/element';
import newAreaSectionStyle from '../../../styles/jss/material-dashboard-react/sections/newAreaSectionStyle';
import Snackbar from '../../components/Snackbar/Snackbar';
import { InputLabel, Input } from '@material-ui/core';
import serviceService from '../../../services/api/service';

class NewElementSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //rolSelected: 'area',
      errors: {},
      notification: false,
      service: [],
      selectedService: [],
    };
  }

  //se obtienen los servicios
  async componentWillMount() {
    const responseService = await serviceService.list();
    let services = [];
    for (const service of responseService.data.items) {
      let dataService = service.name;
      services.push(dataService);
    }

    this.setState({ service: services });
  }

  handleChangeService = event => {
    this.setState({ selectedService: event.target.value });
  };

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  //se crea el elemento
  createElement = async e => {
    e.preventDefault();

    const fields = ['name', 'code', 'service', 'description'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    const response = await serviceElement.create(formValues);

    if (response.type === 'CREATED_SUCCESFUL') {
      this.setState({ notification: true });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
    window.location.reload();
  };

  render() {
    const { classes, name, code, service, description } = this.props;
    const { errors } = this.state;
    return (
      <div id="section-new-element">
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.errors}`
              : 'Elemento creado correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.createElement}>
              <Card>
                <CardHeader color="gamsBlue">
                  <h4 className={classes.cardTitleWhite}>Nuevo elemento</h4>
                  <p className={classes.cardCategoryWhite}>Complete los datos</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Nombre"
                        id="name"
                        error={errors.name}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: name,
                          name: 'name',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={10}>
                      <CustomInput
                        labelText="Codigo"
                        id="code"
                        error={errors.code}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: code,
                          name: 'code',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={10}>
                      <InputLabel id="demo-mutiple-name-label-Servicio">Servicios</InputLabel>
                      <FormControl fullWidth className={classes.selectFormControl + ' ' + classes.selectUnderlineRoot}>
                        <Select
                          labelId="demo-mutiple-name-label-Servicio"
                          MenuProps={{
                            className: classes.selectMenu,
                          }}
                          classes={{
                            select: classes.select,
                          }}
                          value={this.state.selectedService}
                          onChange={this.handleChangeService}
                          input={<Input />}
                          inputProps={{
                            name: 'service',
                            id: 'service',
                          }}
                        >
                          {this.state.service.map(service => (
                            <MenuItem key={service} value={service}>
                              {service}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={10}>
                      <CustomInput
                        labelText="Descripcion"
                        id="description"
                        error={errors.description}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: description,
                          name: 'description',
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="gamsRed">
                    Crear
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

NewElementSection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(newAreaSectionStyle)(NewElementSection);
