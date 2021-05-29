import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import SectorTable from '../../components/Table/SectorTable.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceSector from '../../../services/api/sector';
import Pagination from '../../components/Pagination/Pagination';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';

class SectorTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sector: [],
      totalPages: 1,
      page: 1,
    };
  }

  componentWillMount = async () => {
    await this.listSectors();
  };

  //obtiene los sectores
  listSectors = async (page = 1, itemsPerPage = 15) => {
    const response = await serviceSector.list(page, itemsPerPage);
    let sectors = [];
    for (const sector of response.data.items) {
      let dataSector = [sector.id.toString(), sector.name, sector.code, sector.map];
      sectors.push(dataSector);
    }

    this.setState({ sector: sectors, totalPages: response.data.pageCount, page: page });
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
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Sectores</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todos los sectores</p>
            </CardHeader>
            <CardBody>
              <SectorTable
                tableHeaderColor="gamsBlue"
                tableHead={['ID', 'Nombre', 'Codigo', 'Ruta archivo']}
                tableData={this.state.sector}
                listSectors={this.listSectors}
              />
            </CardBody>
          </Card>
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

export default withStyles(tablesSectionsstyle)(SectorTableSection);
