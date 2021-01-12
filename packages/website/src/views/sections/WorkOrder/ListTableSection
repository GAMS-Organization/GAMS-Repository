import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import ListWorkOrderTable from '../../components/Table/ListWorkOrderTable';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceWorkOrder from '../../../services/api/workOrder';
import Pagination from '../../components/Pagination/Pagination';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';

class ListTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WorkOrder: [],
      totalPages: 1,
      page: 1,
    };
  }

  //se obtienen los activos
  async componentWillMount() {
    await this.listWorkOrders();
  }

  listWorkOrders = async (page = 1, itemsPerPage = 15) => {
    const response = await serviceWorkOrder.list(page, itemsPerPage);
    console.log(response);
    let workOrders = [];
    for (const workOrder of response.data.items) {
      let dataWorkOrder = [
        workOrder.id.toString(),
        workOrder.orderDate,
        workOrder.priority,
        workOrder.comment,
        workOrder.user,
        workOrder.asset,
        workOrder.state,
        workOrder.startDate,
        workOrder.realizationDate,
        workOrder.workers,
      ];
      workOrders.push(dataWorkOrder);
    }
    this.setState({ workOrder: workOrders, totalPages: response.data.pageCount, page: page });
  };

  pagination = () => {
    const pages = [
      {
        text: 'PREV',
        onClick: () => {
          this.state.page === 1 ? this.listWorkOrders(1) : this.listWorkOrders(this.state.page - 1);
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
            this.listWorkOrders(index);
          },
        });
      }
    }
    pages.push({
      text: 'NEXT',
      onClick: () => {
        this.state.page === this.state.totalPages
          ? this.listWorkOrders(this.state.totalPages)
          : this.listWorkOrders(this.state.page + 1);
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
              <h4 className={classes.cardTitleWhite}>Ordenes de trabajo</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todas las ordenes de trabajo</p>
            </CardHeader>
            <CardBody>
              <ListWorkOrderTable
                tableHeaderColor="gamsBlue"
                tableHead={['ID', 'Código', 'Sector', 'Área', 'Servicio', 'Elemento']}
                tableData={this.state.workOrder}
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

export default withStyles(tablesSectionsstyle)(ListTableSection);