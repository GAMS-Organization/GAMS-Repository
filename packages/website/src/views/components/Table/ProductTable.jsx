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
import UpdateProductSection from '../../sections/Products/UpdateProductSection';
import Snackbar from '../Snackbar/Snackbar';

import serviceProduct from '../../../services/api/products';
import CustomInput from '../CustomInput/CustomInput';
import Search from '@material-ui/icons/Search';
import classNames from 'classnames';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      product: {},
      errors: {},
      notification: false,
      search: '',
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  //se crea la ventana emergente en donde se editaran los productos
  handleClickUpdate = prop => {
    console.log(prop);
    this.setState({ product: { id: prop.id, name: prop[0] }, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  //se elimina el producto
  deleteProduct = async prop => {
    const response = await serviceProduct.delete(prop.id);

    if (response.type === 'DELETED_SUCCESFUL') {
      this.setState({ notification: true });
      this.props.listProducts();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;
    let filteredData = tableData;
    if (this.state.search !== '') {
      filteredData = tableData.filter(item => {
        return item[1].toLowerCase().includes(this.state.search.toLowerCase());
      });
    }
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
        <UpdateProductSection
          product={this.state.product}
          open={this.state.modal}
          close={this.closeModal}
          listProducts={this.props.listProducts}
        />
        <div className={classes.searchInputContainer}>
          <CustomInput
            labelText="Buscar"
            id="search"
            formControlProps={{
              fullWidth: true,
              className: 'mt0',
            }}
            inputProps={{
              required: true,
              defaultValue: '',
              name: 'search',
              onChange: e => {
                this.setState({ search: e.target.value });
              },
            }}
          />
          <Search className={classNames(classes.itemIcon)}>{}</Search>
        </div>
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
            {filteredData.map((prop, key) => {
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
                        onClick={() => this.deleteProduct(prop)}
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
  listProducts: PropTypes.func,
};

export default withStyles(tableStyle)(ProductTable);
