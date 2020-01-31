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

import serviceAsset from '../../../services/api/asset';
import serviceElement from '../../../services/api/element';
import newAreaSectionStyle from '../../../styles/jss/material-dashboard-react/sections/newAreaSectionStyle';
import Snackbar from '../../components/Snackbar/Snackbar';
import { InputLabel, Input } from '@material-ui/core';
import serviceService from '../../../services/api/service';
import serviceSector from '../../../services/api/sector';
import serviceArea from '../../../services/api/area';

class NewAssetSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      notification: false,
      service: [],
      selectedService: [],
      sector: [],
      selectedSector: [],
      area: [],
      selectedArea: [],
      element: [],
      selectedElement: [],
    };
  }

  async componentWillMount() {
    //Llamada a servicios
    const responseService = await serviceService.list();
    let services = [];
    for (const service of responseService.data.items) {
      let dataService = service.name;
      services.push(dataService);
    }

    //Llamada a sectores
    const responseSector = await serviceSector.list();
    let sectores = [];
    for (const sector of responseSector.data.items) {
      let dataSector = sector.name;
      sectores.push(dataSector);
    }

    //Llamada a areas
    const responseArea = await serviceArea.list();
    let areas = [];
    for (const area of responseArea.data.items) {
      let dataArea = area.name;
      areas.push(dataArea);
    }

    //Llamada a elementos
    const responseElement = await serviceElement.list();
    let elements = [];
    for (const element of responseElement.data.items) {
      let dataElement = element.name;
      elements.push(dataElement);
    }
    this.setState({ service: services, sector: sectores, area: areas, element: elements });
  }

  handleChangeService = event => {
    this.setState({ selectedService: event.target.value });
  };

  handleChangeSector = event => {
    this.setState({ selectedSector: event.target.value });
  };

  handleChangeArea = event => {
    this.setState({ selectedArea: event.target.value });
  };

  handleChangeElement = event => {
    this.setState({ selectedElement: event.target.value });
  };

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  createAsset = async e => {
    e.preventDefault();

    const formValues = {
      sector: this.state.selectedSector,
      area: this.state.selectedArea,
      service: this.state.selectedService,
      element: this.state.selectedElement,
    };

    const response = await serviceAsset.create(formValues);

    if (response.type === 'CREATED_SUCCESFUL') {
      this.setState({ notification: true });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
    window.location.reload();
  };

  render() {
    const { classes, sector, area, service, element } = this.props;
    const { errors } = this.state;
    return (
      <div id="section-new-asset">
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.errors}`
              : 'Activo creado correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.createAsset}>
              <Card>
                <CardHeader color="gamsBlue">
                  <h4 className={classes.cardTitleWhite}>Nuevo Activo</h4>
                  <p className={classes.cardCategoryWhite}>Complete los datos</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={10}>
                      <InputLabel id="demo-mutiple-name-label-Sector">Sector</InputLabel>
                      <FormControl fullWidth className={classes.selectFormControl + ' ' + classes.selectUnderlineRoot}>
                        <Select
                          labelId="demo-mutiple-name-label-Sector"
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
                            <MenuItem key={sector} value={sector}>
                              {sector}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={10}>
                      <InputLabel id="demo-mutiple-name-label-Area">Area</InputLabel>
                      <FormControl fullWidth className={classes.selectFormControl + ' ' + classes.selectUnderlineRoot}>
                        <Select
                          labelId="demo-mutiple-name-label-Area"
                          MenuProps={{
                            className: classes.selectMenu,
                          }}
                          classes={{
                            select: classes.select,
                          }}
                          value={this.state.selectedArea}
                          onChange={this.handleChangeArea}
                          input={<Input />}
                          inputProps={{
                            name: 'area',
                            id: 'area',
                          }}
                        >
                          {this.state.area.map(area => (
                            <MenuItem key={area} value={area}>
                              {area}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
                      <InputLabel id="demo-mutiple-name-label-elementos">Elementos</InputLabel>
                      <FormControl fullWidth className={classes.selectFormControl + ' ' + classes.selectUnderlineRoot}>
                        <Select
                          labelId="demo-mutiple-name-label-elementos"
                          MenuProps={{
                            className: classes.selectMenu,
                          }}
                          classes={{
                            select: classes.select,
                          }}
                          value={this.state.selectedElement}
                          onChange={this.handleChangeElement}
                          input={<Input />}
                          inputProps={{
                            name: 'element',
                            id: 'element',
                          }}
                        >
                          {this.state.element.map(element => (
                            <MenuItem key={element} value={element}>
                              {element}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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

NewAssetSection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(newAreaSectionStyle)(NewAssetSection);
