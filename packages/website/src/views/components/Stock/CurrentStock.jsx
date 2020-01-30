import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
import Snackbar from '../Snackbar/Snackbar';
import AddAlert from '@material-ui/icons/AddAlert';

import Edit from '@material-ui/icons/Edit';

import tasksStyle from '../../../styles/jss/material-dashboard-react/components/tasksStyle.jsx';

import serviceCurrentStock from '../../../services/api/currentStock';
import UpdateStock from "./UpdateStock";

class CurrentStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      current: {},
      errors: {},
      notification: false,
    };
    this.deleteStock = this.deleteStock.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  closeNotification() {
    this.setState({ notification: false });
  }

  async deleteStock(prop) {
    const response = await serviceCurrentStock.delete(prop[0]);

    if (response.type === 'DELETED_SUCCESFUL') {
      this.setState({ notification: true });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  }

  handleClickUpdate(prop) {
    this.setState({
      current: {
        id: prop[0],
        product: prop[1],
        quantity: prop[2],
        minimunQuantity: prop[3],
        state: prop[4],
      },
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
              : 'Stock eliminado correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <UpdateStock current={this.state.current} onRef={ref => (this.child = ref)} Transition={Transition} />
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
                    <Tooltip id="tooltip-top" title="Editar" placement="top" classes={{ tooltip: classes.tooltip }}>
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={this.handleClickUpdate.bind(this, prop)}
                      >
                        <Edit className={classes.tableActionButtonIcon + ' ' + classes.edit} />
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

CurrentStock.defaultProps = {
  tableHeaderColor: 'gamsBlue',
};

CurrentStock.propTypes = {
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

export default withStyles(tasksStyle)(CurrentStock);
