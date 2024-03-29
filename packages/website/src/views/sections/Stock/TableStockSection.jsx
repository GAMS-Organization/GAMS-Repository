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
import { toDate } from '../../../utils/helpers/dateHelper';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';

class TableStockSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: [{ visibleData: [] }],
      stock: [{ visibleData: [] }],
      departure: [{ visibleData: [] }],
      activeTab: 1,
      totalPagesEntry: 0,
      pageEntry: 1,
      totalPagesStock: 0,
      pageStock: 1,
      totalPagesDeparture: 0,
      pageDeparture: 1,
    };
  }

  //se obtienen las entradas, el stock actual y las salidas
  componentWillMount = async () => {
    await this.listStock();
  };

  handleOnTabChange = async value => {
    if (value === 0) {
      await this.listEntries();
      //Tab seleccionada entrada
      this.setState({
        activeTab: 0,
      });
    } else if (value === 1) {
      await this.listStock();
      //Tab seleccionada stock
      this.setState({
        activeTab: 1,
      });
    } else {
      await this.listDeparture();
      //Tab seleccionada salida
      this.setState({
        activeTab: 2,
      });
    }
  };

  listEntries = async (page = 1, itemsPerPage = 15) => {
    const responseEntry = await serviceEntryPurchaseStock.list(page, itemsPerPage);
    let entries = [];

    for (const entry of responseEntry.data.items) {
      let dataEntry = { visibleData: [toDate(entry.date.slice(0, 10)), entry.observations], id: entry.id.toString() };
      entries.push(dataEntry);
    }

    this.setState({ entry: entries, totalPagesEntry: responseEntry.data.pageCount, pageEntry: page });
  };

  listStock = async (page = 1, itemsPerPage = 15) => {
    const responseCurrentStock = await serviceCurrentStock.list(page, itemsPerPage);
    let stocks = [];

    for (const stock of responseCurrentStock.data.items) {
      let dataStock = {
        visibleData: [stock.product, stock.quantity, stock.minimunQuantity, stock.state],
        id: stock.id.toString(),
      };
      stocks.push(dataStock);
    }
    this.setState({
      stock: stocks,
      totalPagesStock: responseCurrentStock.data.pageCount,
      pageStock: page,
    });
  };

  listDeparture = async (page = 1, itemsPerPage = 15) => {
    const responseDeparture = await serviceDepartureConsumptionStock.list(page, itemsPerPage);
    let departures = [];

    for (const departure of responseDeparture.data.items) {
      let dataDeparture = {
        visibleData: [toDate(departure.date.slice(0, 10)), departure.observations],
        id: departure.id.toString(),
        workOrderId: departure.workOrderId,
      };
      departures.push(dataDeparture);
    }
    this.setState({
      departure: departures,
      totalPagesDeparture: responseDeparture.data.pageCount,
      pageDeparture: page,
    });
  };

  render() {
    const { classes, shouldLoad, onLoad } = this.props;
    if (shouldLoad) {
      this.handleOnTabChange(this.state.activeTab);
      onLoad(false);
    }
    return (
      <GridContainer justify={'center'}>
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
                    tableHead={['Fecha', 'Observacion']}
                    tableData={this.state.entry}
                    listEntries={this.listEntries}
                  />
                ),
              },
              {
                tabName: 'STOCK ACTUAL',
                tabIcon: Assignment,
                tabContent: (
                  <CurrentStock
                    tableHeaderColor="gamsBlue"
                    tableHead={['Producto', 'Cantidad', 'Cant. Minima', 'Estado']}
                    tableData={this.state.stock}
                    listStock={this.listStock}
                  />
                ),
              },
              {
                tabName: 'SALIDAS',
                tabIcon: Arrow_Downward,
                tabContent: (
                  <DepartureConsumption
                    tableHeaderColor="gamsBlue"
                    tableHead={['Fecha', 'Observacion']}
                    tableData={this.state.departure}
                    listDepartures={this.listDeparture}
                  />
                ),
              },
            ]}
            handleOnTabChange={this.handleOnTabChange}
          />
        </GridItem>
        <GridItem>
          <Card className={classes.cardCenter}>
            {this.state.activeTab === 0 ? (
              <Pagination
                listCallback={this.listEntries}
                currentPage={this.state.pageEntry}
                totalPages={this.state.totalPagesEntry}
                color="gamsRed"
              />
            ) : this.state.activeTab === 1 ? (
              <Pagination
                listCallback={this.listStock}
                currentPage={this.state.pageStock}
                totalPages={this.state.totalPagesStock}
                color="gamsRed"
              />
            ) : (
              <Pagination
                listCallback={this.listDeparture}
                currentPage={this.state.pageDeparture}
                totalPages={this.state.totalPagesDeparture}
                color="gamsRed"
              />
            )}
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(tablesSectionsstyle)(TableStockSection);
