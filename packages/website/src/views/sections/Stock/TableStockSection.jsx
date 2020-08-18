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

import serviceEntryPurchaseStock from '../../../services/api/entryPurchaseStock';
import serviceCurrentStock from '../../../services/api/currentStock';
import serviceDepartureConsumptionStock from '../../../services/api/departureConsumptionStock';

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
   componentWillMount = async () => {
    const responseEntry = await serviceEntryPurchaseStock.list();
    const responseCurrentStock = await serviceCurrentStock.list();
    const responseDeparture = await serviceDepartureConsumptionStock.list();
    let entries = [];
    let stocks = [];
    let departures = [];
    for (const entry of responseEntry.data.items) {
      let dataEntry = [entry.id.toString(), entry.date.slice(0, 10), entry.observations];
      entries.push(dataEntry);
    }

    for (const stock of responseCurrentStock.data.items) {
      let dataStock = [stock.id.toString(), stock.product, stock.quantity, stock.minimunQuantity, stock.state];
      stocks.push(dataStock);
    }

    for (const departure of responseDeparture.data.items) {
      let dataDeparture = [departure.id.toString(), departure.date.slice(0, 10), departure.observations];
      departures.push(dataDeparture);
    }

    this.setState({ entry: entries, stock: stocks, departure: departures });
  }

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
                tabName: 'ENTRADAS',
                tabIcon: Arrow_Upward,
                tabContent: (
                  <EntryPurchase
                    tableHeaderColor="gamsBlue"
                    tableHead={['ID', 'Fecha', 'Observacion']}
                    tableData={this.state.entry}
                  />
                ),
              },
              {
                tabName: 'STOCK ACTUAL',
                tabIcon: Assignment,
                tabContent: (
                  <CurrentStock
                    tableHeaderColor="gamsBlue"
                    tableHead={['ID', 'Producto', 'Cantidad', 'Cant. Minima', 'Estado']}
                    tableData={this.state.stock}
                  />
                ),
              },
              {
                tabName: 'SALIDAS',
                tabIcon: Arrow_Downward,
                tabContent: (
                  <DepartureConsumption
                    tableHeaderColor="gamsBlue"
                    tableHead={['ID', 'Fecha', 'Observacion']}
                    tableData={this.state.departure}
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
