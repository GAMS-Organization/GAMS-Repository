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
import newSectorStyle from '../../../styles/jss/material-dashboard-react/sections/newSectorStyle';
import AddAlert from '@material-ui/icons/AddAlert';
import Snackbar from '../../components/Snackbar/Snackbar';
import FormControl from '@material-ui/core/FormControl';
import { Input, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import serviceSector from '../../../services/api/sector';
import serviceArea from '../../../services/api/area';
import serviceEducationalElement from '../../../services/api/educationalElement';

class createRequestEducationalElementSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      notification: false,
      sector: [],
      selectedSector: '',
      area: [],
      selectedAreaName: '',
      selectedAreaId: '',
      educationalElement: [],
      selectedEducationalElementName: '',
      selectedEducationalElementId: '',
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  componentWillMount = async () => {
    const responseSector = await serviceSector.list(1, 50);
    const responseEducationalElement = await serviceEducationalElement.list(1, 500);
    let sectores = [];
    let educationalElements = [];

    for (const sector of responseSector.data.items) {
      sectores.push(sector);
    }

    for (const educationalElement of responseEducationalElement.data.items) {
      educationalElements.push(educationalElement);
    }

    this.setState({ sector: sectores, educationalElement: educationalElements });
  };

  handleChangeEducationalElement = async event => {
    const educationalElement = this.state.educationalElement.find(
      educationalElement => educationalElement.name === event.target.value,
    );
    const nameEducationalElement = educationalElement.name;
    const idEducationalElement = educationalElement.id;
    this.setState({
      selectedEducationalElementName: nameEducationalElement,
      selectedEducationalElementId: idEducationalElement,
    });
  };

  handleChangeSector = async event => {
    const sector = this.state.sector.find(sector => sector.name === event.target.value);
    const nameSector = sector.name;

    //areas
    const responseArea = await serviceArea.listBySector(nameSector.replace(/\s/gi, '-'));
    let areas = [];
    for (const area of responseArea.areas) {
      areas.push(area);
    }

    this.setState({
      selectedSector: nameSector,
      area: areas,
      selectedAreaName: '',
    });
  };

  handleChangeArea = async event => {
    const area = this.state.area.find(area => area.name === event.target.value);
    const idArea = area.id;
    const nameArea = area.name;

    this.setState({
      selectedAreaName: nameArea,
      selectedAreaId: idArea,
    });
  };

  createEducationalElementRequest = async e => {
    e.preventDefault();
    const formElements = e.target.elements;
    const date = formElements.namedItem('date').value;
    const quantity = formElements.namedItem('quantity').value;

    const formValues = {
      educationalElementId: this.state.selectedEducationalElementId,
      date: date,
      areaId: this.state.selectedAreaId,
      quantity: parseInt(quantity),
    };
    const response = await serviceEducationalElement.createElementRequest(formValues);
    if (response.type === 'CREATED_SUCCESFUL') {
      formElements.namedItem('quantity').value = '';
      formElements.namedItem('date').value = '';
      this.setState({
        notification: true,
        selectedEducationalElementName: '',
        selectedEducationalElementId: '',
        selectedAreaName: '',
        selectedAreaId: '',
        selectedSector: '',
      });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div id="">
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.errors}`
              : 'Solicitud enviada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <GridContainer>
          <GridItem align={'center'} xs={12} sm={12} md={12}>
            <form onSubmit={this.createEducationalElementRequest}>
              <Card>
                <CardHeader color="gamsBlue">
                  <h4 className={classes.cardTitleWhite}>Solicitud de Artículos</h4>
                  <p className={classes.cardCategoryWhite}>Complete los datos</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl fullWidth className={classes.selectFormControl}>
                        <InputLabel htmlFor="educationalElement" className={classes.selectLabel}>
                          Artículo
                        </InputLabel>
                        <Select
                          MenuProps={{
                            className: classes.selectMenu,
                          }}
                          classes={{
                            select: classes.select,
                          }}
                          value={this.state.selectedEducationalElementName}
                          onChange={this.handleChangeEducationalElement}
                          input={<Input />}
                          inputProps={{
                            required: true,
                            name: 'educationalElement',
                            id: 'educationalElement',
                          }}
                        >
                          {this.state.educationalElement.map(educationalElement => (
                            <MenuItem
                              key={educationalElement.name}
                              value={educationalElement.name}
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected,
                              }}
                            >
                              {educationalElement.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText=""
                        id="date"
                        value={this.state.dateNow}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'date',
                          required: true,
                          name: 'date',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
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
                    <GridItem xs={12} sm={12} md={6}>
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
                          value={this.state.selectedAreaName}
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
                  </GridContainer>
                  <GridContainer justify={'center'}>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Cantidad"
                        id="quantity"
                        error={errors.quantity}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          name: 'quantity',
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <GridContainer justify={'center'}>
                  <CardFooter>
                    <Button type="submit" color="gamsRed">
                      Solicitar
                    </Button>
                  </CardFooter>
                </GridContainer>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

createRequestEducationalElementSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(newSectorStyle)(createRequestEducationalElementSection);
