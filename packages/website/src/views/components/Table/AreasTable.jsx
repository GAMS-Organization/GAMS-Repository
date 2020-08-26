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
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons components
import AddAlert from '@material-ui/icons/AddAlert';
import Close from '@material-ui/icons/Close';
import Edit from '@material-ui/icons/Edit';
// core components
import tableStyle from '../../../styles/jss/material-dashboard-react/components/tableStyle.jsx';
import Snackbar from '../Snackbar/Snackbar';
import UpdateAreaSection from '../../sections/Area/UpdateAreaSection';
import serviceArea from '../../../services/api/area';
import UpdateProductSection from '../../sections/Products/UpdateProductSection';
import area from '../../../services/api/area';
import LoadMapArea from '../../sections/Area/LoadMapArea';
import MapIcon from '@material-ui/icons/Map';

class AreasTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      area: {},
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  //se elimina el area
  deleteArea = async prop => {
    const response = await serviceArea.delete(prop[0]);

    if (response.type === 'DELETED_SUCCESFUL') {
      this.setState({ notification: true });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
    window.location.reload();
  };

  //se crea la ventana emergente en donde se editaran las areas
  handleClickUpdate = prop => {
    //Se corta el string services y lo transforma en un array de strings
    var servicio = prop.visibleData[4].split(' - ');

    this.setState({ area: { id: prop.visibleData[0], name: prop.visibleData[1], services: servicio } });
    this.child.showModal(servicio);
  };

  //se crea la ventana emergente en donde se cargaran los mapas
  handleClickLoadMap = async prop => {
    this.setState({
      area: { id: prop.visibleData[0], name: prop.visibleData[1], services: prop.services, maps: prop.maps },
    });
    this.son.showModal(prop.services);
  };

  componentWillMount = () => {
    this.setState({ modal: false });
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
              ? `Error ${this.state.errors.code}, ${this.state.errors.errors}`
              : 'Area eliminada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <UpdateAreaSection area={this.state.area} onRef={ref => (this.child = ref)} Transition={Transition} />
        <LoadMapArea area={this.state.area} onRef={ref => (this.son = ref)} Transition={Transition} />
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
                        onClick={this.handleClickUpdate.bind(this, prop)}
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
                        onClick={this.deleteArea.bind(this, prop)}
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
                        onClick={this.handleClickLoadMap.bind(this, prop)}
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
};

export default withStyles(tableStyle)(AreasTable);
