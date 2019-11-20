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
import UpdateUserSection from '../../sections/users/UpdateUserSection';
import Snackbar from '../Snackbar/Snackbar';

import serviceProduct from '../../../services/api/products';

class ProductTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        product: {},
        errors: {},
        notification: false,
      };
      this.deleteProduct = this.deleteProduct.bind(this);
      this.handleClickUpdate = this.handleClickUpdate.bind(this);
      this.closeNotification = this.closeNotification.bind(this);
    }
  
    closeNotification() {
      this.setState({ notification: false });
    }
  
    async deleteProduct(prop) {
      const response = await serviceProduct.delete(prop[0]);
  
      if (response.type === 'DELETED_SUCCESFUL') {
        this.setState({ notification: true });
      } else {
        this.setState({ notification: true, errors: response.error });
      }
    }
  
    handleClickUpdate(prop) {
      this.setState({ product: { id: prop[0], name: prop[1] } });
      this.child.showModal();
    }
  
    componentWillMount() {
      this.setState({ modal: false });
    }
  
    render() {
      const { classes, tableHead, tableData, tableHeaderColor } = this.props;
      console.log(tableData);
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
                : 'Producto eliminado correctamente'
            }
            open={this.state.notification}
            closeNotification={this.closeNotification}
            close
          />
          <UpdateUserSection product={this.state.product} onRef={ref => (this.child = ref)} Transition={Transition} />
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
                      <Tooltip
                        id="tooltip-top-start"
                        title="Eliminar"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={this.deleteProduct.bind(this, prop)}
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
  
  ProductTable.defaultProps = {
    tableHeaderColor: 'gray',
  };
  
  ProductTable.propTypes = {
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
  
  export default withStyles(tableStyle)(ProductTable);
  