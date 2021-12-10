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
import MapIcon from '@material-ui/icons/Map';
// core components
import tableStyle from '../../../styles/jss/material-dashboard-react/components/tableStyle.jsx';
import UpdateSectorSection from '../../sections/Sector/UpdateSectorSection.jsx';
import Snackbar from '../Snackbar/Snackbar';

import serviceSector from '../../../services/api/sector';
import DeleteSectorSection from '../../sections/Sector/DeleteSectorSection';

class SectorTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      deleteModal: false,
      sector: {},
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  //se crea la ventana emergente en donde se cargaran los mapas
  handleClickLoad = async prop => {
    this.setState({
      sector: { id: prop.id, name: prop.visibleData[0], code: prop.visibleData[1], map: prop.visibleData[2] },
      modal: true,
    });
  };

  closeModal = () => {
    this.setState({ modal: false, deleteModal: false });
  };

  handleClickDelete = prop => {
    this.setState({
      sector: { id: prop.id, name: prop.visibleData[0] },
      deleteModal: true,
    });
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;
    return (
      <div className={classes.tableResponsive}>
        <UpdateSectorSection
          sector={this.state.sector}
          open={this.state.modal}
          close={this.closeModal}
          listSectors={this.props.listSectors}
        />
        <DeleteSectorSection
          sector={this.state.sector}
          open={this.state.deleteModal}
          close={this.closeModal}
          listSectors={this.props.listSectors}
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
                      title="Eliminar"
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
                    <Tooltip
                      id="tooltip-top-map"
                      title="Ver mapa"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Maps"
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickLoad(prop)}
                      >
                        <MapIcon className={classes.tableActionButtonIcon + ' ' + classes.edit} />
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

SectorTable.defaultProps = {
  tableHeaderColor: 'gray',
};

SectorTable.propTypes = {
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
  listSectors: PropTypes.func,
};

export default withStyles(tableStyle)(SectorTable);
