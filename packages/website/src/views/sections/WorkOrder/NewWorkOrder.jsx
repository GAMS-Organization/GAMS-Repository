import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';

import serviceProduct from '../../../services/api/products';
import newWorkOrderStyle from '../../../styles/jss/material-dashboard-react/sections/newWorkOrderStyle';
import AddAlert from '@material-ui/icons/AddAlert';
import Snackbar from '../../components/Snackbar/Snackbar';
import { Input, InputLabel } from '@material-ui/core';
import serviceSector from '../../../services/api/sector';
import serviceArea from '../../../services/api/area';
import serviceService from '../../../services/api/service';

class NewWorkOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      notification: false,
      service: [],
      selectedService: '',
      sector: [],
      selectedSector: '',
      area: [],
      selectedArea: '',
      element: [],
      selectedElement: '',
    };
  }

  //se obtienen los sectores
  async componentWillMount() {
    //sectores
    const responseSector = await serviceSector.list(1, 50);
    let sectores = [];
    for (const sector of responseSector.data.items) {
      let dataSector = sector.name;
      sectores.push(dataSector);
    }

    this.setState({ sector: sectores });
  }

  //Controlador para seleccionar un sector
  handleChangeSector = async event => {
    const sector = event.target.value;
    //areas
    const responseArea = await serviceArea.listBySector(sector.replace(/\s/gi, '-'));
    let areas = [];
    for (const area of responseArea.areas) {
      areas.push(area);
    }

    this.setState({
      selectedSector: sector,
      area: areas,
      service: [],
      element: [],
      selectedArea: '',
      selectedService: '',
      selectedElement: '',
    });
  };

  //Controlador para seleccionar un area
  handleChangeArea = async event => {
    const selectedArea = this.state.area.find(area => area.name === event.target.value);
    this.setState({
      selectedArea: event.target.value,
      service: selectedArea.services,
      element: [],
      selectedService: '',
      selectedElement: '',
    });
  };

  //Controlador para seleccionar un servicio
  handleChangeService = async event => {
    const { service } = await serviceService.getByName(event.target.value.replace(/\s/gi, '-'));
    const elements = service.elements.map(element => {
      return element.name;
    });
    this.setState({ selectedService: event.target.value, selectedElement: '', element: elements });
  };

  //Controlador para seleccionar un elemento
  handleChangeElement = event => {
    this.setState({ selectedElement: event.target.value });
  };

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  render() {
    const { classes, name } = this.props;
    const { errors } = this.state;
    return (
      <div id="section-new-product">
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.errors}`
              : 'Orden creada correctamente. Pronto lo estaremos resolviendo.'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <GridContainer>
          <GridItem align={'center'} xs={12} sm={12} md={12}>
            <form onSubmit={this.CreateWorkOrder}>
              <Card>
                <CardHeader color="gamsBlue">
                  <h4 className={classes.cardTitleWhite}>Nueva orden de trabajo</h4>
                  <p className={classes.cardCategoryWhite}>Complete los datos</p>
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
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: name,
                          name: 'name',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <GridItem xs={12} sm={12} md={10}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                          <InputLabel htmlFor="sector" className={classes.selectLabel}>
                            Sector
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu,
                            }}
                            classes={{
                              select: classes.select,
                            }}
                            value={this.state.selectedSector}
                            onChange={this.handleChangeSector}
                            input={<Input />}
                            inputProps={{
                              name: 'sector',
                              id: 'sector',
                            }}
                          >
                            {this.state.sector.map(sector => (
                              <MenuItem
                                key={sector}
                                value={sector}
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                              >
                                {sector}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                          <InputLabel htmlFor="Area" className={classes.selectLabel}>
                            Área
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu,
                            }}
                            classes={{
                              select: classes.select,
                            }}
                            value={this.state.selectedArea}
                            onChange={this.handleChangeArea}
                            inputProps={{
                              name: 'area',
                              id: 'area',
                            }}
                          >
                            {this.state.area.map(area => (
                              <MenuItem
                                key={area.name}
                                value={area.name}
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                              >
                                {area.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                          <InputLabel htmlFor="servicio" className={classes.selectLabel}>
                            Servicio
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu,
                            }}
                            classes={{
                              select: classes.select,
                            }}
                            value={this.state.selectedService}
                            onChange={this.handleChangeService}
                            inputProps={{
                              name: 'service',
                              id: 'service',
                            }}
                          >
                            {this.state.service.map(service => (
                              <MenuItem
                                key={service}
                                value={service}
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                              >
                                {service}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                          <InputLabel htmlFor="Elemento" className={classes.selectLabel}>
                            Elemento
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu,
                            }}
                            classes={{
                              select: classes.select,
                            }}
                            value={this.state.selectedElement}
                            onChange={this.handleChangeElement}
                            inputProps={{
                              name: 'element',
                              id: 'element',
                            }}
                          >
                            {this.state.element.map(element => (
                              <MenuItem
                                key={element}
                                value={element}
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                              >
                                {element}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText=""
                          id="date"
                          formControlProps={{
                            fullWidth: true,
                            disabled: true,
                          }}
                          inputProps={{
                            type: 'date',
                            required: true,
                            defaultValue: new Date().toDateString(),
                            name: 'date',
                          }}
                        />
                      </GridItem>
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

NewWorkOrder.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(newWorkOrderStyle)(NewWorkOrder);
