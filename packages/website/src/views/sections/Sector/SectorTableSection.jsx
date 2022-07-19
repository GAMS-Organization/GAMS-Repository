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
      let dataSector = { visibleData: [sector.name, sector.code, sector.map], id: sector.id.toString() };
      sectors.push(dataSector);
    }

    this.setState({ sector: sectors, totalPages: response.data.pageCount, page: page });
  };

  render() {
    const { classes, shouldLoad, onLoad } = this.props;
    if (shouldLoad) {
      this.listSectors();
      onLoad(false);
    }
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
                tableHead={['Nombre', 'Codigo', 'Ruta archivo']}
                tableData={this.state.sector}
                listSectors={this.listSectors}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card className={classes.cardCenter}>
            <Pagination
              listCallback={this.listSectors}
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

export default withStyles(tablesSectionsstyle)(SectorTableSection);
