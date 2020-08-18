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
import serviceEntryPurchaseStock from '../../../services/api/entryPurchaseStock';
import Snackbar from '../Snackbar/Snackbar';
import ViewEntryPurchase from './ViewEntryPurchase.jsx';

class EntryPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      entry: {},
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false });
  }

  deleteEntry = async prop => {
    const response = await serviceEntryPurchaseStock.delete(prop[0]);

    if (response.type === 'DELETED_SUCCESFUL') {
      this.setState({ notification: true });
      window.location.reload();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  }

   handleClickSeeDetails = async prop => {
    const id = prop[0];
    const entryDetails = await serviceEntryPurchaseStock.getById(id);
    this.setState({
      entry: entryDetails.data.data,
    });
    this.child.showModal();
  }

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
              ? `Error ${this.state.errors.code}, ${this.state.errors.errors}`
              : 'Entrada eliminada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <ViewEntryPurchase entry={this.state.entry} onRef={ref => (this.child = ref)} Transition={Transition} />
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
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                  <TableCell className={classes.tableActions}>
                    <Tooltip id="tooltip-top" title="Ver" placement="top" classes={{ tooltip: classes.tooltip }}>
                      <IconButton
                        aria-label="Visibility"
                        className={classes.tableActionButton}
                        onClick={this.handleClickSeeDetails.bind(this, prop)}
                      >
                        <Visibility className={classes.tableActionButtonIcon + ' ' + classes.Visibility} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Eliminar"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={this.deleteEntry.bind(this, prop)}
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

EntryPurchase.defaultProps = {
  tableHeaderColor: 'gamsBlue',
};

EntryPurchase.propTypes = {
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
};

export default withStyles(tasksStyle)(EntryPurchase);
