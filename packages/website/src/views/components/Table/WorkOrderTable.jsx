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
import AddAlert from '@material-ui/icons/AddAlert';
import Close from '@material-ui/icons/Close';
import PanToolIcon from '@material-ui/icons/PanTool';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// core components
import tableStyle from '../../../styles/jss/material-dashboard-react/components/tableStyle.jsx';
import Snackbar from '../Snackbar/Snackbar';

import CancelWorkOrderSection from '../../sections/WorkOrder/CancelWorkOrderSection.jsx';
import TakeWorkOrderSection from '../../sections/WorkOrder/TakeWorkOrderSection';
import AssignWorkOrderSection from '../../sections/WorkOrder/AssignWorkOrderSection';

class WorkOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelModal: false,
      takeModal: false,
      assignModal: false,
      workOrder: {},
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
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

  closeModal = () => {
    this.setState({ cancelModal: false, takeModal: false, assignModal: false });
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;
    return (
      <div className={classes.tableResponsive}>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.errors}`
              : 'Orden de trabajo cancelada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
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
                      title="Cancelar"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Cancel"
                        disabled={prop.visibleData[4] === 'cancelada'}
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickCancel(prop)}
                      >
                        <Close className={classes.tableActionButtonIcon + ' ' + classes.close} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Tomar"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Take"
                        disabled={
                          prop.visibleData[4] === 'cancelada' ||
                          prop.visibleData[4] === 'tomada' ||
                          prop.visibleData[4] === 'asignada'
                        }
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickTake(prop)}
                      >
                        <PanToolIcon className={classes.tableActionButtonIcon + ' ' + classes.close} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Assign"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Assign"
                        disabled={
                          prop.visibleData[4] === 'cancelada' ||
                          prop.visibleData[4] === 'asignada' ||
                          prop.visibleData[4] === 'tomada'
                        }
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickAssign(prop)}
                      >
                        <AssignmentIndIcon className={classes.tableActionButtonIcon + ' ' + classes.close} />
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
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  listWorkOrders: PropTypes.func,
};

export default withStyles(tableStyle)(WorkOrderTable);
