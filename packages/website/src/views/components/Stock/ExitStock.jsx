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
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import Slide from '@material-ui/core/Slide';
import Snackbar from '../Snackbar/Snackbar';
import AddAlert from '@material-ui/icons/AddAlert';

import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';
import Visibility from '@material-ui/icons/Visibility';

import tasksStyle from '../../../styles/jss/material-dashboard-react/components/tasksStyle.jsx';

class ExitStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      entry: {},
      errors: {},
      notification: false,
    };
    /*this.deleteEntry = this.deleteEntry.bind(this);*/
    this.closeNotification = this.closeNotification.bind(this);
  }

  closeNotification() {
    this.setState({ notification: false });
  }

  /*async deleteEntry(prop) {
    const response = await serviceUser.delete(prop[0]);

    if (response.type === 'DELETED_SUCCESFUL') {
      this.setState({ notification: true });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  }*/

  handleClickUpdate(prop) {
    this.setState({
      stock: {
        id: prop[0],
        fecha: prop[1],
        producto: prop[2],
        cantidad: prop[3],
        observacion: prop[5],
      },
    });
    this.child.showModal();
  }

  /*async componentWillMount() {
        const response = await serviceProduct.list();
        let products = [];
        for (const product of response.data.items) {
          let dataProduct = [product.id.toString(), product.name];
          products.push(dataProduct);
        }
    
        this.setState({ product: products });
    }*/

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
              : 'Salida eliminada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
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
                  {prop.map((prop, key) => {
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

ExitStock.defaultProps = {
  tableHeaderColor: 'gamsBlue',
};

ExitStock.propTypes = {
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

export default withStyles(tasksStyle)(ExitStock);
