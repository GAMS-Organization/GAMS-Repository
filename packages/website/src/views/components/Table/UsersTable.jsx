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
import Edit from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
// core components
import tableStyle from '../../../styles/jss/material-dashboard-react/components/tableStyle.jsx';
import UpdateUserSection from '../../sections/Users/UpdateUserSection';
import Snackbar from '../Snackbar/Snackbar';

import serviceUser from '../../../services/api/user';
import DeleteUserSection from '../../sections/Users/DeleteUserSection';
import EnableUserSection from '../../sections/Users/EnableUserSection';

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      deleteModal: false,
      enableModal: false,
      user: {},
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  handleClickDelete = prop => {
    this.setState({
      user: { id: prop.id, name: prop.visibleData[0], surname: prop.visibleData[1] },
      deleteModal: true,
    });
  };

  handleClickEnable = prop => {
    this.setState({
      user: { id: prop.id, name: prop.visibleData[0], surname: prop.visibleData[1] },
      enableModal: true,
    });
  };

  //se crea la ventana emergente en donde se editaran los usuarios
  handleClickUpdate = async userId => {
    const res = await serviceUser.getById(userId);
    this.setState({ user: res, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false, deleteModal: false, enableModal: false });
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor, roles } = this.props;
    return (
      <div className={classes.tableResponsive}>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.errors}`
              : 'Usuario eliminado correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <UpdateUserSection
          user={this.state.user}
          open={this.state.modal}
          close={this.closeModal}
          listUsers={this.props.listUsers}
        />
        <DeleteUserSection
          user={this.state.user}
          open={this.state.deleteModal}
          close={this.closeModal}
          listUsers={this.props.listUsers}
        />
        <EnableUserSection
          user={this.state.user}
          open={this.state.enableModal}
          close={this.closeModal}
          listUsers={this.props.listUsers}
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
                  {roles.includes('admin') && (
                    <TableCell className={classes.tableActions}>
                      <Tooltip id="tooltip-top" title="Editar" placement="top" classes={{ tooltip: classes.tooltip }}>
                        <IconButton
                          aria-label="Edit"
                          className={classes.tableActionButton}
                          onClick={() => this.handleClickUpdate(prop.id)}
                        >
                          <Edit className={classes.tableActionButtonIcon + ' ' + classes.edit} />
                        </IconButton>
                      </Tooltip>
                      {prop.visibleData[4] === 'Activo' ? (
                        <Tooltip
                          id="tooltip-top-start"
                          title="Desactivar"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Close"
                            className={classes.tableActionButton}
                            onClick={() => this.handleClickDelete(prop)}
                          >
                            <Close className={classes.tableActionButtonIcon + ' ' + classes.close} />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          id="tooltip-top-start"
                          title="Activar"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Close"
                            className={classes.tableActionButton}
                            onClick={() => this.handleClickEnable(prop)}
                          >
                            <CheckIcon className={classes.tableActionButtonIcon + ' ' + classes.close} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

UsersTable.defaultProps = {
  tableHeaderColor: 'gray',
};

UsersTable.propTypes = {
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
  listUsers: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(tableStyle)(UsersTable);
