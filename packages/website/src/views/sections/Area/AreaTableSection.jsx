import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import AreasTable from '../../components/Table/AreasTable.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceArea from '../../../services/api/area';
import Pagination from '../../components/Pagination/Pagination';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';

class AreaTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: [],
      totalPages: 1,
      page: 1,
    };
  }

  //se obtienen los areas
  async componentWillMount() {
    await this.listAreas();
  }

  listAreas = async (page = 1, itemsPerPage = 15) => {
    const response = await serviceArea.list();

    let areas = [];
    for (const area of response.data.items) {
      let dataArea = [area.id.toString(), area.name, area.code, area.sector, area.services.toString().replace(/,/gi, ' - ', )];
      areas.push(dataArea);
    }
    this.setState({ area: areas, totalPages: response.data.pageCount, page: page  });
  };

  pagination = () => {
    const pages = [
      {
        text: 'PREV',
        onClick: () => {
          this.state.page === 1? this.listAreas(1) : this.listAreas(this.state.page-1);
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
            this.listAreas(index);
          },
        });
      }
    }
    pages.push({
      text: 'NEXT',
      onClick: () => {
        this.state.page === this.state.totalPages? this.listAreas(this.state.totalPages) : this.listAreas(this.state.page + 1);
      },
    });
    return pages;
  };


  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Areas</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todas las areas</p>
            </CardHeader>
            <CardBody>
              <AreasTable
                tableHeaderColor="gamsBlue"
                tableHead={['ID', 'Nombre', 'Codigo', 'Sector', 'Servicios']}
                tableData={this.state.area}
              />
            </CardBody>
          </Card>
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

export default withStyles(tablesSectionsstyle)(AreaTableSection);
