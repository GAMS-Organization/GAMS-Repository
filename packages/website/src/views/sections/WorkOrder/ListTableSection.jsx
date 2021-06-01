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
      workOrder: [],
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

    let workOrders = [];
    for (const workOrder of response.items) {
      let name = '';
      for (const worker of workOrder.workers) {
        if (name === '') {
          name = worker.user.name;
        } else {
          name = name + ' - ' + worker.user.name;
        }
      }
      let dataWorkOrder = {
        id: workOrder.id,
        startDate: workOrder.startDate,
        comment: workOrder.comment,
        realizationDate: workOrder.realizationDate,
        visibleData: [
          workOrder.orderDate,
          workOrder.priority,
          workOrder.user.name + ' ' + workOrder.user.surname,
          workOrder.asset.code,
          workOrder.state,
          name,
        ],
      };
      workOrders.push(dataWorkOrder);
    }
    this.setState({ workOrder: workOrders, totalPages: response.pageCount, page: page });
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
                tableHead={['Fecha de solicitud', 'Prioridad', 'Usuario', 'Activo', 'Estado', 'Responsables']}
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
