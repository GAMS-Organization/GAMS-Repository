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

import serviceArea from '../../../services/api/area';
import newAreaSectionStyle from '../../../styles/jss/material-dashboard-react/sections/newAreaSectionStyle';
import Snackbar from '../../components/Snackbar/Snackbar';
import { InputLabel } from '@material-ui/core';
import serviceService from '../../../services/api/service';
import serviceSector from '../../../services/api/sector';

class NewAreaSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rolSelected: 'area',
      errors: {},
      notification: false,
      service: [],
      selectedServices: [],
      sector: [],
      selectedSector: [],
    };
  }

  //Se obtienen los servicios y sectores
  async componentWillMount() {
    //servicios
    const response = await serviceService.list(1, 50);
    let services = [];
    for (const service of response.data.items) {
      let dataService = service.name;
      services.push(dataService);
    }
    this.setState({ service: services });

    //sectores
    const responseSector = await serviceSector.list(1, 50);
    let sectors = [];
    for (const sector of responseSector.data.items) {
      let dataSector = sector.name;
      sectors.push(dataSector);
    }

    this.setState({ sector: sectors });
  }

  handleChangeServices = event => {
    this.setState({ selectedServices: event.target.value });
  };

  handleChangeSectors = event => {
    this.setState({ selectedSector: event.target.value });
  };

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  //Se crea el area
  createArea = async e => {
    e.preventDefault();

    const fields = ['name', 'code', 'sector', 'services'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    formValues.services = formValues.services.split(',');

    const response = await serviceArea.create(formValues);

    if (response.type === 'CREATED_SUCCESFUL') {
      this.setState({ notification: true });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, name, code } = this.props;
    const { errors } = this.state;
    return (
      <div id="section-new-area">
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.errors}`
              : 'Area creada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.createArea}>
              <Card>
                <CardHeader color="gamsBlue">
                  <h4 className={classes.cardTitleWhite}>Nueva Area</h4>
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
                      <FormControl fullWidth className={classes.selectFormControl}>
                        <InputLabel htmlFor="multiple-select" className={classes.selectLabel}>
                          Servicios
                        </InputLabel>
                        <Select
                          multiple
                          value={this.state.selectedServices}
                          onChange={this.handleChangeServices}
                          MenuProps={{
                            className: classes.selectMenu,
                            classes: { paper: classes.selectPaper },
                          }}
                          classes={{
                            select: classes.select,
                          }}
                          inputProps={{
                            name: 'services',
                            id: 'services',
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem,
                            }}
                          >
                            Servicios
                          </MenuItem>
                          {this.state.service.map(service => (
                            <MenuItem
                              key={service}
                              value={service}
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple,
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
                          onChange={this.handleChangeSectors}
                          inputProps={{
                            name: 'sector',
                            id: 'sector',
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem,
                            }}
                          >
                            Sector
                          </MenuItem>
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

NewAreaSection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(newAreaSectionStyle)(NewAreaSection);
