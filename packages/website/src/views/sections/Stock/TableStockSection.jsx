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
import serviceWorkOrder from '../../../services/api/workOrder';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';

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
      totalPages: 1,
      page: 1,
    },
  },
};

class TableStockSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: [{ visibleData: [] }],
      stock: [{ visibleData: [] }],
      departure: [{ visibleData: [] }],
      activeTab: 1,
      totalPagesEntry: 1,
      pageEntry: 1,
      totalPagesStock: 1,
      pageStock: 1,
      totalPagesDeparture: 1,
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

  listStock = async (page = 1, itemsPerPage = 1) => {
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

  listDeparture = async (page = 1, itemsPerPage = 1) => {
    const responseDeparture = await serviceDepartureConsumptionStock.list(page, itemsPerPage);
    let departures = [];

    for (const departure of responseDeparture.data.items) {
      let dataDeparture = {
        visibleData: [toDate(departure.date.slice(0, 10)), departure.observations],
        id: departure.id.toString(),
      };
      departures.push(dataDeparture);
    }
    this.setState({
      departure: departures,
      totalPagesDeparture: responseDeparture.data.pageCount,
      pageDeparture: page,
    });
  };

  pagination = () => {
    if (this.state.activeTab === 0) {
      const pages = [
        {
          text: '<<',
          onClick: () => {
            this.listEntries(1);
          },
        },
        {
          text: '<',
          onClick: () => {
            this.state.pageEntry === 1 ? this.listEntries(1) : this.listEntries(this.state.pageEntry - 1);
          },
        },
      ];
      for (
        let index = this.state.pageEntry - 7 > 0 ? this.state.pageEntry - 7 : 1;
        index <= this.state.pageEntry + 7 && index <= this.state.totalPagesEntry;
        index++
      ) {
        if (index === this.state.pageEntry) {
          pages.push({ text: index, active: true });
        } else {
          pages.push({
            text: index,
            onClick: async () => {
              this.listEntries(index);
            },
          });
        }
      }
      pages.push({
        text: '>',
        onClick: () => {
          this.state.pageEntry === this.state.totalPagesEntry
            ? this.listEntries(this.state.totalPagesEntry)
            : this.listEntries(this.state.pageEntry + 1);
        },
      });
      pages.push({
        text: '>>',
        onClick: () => {
          this.listEntries(this.state.totalPagesEntry);
        },
      });
      return pages;
    } else if (this.state.activeTab === 1) {
      const pages = [
        {
          text: '<<',
          onClick: () => {
            this.listStock(1);
          },
        },
        {
          text: '<',
          onClick: () => {
            this.state.pageStock === 1 ? this.listStock(1) : this.listStock(this.state.pageStock - 1);
          },
        },
      ];
      for (
        let index = this.state.pageStock - 7 > 0 ? this.state.pageStock - 7 : 1;
        index <= this.state.pageStock + 7 && index <= this.state.totalPagesStock;
        index++
      ) {
        if (index === this.state.pageStock) {
          pages.push({ text: index, active: true });
        } else {
          pages.push({
            text: index,
            onClick: async () => {
              this.listStock(index);
            },
          });
        }
      }
      pages.push({
        text: '>',
        onClick: () => {
          this.state.pageStock === this.state.totalPagesStock
            ? this.listStock(this.state.totalPagesStock)
            : this.listStock(this.state.pageStock + 1);
        },
      });
      pages.push({
        text: '>>',
        onClick: () => {
          this.listStock(this.state.totalPagesStock);
        },
      });
      return pages;
    } else {
      const pages = [
        {
          text: '<<',
          onClick: () => {
            this.listDeparture(1);
          },
        },
        {
          text: '<',
          onClick: () => {
            this.state.pageDeparture === 1 ? this.listDeparture(1) : this.listDeparture(this.state.pageDeparture - 1);
          },
        },
      ];
      for (
        let index = this.state.pageDeparture - 7 > 0 ? this.state.pageDeparture - 7 : 1;
        index <= this.state.pageDeparture + 7 && index <= this.state.totalPagesDeparture;
        index++
      ) {
        if (index === this.state.pageDeparture) {
          pages.push({ text: index, active: true });
        } else {
          pages.push({
            text: index,
            onClick: async () => {
              this.listDeparture(index);
            },
          });
        }
      }
      pages.push({
        text: '>',
        onClick: () => {
          this.state.pageDeparture === this.state.totalPagesDeparture
            ? this.listDeparture(this.state.totalPagesDeparture)
            : this.listDeparture(this.state.pageDeparture + 1);
        },
      });
      pages.push({
        text: '>>',
        onClick: () => {
          this.listDeparture(this.state.totalPagesDeparture);
        },
      });
      return pages;
    }
  };

  render() {
    const { classes } = this.props;
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
            <Pagination pages={this.pagination()} color="gamsRed" />
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(tablesSectionsstyle)(TableStockSection);
