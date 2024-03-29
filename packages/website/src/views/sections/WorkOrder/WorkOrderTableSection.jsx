import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import WorkOrderTable from '../../components/Table/WorkOrderTable';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceWorkOrder from '../../../services/api/workOrder';
import Pagination from '../../components/Pagination/Pagination';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';
import { toDate } from '../../../utils/helpers/dateHelper';

class WorkOrderTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrder: [],
      totalPages: 1,
      page: 1,
    };
  }

  //se obtienen las ordenes de trabajo
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
          toDate(workOrder.orderDate),
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

  render() {
    const { classes, roles } = this.props;
    return (
      <GridContainer justify={'center'}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Órdenes de Trabajo</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todas las órdenes de trabajo</p>
            </CardHeader>
            <CardBody>
              <WorkOrderTable
                tableHeaderColor="gamsBlue"
                tableHead={[
                  'Fecha de solicitud',
                  'Prioridad',
                  'Usuario solicitante',
                  'Activo',
                  'Estado',
                  'Responsables',
                ]}
                tableData={this.state.workOrder}
                listWorkOrders={this.listWorkOrders}
                roles={roles}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card className={classes.cardCenter}>
            <Pagination
              listCallback={this.listWorkOrders}
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

export default withStyles(tablesSectionsstyle)(WorkOrderTableSection);
