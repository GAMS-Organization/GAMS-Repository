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

import newWorkOrderStyle from '../../../styles/jss/material-dashboard-react/sections/newWorkOrderStyle';
import AddAlert from '@material-ui/icons/AddAlert';
import Snackbar from '../../components/Snackbar/Snackbar';
import { Input, InputLabel } from '@material-ui/core';
import serviceSector from '../../../services/api/sector';
import serviceArea from '../../../services/api/area';
import serviceService from '../../../services/api/service';
import serviceAsset from '../../../services/api/asset';
import serviceWorkOrder from '../../../services/api/workOrder';
import sector from '../../../services/api/sector';

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
      dateNow: '',
      prioritySelected: '',
      idSector: '',
      idArea: '',
      idService: '',
      idElement: '',
      idAsset: '',
      selectedAsset: '',
      asset: [],
      comment: '',
    };
  }

  DateNow = () => {
    var date = Date.Now();

    this.setState({ dateNow: date });
  };

  //se obtienen los sectores
  componentWillMount = async () => {
    const responseSector = await serviceSector.list(1, 50);
    let sectores = [];
    for (const sector of responseSector.data.items) {
      let dataSector = sector;
      sectores.push(dataSector);
    }

    this.setState({ sector: sectores });
  };

  //Controlador para seleccionar un sector
  handleChangeSector = async event => {
    const sector = this.state.sector.find(sector => sector.name === event.target.value);
    const idSector = sector.id;
    const nameSector = sector.name;

    //areas
    const responseArea = await serviceArea.listBySector(nameSector.replace(/\s/gi, '-'));
    let areas = [];
    for (const area of responseArea.areas) {
      areas.push(area);
    }

    this.setState({
      selectedSector: nameSector,
      idSector: idSector,
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
    const area = this.state.area.find(area => area.name === event.target.value);
    const idArea = area.id;
    const nameArea = area.name;
    this.setState({
      selectedArea: nameArea,
      service: area.services,
      element: [],
      selectedService: '',
      selectedElement: '',
      idArea: idArea,
    });
  };

  //Controlador para seleccionar un servicio
  handleChangeService = async event => {
    const { service } = await serviceService.getByName(event.target.value.replace(/\s/gi, '-'));
    const idService = service.id;
    const elements = service.elements.map(element => {
      return element;
    });
    this.setState({
      selectedService: event.target.value,
      selectedElement: '',
      element: elements,
      idService: idService,
    });
  };

  //Controlador para seleccionar un elemento y obtener los activos
  handleChangeElement = async event => {
    const element = this.state.element.find(element => element.name === event.target.value);
    const idElement = element.id;
    const nameElement = element.name;

    const formValues = {
      sector: this.state.idSector,
      area: this.state.idArea,
      service: this.state.idService,
      element: idElement,
    };

    const responseAsset = await serviceAsset.get(formValues);
    let assets = [];
    for (const asset of responseAsset.data.data) {
      assets.push(asset);
    }
    this.setState({ selectedElement: nameElement, asset: assets });
  };

  handleChangeAsset = async event => {
    const asset = this.state.asset.find(asset => asset.code === event.target.value);
    const codeAsset = asset.code;
    const idAsset = asset.id;

    this.setState({ selectedAsset: codeAsset, idAsset: idAsset });
  };

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
    window.location.reload();
  };

  closeNotificationSucces = () => {
    this.setState({ notification: false, errors: {} });
  };

  //Se crea la orden de trabajo
  CreateWorkOrder = async e => {
    e.preventDefault();
    const formElements = e.target.elements;
    const date = formElements.namedItem('date').value;
    const observations = formElements.namedItem('observations').value;

    const formValues = {
      orderDate: date,
      priority: this.state.prioritySelected,
      comment: observations,
      assetId: this.state.idAsset,
    };
    console.log(formValues);
    const response = await serviceWorkOrder.create(formValues);
    console.log(response);
    if (response.type === 'CREATED_SUCCESFUL') {
      this.setState({ notification: true });
      //window.location.reload();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  handleChangePriority = event => {
    this.setState({ [event.target.name]: event.target.value });
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
              : 'Orden de trabajo creada correctamente.'
          }
          open={this.state.notification}
          closeNotification={this.closeNotificationSucces}
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
                      <img
                        //src={`http://localhost/api/static/${this.props.sector.map}`}
                        width="100%"
                        height="100%"
                        border="10"
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
                              required: true,
                              name: 'sector',
                              id: 'sector',
                            }}
                          >
                            {this.state.sector.map(sector => (
                              <MenuItem
                                key={sector.name}
                                value={sector.name}
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                              >
                                {sector.name}
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
                              required: true,
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
                              required: true,
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
                              required: true,
                              name: 'element',
                              id: 'element',
                            }}
                          >
                            {this.state.element.map(element => (
                              <MenuItem
                                key={element.name}
                                value={element.name}
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                              >
                                {element.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                          <InputLabel htmlFor="Activo" className={classes.selectLabel}>
                            Activo
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu,
                            }}
                            classes={{
                              select: classes.select,
                            }}
                            value={this.state.selectedAsset}
                            onChange={this.handleChangeAsset}
                            inputProps={{
                              required: true,
                              name: 'asset',
                              id: 'asset',
                            }}
                          >
                            {this.state.asset.map(asset => (
                              <MenuItem
                                key={asset.code}
                                value={asset.code}
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                              >
                                {asset.code}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText=""
                          id="date"
                          value={this.state.dateNow}
                          //ready={this.date}
                          formControlProps={{
                            //ready: this.date,
                            fullWidth: true,
                            //disabled: true,
                          }}
                          inputProps={{
                            type: 'date',
                            required: true,
                            //defaultValue: Date.now(),
                            name: 'date',
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                          <InputLabel htmlFor="Prioridad" className={classes.selectLabel}>
                            Prioridad
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu,
                            }}
                            classes={{
                              select: classes.select,
                            }}
                            value={this.state.prioritySelected}
                            onChange={this.handleChangePriority}
                            inputProps={{
                              name: 'prioritySelected',
                              id: 'priority',
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem,
                              }}
                            >
                              Prioridad
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected,
                              }}
                              value="Alta"
                            >
                              Alta
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected,
                              }}
                              value="Media"
                            >
                              Media
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected,
                              }}
                              value="Baja"
                            >
                              Baja
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText="Observaciones"
                          id="observations"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            required: true,
                            defaultValue: '',
                            name: 'observations',
                          }}
                        />
                      </GridItem>
                      <GridContainer>
                        <GridItem justify={'center'} xs={4} sm={7} md={8}>
                          <CardFooter>
                            <Button type="submit" color="gamsRed">
                              Crear
                            </Button>
                          </CardFooter>
                        </GridItem>
                        <GridItem justify={'center'} xs={8} sm={5} md={4}>
                          <CardFooter>
                            <Button color="danger" simple onClick={this.closeNotification}>
                              Cancelar
                            </Button>
                          </CardFooter>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </CardBody>
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
