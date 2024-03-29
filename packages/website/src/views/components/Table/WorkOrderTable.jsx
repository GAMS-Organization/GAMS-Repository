import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons components
import Close from '@material-ui/icons/Close';
import PanToolIcon from '@material-ui/icons/PanTool';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Visibility from '@material-ui/icons/Visibility';

// core components
import tableStyle from '../../../styles/jss/material-dashboard-react/components/tableStyle.jsx';

import CancelWorkOrderSection from '../../sections/WorkOrder/CancelWorkOrderSection.jsx';
import TakeWorkOrderSection from '../../sections/WorkOrder/TakeWorkOrderSection';
import AssignWorkOrderSection from '../../sections/WorkOrder/AssignWorkOrderSection';
import CompleteWorkOrderSection from '../../sections/WorkOrder/CompleteWorkOrderSection';
import DetailWorkOrderSection from '../../sections/WorkOrder/DetailWorkOrderSection';
import serviceWorkOrder from '../../../services/api/workOrder';

class WorkOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelModal: false,
      takeModal: false,
      assignModal: false,
      completeModal: false,
      detailModal: false,
      workOrder: {},
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  handleClickDetail = async prop => {
    const workOrderDetails = await serviceWorkOrder.show(prop.id);
    this.setState({ workOrder: workOrderDetails.data.data, detailModal: true });
  };

  handleClickCancel = async prop => {
    this.setState({ workOrder: { id: prop.id }, cancelModal: true });
  };

  handleClickTake = async prop => {
    this.setState({ workOrder: { id: prop.id }, takeModal: true });
  };

  handleClickAssign = async prop => {
    this.setState({ workOrder: { id: prop.id }, assignModal: true });
  };

  handleClickComplete = async prop => {
    this.setState({ workOrder: { id: prop.id }, completeModal: true });
  };

  closeModal = () => {
    this.setState({
      cancelModal: false,
      takeModal: false,
      assignModal: false,
      completeModal: false,
      detailModal: false,
    });
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor, roles } = this.props;
    return (
      <div className={classes.tableResponsive}>
        <DetailWorkOrderSection
          workOrder={this.state.workOrder}
          open={this.state.detailModal}
          close={this.closeModal}
          listWorkOrders={this.props.listWorkOrders}
        />
        <CancelWorkOrderSection
          workOrder={this.state.workOrder}
          open={this.state.cancelModal}
          close={this.closeModal}
          listWorkOrders={this.props.listWorkOrders}
        />
        <TakeWorkOrderSection
          workOrder={this.state.workOrder}
          open={this.state.takeModal}
          close={this.closeModal}
          listWorkOrders={this.props.listWorkOrders}
        />
        <AssignWorkOrderSection
          workOrder={this.state.workOrder}
          open={this.state.assignModal}
          close={this.closeModal}
          listWorkOrders={this.props.listWorkOrders}
        />
        <CompleteWorkOrderSection
          workOrder={this.state.workOrder}
          open={this.state.completeModal}
          close={this.closeModal}
          listWorkOrders={this.props.listWorkOrders}
        />
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell + ' ' + classes.tableHeadCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                <TableRow key={key} hover>
                  {prop.visibleData.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                  <TableCell className={classes.tableActions}>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Detalles"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      disableFocusListener={true}
                    >
                      <IconButton
                        aria-label="Details"
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickDetail(prop)}
                      >
                        <Visibility className={classes.tableActionButtonIcon + ' ' + classes.close} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Cancelar"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      disableFocusListener={true}
                    >
                      <IconButton
                        aria-label="Cancel"
                        disabled={prop.visibleData[4] === 'Cancelada' || prop.visibleData[4] === 'Finalizada'}
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickCancel(prop)}
                      >
                        <Close
                          className={
                            classes.tableActionButtonIcon +
                            ' ' +
                            (prop.visibleData[4] === 'Cancelada' || prop.visibleData[4] === 'Finalizada'
                              ? classes.disabled
                              : classes.close)
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Tomar"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      disableFocusListener={true}
                    >
                      <IconButton
                        aria-label="Take"
                        disabled={
                          prop.visibleData[4] === 'Cancelada' ||
                          prop.visibleData[4] === 'Tomada' ||
                          prop.visibleData[4] === 'Asignada' ||
                          prop.visibleData[4] === 'Finalizada'
                        }
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickTake(prop)}
                      >
                        <PanToolIcon
                          className={
                            classes.tableActionButtonIcon +
                            ' ' +
                            (prop.visibleData[4] === 'Cancelada' ||
                            prop.visibleData[4] === 'Tomada' ||
                            prop.visibleData[4] === 'Asignada' ||
                            prop.visibleData[4] === 'Finalizada'
                              ? classes.disabled
                              : classes.close)
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    {(roles.includes('boss') || roles.includes('admin')) && (
                      <Tooltip
                        id="tooltip-top-start"
                        title="Asignar"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                        disableFocusListener={true}
                      >
                        <IconButton
                          aria-label="Assign"
                          disabled={
                            prop.visibleData[4] === 'Cancelada' ||
                            prop.visibleData[4] === 'Asignada' ||
                            prop.visibleData[4] === 'Tomada' ||
                            prop.visibleData[4] === 'Finalizada'
                          }
                          className={classes.tableActionButton}
                          onClick={() => this.handleClickAssign(prop)}
                        >
                          <AssignmentIndIcon
                            className={
                              classes.tableActionButtonIcon +
                              ' ' +
                              (prop.visibleData[4] === 'Cancelada' ||
                              prop.visibleData[4] === 'Asignada' ||
                              prop.visibleData[4] === 'Tomada' ||
                              prop.visibleData[4] === 'Finalizada'
                                ? classes.disabled
                                : classes.close)
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip
                      id="tooltip-top-start"
                      title="Completar"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      disableFocusListener={true}
                    >
                      <IconButton
                        aria-label="Complete"
                        disabled={
                          prop.visibleData[4] === 'Cancelada' ||
                          prop.visibleData[4] === 'Finalizada' ||
                          prop.visibleData[4] === 'Libre'
                        }
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickComplete(prop)}
                      >
                        <AssignmentIcon
                          className={
                            classes.tableActionButtonIcon +
                            ' ' +
                            (prop.visibleData[4] === 'Cancelada' ||
                            prop.visibleData[4] === 'Finalizada' ||
                            prop.visibleData[4] === 'Libre'
                              ? classes.disabled
                              : classes.close)
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

WorkOrderTable.defaultProps = {
  tableHeaderColor: 'gray',
};

WorkOrderTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
    'gamsBlue',
    'gamsBlack',
    'gamsRed',
    'gamsGray',
    'gamsWhite',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.object),
  listWorkOrders: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(tableStyle)(WorkOrderTable);
