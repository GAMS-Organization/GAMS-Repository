import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Slide from '@material-ui/core/Slide';
import AddAlert from '@material-ui/icons/AddAlert';
// @material-ui/icons components
import Close from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
// components
import tasksStyle from '../../../styles/jss/material-dashboard-react/components/tasksStyle.jsx';
import Snackbar from '../Snackbar/Snackbar';
import serviceDepartureConsumptionStock from '../../../services/api/departureConsumptionStock';
import serviceWorkOrder from '../../../services/api/workOrder';
import ViewDepartureConsumption from './ViewDepartureConsumption';
import DeleteDepartureConsumption from './DeleteDepartureConsumption';
import DetailWorkOrderSection from '../../sections/WorkOrder/DetailWorkOrderSection';

class DepartureConsumption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      detailModal: false,
      modal: false,
      departure: {},
      errors: {},
      notification: false,
      workOrder: {},
    };
  }

  closeNotification = () => {
    this.setState({ notification: false });
  };

  closeModal = () => {
    this.setState({ deleteModal: false, detailModal: false });
  };

  handleClickDelete = prop => {
    this.setState({
      departure: { id: prop.id },
      deleteModal: true,
    });
  };

  handleClickSeeDetails = async prop => {
    const departureDetails = await serviceDepartureConsumptionStock.getById(prop.id);
    this.setState({
      departure: departureDetails.data.data,
    });
    this.child.showModal();
  };

  handleClickSeeOrderDetails = async prop => {
    const workOrderResponse = await serviceWorkOrder.show(prop.workOrderId);
    this.setState({
      workOrder: workOrderResponse.data.data,
    });
    this.setState({ detailModal: true });
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });
    return (
      <div className={classes.tableResponsive}>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.errors}`
              : 'Salida eliminada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <ViewDepartureConsumption
          departure={this.state.departure}
          onRef={ref => (this.child = ref)}
          Transition={Transition}
        />
        <DeleteDepartureConsumption
          departure={this.state.departure}
          open={this.state.deleteModal}
          close={this.closeModal}
          listDepartures={this.props.listDepartures}
        />
        <DetailWorkOrderSection
          workOrder={this.state.workOrder}
          open={this.state.detailModal}
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
                      id="tooltip-top"
                      title="Ver"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      disableFocusListener={true}
                    >
                      <IconButton
                        aria-label="Details"
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickSeeDetails(prop)}
                      >
                        <Visibility className={classes.tableActionButtonIcon + ' ' + classes.close} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top"
                      title="Ver orden de trabajo"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      disableFocusListener={true}
                    >
                      <IconButton
                        aria-label="OrderDetails"
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickSeeOrderDetails(prop)}
                        disabled={!prop.workOrderId}
                      >
                        <Visibility
                          className={
                            classes.tableActionButtonIcon + ' ' + (prop.workOrderId ? classes.close : classes.disabled)
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Eliminar"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      disableFocusListener={true}
                    >
                      <IconButton
                        aria-label="Delete"
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickDelete(prop)}
                      >
                        <Close className={classes.tableActionButtonIcon + ' ' + classes.close} />
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

DepartureConsumption.defaultProps = {
  tableHeaderColor: 'gamsBlue',
};

DepartureConsumption.propTypes = {
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
  listDeparture: PropTypes.func,
};

export default withStyles(tasksStyle)(DepartureConsumption);
