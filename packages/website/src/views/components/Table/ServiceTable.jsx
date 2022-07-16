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
import Close from '@material-ui/icons/Close';
// core components
import tableStyle from '../../../styles/jss/material-dashboard-react/components/tableStyle.jsx';
import UpdateServiceSection from '../../sections/Service/UpdateServiceSection.jsx';

import DeleteServiceSection from '../../sections/Service/DeleteServiceSection';

class ServiceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      modal: false,
      service: {},
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  closeModal = () => {
    this.setState({ deleteModal: false });
  };

  //se crea la ventana emergente en donde se editaran los servicios
  handleClickUpdate = prop => {
    this.setState({ service: { id: prop.id, name: prop.visibleData[0], code: prop.visibleData[1] } });
    this.child.showModal();
  };

  componentWillMount = () => {
    this.setState({ modal: false });
  };

  handleClickDelete = prop => {
    this.setState({
      service: { id: prop.id, name: prop.visibleData[0] },
      deleteModal: true,
    });
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });
    return (
      <div className={classes.tableResponsive}>
        <UpdateServiceSection service={this.state.service} onRef={ref => (this.child = ref)} Transition={Transition} />
        <DeleteServiceSection
          service={this.state.service}
          open={this.state.deleteModal}
          close={this.closeModal}
          listServices={this.props.listServices}
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

ServiceTable.defaultProps = {
  tableHeaderColor: 'gray',
};

ServiceTable.propTypes = {
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
  listServices: PropTypes.func,
};

export default withStyles(tableStyle)(ServiceTable);
