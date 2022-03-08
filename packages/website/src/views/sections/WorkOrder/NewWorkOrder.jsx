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

import newWorkOrderStyle from '../../../styles/jss/material-dashboard-react/sections/newWorkOrderStyle';
import AddAlert from '@material-ui/icons/AddAlert';
import Snackbar from '../../components/Snackbar/Snackbar';
import { Input, InputLabel } from '@material-ui/core';
import serviceSector from '../../../services/api/sector';
import serviceArea from '../../../services/api/area';
import serviceService from '../../../services/api/service';
import serviceAsset from '../../../services/api/asset';
import serviceElement from '../../../services/api/element';
import serviceWorkOrder from '../../../services/api/workOrder';

class NewWorkOrder extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //date = today.getDate() + '-' + +(today.getMonth() + 1) + '-' + today.getFullYear();
    console.log(date);
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
      //dateNow: date,
      prioritySelected: '',
      idSector: '',
      idArea: '',
      idService: '',
      idElement: '',
      idAsset: '',
      selectedAsset: '',
      asset: [],
      comment: '',
      map: '',
      mapsArea: [],
    };
  }

  //se obtienen los sectores
  componentWillMount = async () => {
    const responseSector = await serviceSector.list(1, 50);
    const imagenGlobal = 'global/Mapa.png';
    let sectores = [];
    for (const sector of responseSector.data.items) {
      let dataSector = sector;
      sectores.push(dataSector);
    }

    this.setState({ sector: sectores, map: imagenGlobal });
  };

  //Controlador para seleccionar un sector
  handleChangeSector = async event => {
    const sector = this.state.sector.find(sector => sector.name === event.target.value);
    const idSector = sector.id;
    const nameSector = sector.name;
    const mapSector = sector.map;

    //areas
    const responseArea = await serviceArea.listBySector(nameSector.replace(/\s/gi, '-'));
    let areas = [];
    for (const area of responseArea.areas) {
      areas.push(area);
    }

    this.setState({
      selectedSector: nameSector,
      map: mapSector,
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
    const map = area.maps[0];

    let mapsAreas = [];
    for (const mapa of area.maps) {
      mapsAreas.push(mapa);
    }

    this.setState({
      selectedArea: nameArea,
      service: area.services,
      map: map,
      mapsAreas: mapsAreas,
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

    const allElements = await serviceElement.getByAreaId(this.state.idArea);

    const elements = allElements.filter(element => element.service.id === idService);

    const map = this.state.mapsAreas[this.state.service.indexOf(service.name)];

    this.setState({
      selectedService: event.target.value,
      map: map,
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
  };

  closeNotificationSuccess = () => {
    this.setState({
      notification: false,
      errors: {},
    });
  };

  //Se crea la orden de trabajo
  CreateWorkOrder = async e => {
    e.preventDefault();
    const formElements = e.target.elements;
    const date = formElements.namedItem('date').value;
    const observations = formElements.namedItem('observations').value;
    console.log(date);

    const formValues = {
      orderDate: date,
      priority: this.state.prioritySelected,
      comment: observations,
      assetId: this.state.idAsset,
    };
    const response = await serviceWorkOrder.create(formValues);

    if (response.type === 'CREATED_SUCCESFUL') {
      formElements.namedItem('observations').value = '';
      formElements.namedItem('date').value = '';
      this.setState({
        notification: true,
        selectedService: '',
        selectedSector: '',
        selectedArea: '',
        selectedElement: '',
        dateNow: '',
        prioritySelected: '',
        idSector: '',
        idArea: '',
        idService: '',
        idElement: '',
        idAsset: '',
        selectedAsset: '',
        comment: '',
        map: '',
      });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  handleChangePriority = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div id="section-new-product">
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code} ${this.state.errors.errors}`
              : 'Orden de trabajo creada correctamente.'
          }
          open={this.state.notification}
          closeNotification={this.closeNotificationSuccess}
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
                        src={`http://${window.location.hostname}/api/static/${this.state.map}`}
                        width="100%"
                        alt={''}
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
                            disabled={this.state.selectedSector === ''}
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
                            disabled={this.state.selectedSector === '' || this.state.selectedArea === ''}
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
                            disabled={
                              this.state.selectedSector === '' ||
                              this.state.selectedArea === '' ||
                              this.state.selectedService === ''
                            }
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
                            disabled={
                              this.state.selectedSector === '' ||
                              this.state.selectedArea === '' ||
                              this.state.selectedService === '' ||
                              this.state.selectedElement === ''
                            }
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
                                {`${asset.code.split('-')[asset.code.split('-').length - 2]}-${
                                  asset.code.split('-')[asset.code.split('-').length - 1]
                                }`}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText={this.state.dateNow}
                          id="date"
                          value={this.state.dateNow}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: 'date',
                            required: true,
                            name: 'date',
                            disabled:
                              this.state.selectedSector === '' ||
                              this.state.selectedArea === '' ||
                              this.state.selectedService === '' ||
                              this.state.selectedElement === '' ||
                              this.state.selectedAsset === '',
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
                            disabled={
                              this.state.selectedSector === '' ||
                              this.state.selectedArea === '' ||
                              this.state.selectedService === '' ||
                              this.state.selectedElement === '' ||
                              this.state.selectedAsset === ''
                            }
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
                            disabled:
                              this.state.selectedSector === '' ||
                              this.state.selectedArea === '' ||
                              this.state.selectedService === '' ||
                              this.state.selectedElement === '' ||
                              this.state.selectedAsset === '',
                          }}
                        />
                      </GridItem>
                      <GridContainer>
                        <GridItem justify={'center'} xs={12} sm={12} md={12}>
                          <Button type="submit" color="gamsRed">
                            Crear
                          </Button>
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
