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
// core components
import tableStyle from '../../../styles/jss/material-dashboard-react/components/tableStyle.jsx';

import Edit from '@material-ui/icons/Edit';
import UpdateEducationalElementRequestSection from '../../sections/EducationalElement/UpdateEducationalElementRequestSection';
import DeleteRequestEducationalElementSection from '../../sections/EducationalElement/DeleteRequestEducationalElementSection';

class EducationalElementRequestTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      deleteModal: false,
      educationalElementRequest: {},
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  handleClickUpdate = prop => {
    this.setState({
      educationalElementRequest: {
        id: prop.id,
        status: prop.visibleData[3],
        areaId: prop.areaId,
      },
      modal: true,
    });
  };

  closeModal = () => {
    this.setState({ modal: false, deleteModal: false });
  };

  handleClickDelete = prop => {
    this.setState({
      educationalElementRequest: { id: prop.id, name: prop.visibleData[0] },
      deleteModal: true,
    });
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;

    return (
      <div className={classes.tableResponsive}>
        <UpdateEducationalElementRequestSection
          educationalElementRequest={this.state.educationalElementRequest}
          open={this.state.modal}
          close={this.closeModal}
          listEducationalElementRequest={this.props.listEducationalElementRequest}
        />
        <DeleteRequestEducationalElementSection
          educationalElementRequest={this.state.educationalElementRequest}
          open={this.state.deleteModal}
          close={this.closeModal}
          listEducationalElementRequest={this.props.listEducationalElementRequest}
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
                    <Tooltip id="tooltip-top" title="Editar" placement="top" classes={{ tooltip: classes.tooltip }}>
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickUpdate(prop)}
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

EducationalElementRequestTable.defaultProps = {
  tableHeaderColor: 'gray',
};

EducationalElementRequestTable.propTypes = {
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
  listEducationalElementRequest: PropTypes.func,
};

export default withStyles(tableStyle)(EducationalElementRequestTable);
