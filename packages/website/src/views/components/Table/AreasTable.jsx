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
// core components
import tableStyle from '../../../styles/jss/material-dashboard-react/components/tableStyle.jsx';
import UpdateAreaSection from '../../sections/Area/UpdateAreaSection';
import DeleteAreaSection from '../../sections/Area/DeleteAreaSection';
import LoadMapArea from '../../sections/Area/LoadMapArea';
import MapIcon from '@material-ui/icons/Map';

class AreasTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      deleteModal: false,
      mapModal: false,
      area: {},
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  //se crea la ventana emergente en donde se cargaran los mapas
  handleClickLoadMap = async prop => {
    this.setState({
      area: {
        id: prop.id,
        name: prop.visibleData[0],
        services: prop.services,
        maps: prop.maps,
      },
      mapModal: true,
    });
  };

  //se crea la ventana emergente en donde se editaran las areas
  handleClickUpdate = prop => {
    //Se corta el string services y lo transforma en un array de strings
    let services = prop.visibleData[3].split(' - ');

    this.setState({
      area: { id: prop.id, name: prop.visibleData[0], services: services, maps: prop.maps },
      modal: true,
    });
  };

  closeModal = () => {
    this.setState({ modal: false, mapModal: false, deleteModal: false });
  };

  handleClickDelete = prop => {
    this.setState({
      area: { id: prop.id, name: prop.visibleData[0], services: prop.services, maps: prop.maps },
      deleteModal: true,
    });
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;
    return (
      <div className={classes.tableResponsive}>
        <UpdateAreaSection
          area={this.state.area}
          open={this.state.modal}
          close={this.closeModal}
          listAreas={this.props.listAreas}
        />
        <DeleteAreaSection
          area={this.state.area}
          open={this.state.deleteModal}
          close={this.closeModal}
          listAreas={this.props.listAreas}
        />
        <LoadMapArea
          area={this.state.area}
          open={this.state.mapModal}
          close={this.closeModal}
          listAreas={this.props.listAreas}
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
                        onClick={() => this.handleClickLoadMap(prop)}
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

AreasTable.defaultProps = {
  tableHeaderColor: 'gray',
};

AreasTable.propTypes = {
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
  listAreas: PropTypes.func,
};

export default withStyles(tableStyle)(AreasTable);
