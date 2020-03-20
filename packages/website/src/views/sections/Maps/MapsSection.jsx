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

import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';

import serviceEntryPurchaseStock from '../../../services/api/entryPurchaseStock';
import serviceCurrentStock from '../../../services/api/currentStock';

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

class TableStockSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: [],
      stock: [],
      departure: [],
    };
  }

  //se obtienen las entradas, el stock actual y las salidas
  /*async componentWillMount() {
    const responseEntry = await serviceEntryPurchaseStock.list();
    const responseCurrentStock = await serviceCurrentStock.list();*/
  /*const responseExit = await serviceExitStock.list();*/
  /*let entries = [];
    let stocks = [];
    let exits = [];
    for (const entry of responseEntry.data.items) {
      let dataEntry = [entry.id.toString(), entry.date.slice(0, 10), entry.observations];
      entries.push(dataEntry);
    }

    for (const stock of responseCurrentStock.data.items) {
      let dataStock = [stock.id.toString(), stock.product, stock.quantity, stock.minimunQuantity, stock.state];
      stocks.push(dataStock);
    }

    this.setState({ entry: entries, stock: stocks });
  }*/

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
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <form onSubmit={this.createProduct}>
                        <Card>
                          <CardHeader color="gamsBlue">
                            <h4 className={classes.cardTitleWhite}>Nuevo mapa</h4>
                            <p className={classes.cardCategoryWhite}>Complete los datos</p>
                          </CardHeader>
                          <CardBody></CardBody>
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
                tabIcon: Assignment,
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

export default withStyles(styles)(TableStockSection);
