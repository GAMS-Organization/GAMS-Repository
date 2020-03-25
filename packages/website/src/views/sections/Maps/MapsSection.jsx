import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
import Arrow_Upward from '@material-ui/icons/ArrowUpward';
// components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomTabs from '../../components/CustomTabs/CustomTabs.jsx';
import CurrentStock from '../../components/Stock/CurrentStock.jsx';
import DepartureConsumption from '../../components/Stock/DepartureConsumption';
import MapsSectorTable from '../../components/Maps/MapsSectorTable';
import serviceSector from '../../../services/api/sector';
import Pagination from '../../components/Pagination/Pagination';
import Card from '../../components/Card/Card.jsx';

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
  cardCenter: {
    alignItems: 'center',
  },
};

class MapsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sector: [],
      entry: [],
      stock: [],
      departure: [],
      totalPages: 1,
      page: 1,
    };
  }

  componentWillMount = async () => {
    await this.listSectors();
  };

  //obtiene los sectores
  listSectors = async (page = 1, itemsPerPage = 15) => {
    const responseSector = await serviceSector.list(page, itemsPerPage);
    let sectors = [];
    for (const sector of responseSector.data.items) {
      let dataSector = [sector.id.toString(), sector.name, sector.code];
      sectors.push(dataSector);
    }

    this.setState({ sector: sectors });
  };

  pagination = () => {
    const pages = [
      {
        text: 'PREV',
        onClick: () => {
          this.state.page === 1 ? this.listSectors(1) : this.listSectors(this.state.page - 1);
        },
      },
    ];
    for (let index = 1; index <= this.state.totalPages; index++) {
      if (index === this.state.page) {
        pages.push({ text: index, active: true });
      } else {
        pages.push({
          text: index,
          onClick: async () => {
            this.listSectors(index);
          },
        });
      }
    }
    pages.push({
      text: 'NEXT',
      onClick: () => {
        this.state.page === this.state.totalPages
          ? this.listSectors(this.state.totalPages)
          : this.listSectors(this.state.page + 1);
      },
    });
    return pages;
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
                tabName: 'SECTOR',
                tabIcon: Arrow_Upward,
                tabContent: (
                  <MapsSectorTable
                    tableHeaderColor="gamsBlue"
                    tableHead={['ID', 'Nombre', 'Codigo']}
                    tableData={this.state.sector}
                  />
                ),
              },
              {
                tabName: 'STOCK ACTUAL',
                tabIcon: Arrow_Upward,
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
                tabIcon: Arrow_Upward,
                tabContent: (
                  <DepartureConsumption
                    tableHeaderColor="gamsBlue"
                    tableHead={['ID', 'Fecha', 'Producto', 'Cantidad', 'Observacion']}
                    tableData={this.state.departure}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes.cardCenter}>
            <Pagination pages={this.pagination()} color="gamsRed" />
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(MapsSection);
