import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import ServiceTable from '../../components/Table/ServiceTable.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceService from '../../../services/api/service';
import Pagination from '../../components/Pagination/Pagination';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';

class ServiceTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      totalPages: 1,
      page: 1,
    };
  }

  //obtiene los servicios
  async componentWillMount() {
    await this.listServices();
  }

  listServices = async (page = 1, itemsPerPage = 15) => {
    const response = await serviceService.list(page, itemsPerPage);
    let services = [];
    for (const service of response.data.items) {
      let dataService = { visibleData: [service.name, service.code], id: service.id.toString() };
      services.push(dataService);
    }

    this.setState({ service: services, totalPages: response.data.pageCount, page: page });
  };

  pagination = () => {
    const pages = [
      {
        text: 'PREV',
        onClick: () => {
          this.state.page === 1 ? this.listServices(1) : this.listServices(this.state.page - 1);
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
            this.listServices(index);
          },
        });
      }
    }
    pages.push({
      text: 'NEXT',
      onClick: () => {
        this.state.page === this.state.totalPages
          ? this.listServices(this.state.totalPages)
          : this.listServices(this.state.page + 1);
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
              <h4 className={classes.cardTitleWhite}>servicios</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todos los servicios</p>
            </CardHeader>
            <CardBody>
              <ServiceTable
                tableHeaderColor="gamsBlue"
                tableHead={['Nombre', 'Codigo']}
                tableData={this.state.service}
                listServices={this.listServices}
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

export default withStyles(tablesSectionsstyle)(ServiceTableSection);
