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
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';

import serviceAsset from '../../../services/api/asset';
import newAreaSectionStyle from '../../../styles/jss/material-dashboard-react/sections/newAreaSectionStyle';
import Snackbar from '../../components/Snackbar/Snackbar';
import { InputLabel, Input } from '@material-ui/core';
import serviceService from '../../../services/api/service';
import serviceSector from '../../../services/api/sector';
import serviceArea from '../../../services/api/area';
import CustomInput from '../../components/CustomInput/CustomInput';

class NewAssetSection extends React.Component {
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
      description: '',
    };
    this.formRef = {};
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

  //Se crea el activo
  createAsset = async e => {
    e.preventDefault();
    const formElements = e.target.elements;

    const formValues = {
      sector: this.state.selectedSector,
      area: this.state.selectedArea,
      service: this.state.selectedService,
      element: this.state.selectedElement,
      description: this.state.description,
    };

    const response = await serviceAsset.create(formValues);

    if (response.type === 'CREATED_SUCCESSFUL') {
      formElements.namedItem('description').value = '';
      this.setState({
        notification: true,
        selectedService: '',
        selectedSector: '',
        selectedArea: '',
        selectedElement: '',
        description: '',
      });
      this.formRef.reset();
      this.props.onSubmit(true);
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div id="section-new-asset">
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.errors}`
              : 'Activo creado correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.createAsset} ref={ref => (this.formRef = ref)}>
              <Card>
                <CardHeader color="gamsBlue">
                  <h4 className={classes.cardTitleWhite}>Nuevo Activo</h4>
                  <p className={classes.cardCategoryWhite}>Complete los campos</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl fullWidth className={classes.selectFormControl + ' ' + classes.customInput}>
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
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl fullWidth className={classes.selectFormControl + ' ' + classes.customInput}>
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
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl fullWidth className={classes.selectFormControl + ' ' + classes.customInput}>
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
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl fullWidth className={classes.selectFormControl + ' ' + classes.customInput}>
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
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Descripcion"
                        id="description"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customInput,
                        }}
                        inputProps={{
                          required: false,
                          name: 'description',
                          onChange: e => this.setState({ description: e.target.value }),
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

NewAssetSection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(newAreaSectionStyle)(NewAssetSection);
