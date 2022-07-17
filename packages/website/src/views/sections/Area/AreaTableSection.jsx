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
    const response = await serviceArea.list(page, itemsPerPage);

    let areas = [];
    for (const area of response.data.items) {
      let dataArea = {
        visibleData: [area.name, area.code, area.sector, area.services.toString().replace(/,/gi, ' - ')],
        id: area.id.toString(),
        maps: area.maps,
        services: area.services,
      };
      areas.push(dataArea);
    }
    this.setState({ area: areas, totalPages: response.data.pageCount, page: page });
  };

  render() {
    const { classes, shouldLoad, onLoad } = this.props;
    if (shouldLoad) {
      this.listAreas();
      onLoad(false);
    }
    return (
      <GridContainer justify={'center'}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Areas</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todas las areas</p>
            </CardHeader>
            <CardBody>
              <AreasTable
                tableHeaderColor="gamsBlue"
                tableHead={['Nombre', 'Codigo', 'Sector', 'Servicios']}
                tableData={this.state.area}
                listAreas={this.listAreas}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card className={classes.cardCenter}>
            <Pagination
              listCallback={this.listAreas}
              currentPage={this.state.page}
              totalPages={this.state.totalPages}
              color="gamsRed"
            />
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(tablesSectionsstyle)(AreaTableSection);
