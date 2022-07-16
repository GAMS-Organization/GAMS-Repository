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
// core components
import tableStyle from '../../../styles/jss/material-dashboard-react/components/tableStyle.jsx';

import serviceElement from '../../../services/api/element';
import UpdateElementSection from '../../sections/Element/UpdateElementSection';
import Edit from '@material-ui/icons/Edit';
import DeleteElementSection from '../../sections/Element/DeleteElementSection';

class ElementTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      modal: false,
      element: {},
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  handleClickUpdate = async prop => {
    const res = await serviceElement.getById(prop.id);
    this.setState({ element: res, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false, deleteModal: false });
  };

  handleClickDelete = prop => {
    this.setState({
      element: { id: prop.id, name: prop.visibleData[0] },
      deleteModal: true,
    });
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;

    return (
      <div className={classes.tableResponsive}>
        <UpdateElementSection
          element={this.state.element}
          open={this.state.modal}
          close={this.closeModal}
          listElements={this.props.listElements}
        />
        <DeleteElementSection
          element={this.state.element}
          open={this.state.deleteModal}
          close={this.closeModal}
          listElements={this.props.listElements}
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
                      title="Editar"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      disableFocusListener={true}
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickUpdate(prop)}
                      >
                        <Edit className={classes.tableActionButtonIcon + ' ' + classes.edit} />
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
                        aria-label="Close"
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

ElementTable.defaultProps = {
  tableHeaderColor: 'gray',
};

ElementTable.propTypes = {
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
  listElements: PropTypes.func,
};

export default withStyles(tableStyle)(ElementTable);
