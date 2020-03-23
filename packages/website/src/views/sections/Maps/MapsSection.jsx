import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
import Arrow_Upward from '@material-ui/icons/ArrowUpward';
import Arrow_Downward from '@material-ui/icons/ArrowDownward';
import Assignment from '@material-ui/icons/Assignment';
// components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomTabs from '../../components/CustomTabs/CustomTabs.jsx';
import EntryPurchase from '../../components/Stock/EntryPurchase.jsx';
import CurrentStock from '../../components/Stock/CurrentStock.jsx';
import DepartureConsumption from '../../components/Stock/DepartureConsumption';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel, Input } from '@material-ui/core';
import Select from '@material-ui/core/Select';

import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';

import serviceEntryPurchaseStock from '../../../services/api/entryPurchaseStock';
import serviceCurrentStock from '../../../services/api/currentStock';
import serviceSector from '../../../services/api/sector';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

class MapsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: [],
      stock: [],
      departure: [],
      sector: [],
    };
  }

  async componentWillMount() {
    //servicios
    /*const responseService = await serviceService.list();
    let services = [];
    for (const service of responseService.data.items) {
      let dataService = service.name;
      services.push(dataService);
    }*/

    //sectores
    const responseSector = await serviceSector.list();
    let sectores = [];
    for (const sector of responseSector.data.items) {
      let dataSector = sector.name;
      sectores.push(dataSector);
    }

    //areas
    /*const responseArea = await serviceArea.list();
    let areas = [];
    for (const area of responseArea.data.items) {
      let dataArea = area.name;
      areas.push(dataArea);
    }*/

    this.setState({ sector: sectores });
  }

  //Controlador para seleccionar un sector
  handleChangeSector = event => {
    this.setState({ selectedSector: event.target.value });
  };

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title=""
            headerColor="gamsBlue"
            tabs={[
              {
                tabName: 'SECTOR',
                tabIcon: Arrow_Upward,
                tabContent: (
                  //<NewMapSector />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <form onSubmit={this.createProduct}>
                        <Card>
                          <CardHeader color="gamsBlue">
                            <h4 className={classes.cardTitleWhite}>Nuevo mapa</h4>
                            <p className={classes.cardCategoryWhite}>Complete los datos</p>
                          </CardHeader>
                          <CardBody>
                            <GridItem xs={12} sm={12} md={6}>
                              <InputLabel id="demo-mutiple-name-label-Sector">Sector</InputLabel>
                              <FormControl
                                fullWidth
                                className={classes.selectFormControl + ' ' + classes.selectUnderlineRoot}
                              >
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
                              <br />
                              <Button type="" color="gamsRed" xs={12} sm={12} md={3}>
                                Cargar imagen
                              </Button>
                            </GridItem>
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
                ),
              },
              {
                tabName: 'AREA',
                tabIcon: Arrow_Upward,
                tabContent: (
                  <CurrentStock
                    tableHeaderColor="gamsBlue"
                    tableHead={['ID', 'Producto', 'Cantidad', 'Cant. Minima', 'Estado']}
                    tableData={this.state.stock}
                  />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(MapsSection);
