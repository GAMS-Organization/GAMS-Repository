import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Snackbar from '../../components/Snackbar/Snackbar';
// @material-ui/icons components
import AddAlert from '@material-ui/icons/AddAlert';

import serviceWorkOrder from '../../../services/api/workOrder';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import CardFooter from '../../components/Card/CardFooter';
import CardBody from '../../components/Card/CardBody';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import serviceProducts from '../../../services/api/products';

class CompleteWorkOrderSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrder: {},
      errors: {},
      notification: false,
      selectedProducts: [],
      products: [],
    };
    this.listProducts();
  }

  handleClose = () => {
    this.props.close();
    this.setState({ open: false, selectedWorkers: [] });
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props !== nextProps || this.state !== nextState;
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  listProducts = async (page = 1, itemsPerPage = 150) => {
    const response = await serviceProducts.list(page, itemsPerPage);
    console.log(response);
    let products = [];
    for (const product of response.data.items) {
      let productsData = { id: product.id, name: product.name };
      products.push(productsData);
    }
    this.setState({ products });
  };

  handleChangeProducts = event => {
    this.setState({ selectedProducts: event.target.value });
  };

  /*completeWorkOrder = async e => {
    e.preventDefault();

    const fields = ['startDate', 'workers'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    const assignData = {
      id: this.props.workOrder.id,
      startDate: formValues.startDate,
      workersId: this.state.selectedWorkers,
    };

    const response = await serviceWorkOrder.assign(assignData);
    this.handleClose();
    if (response.type === 'ASSIGN_SUCCESSFUL') {
      this.setState({ notification: true, open: false });
      this.props.listWorkOrders();
      this.props.close();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };*/

  render() {
    const { classes, workOrder, Transition, open, close } = this.props;
    const { errors } = this.state;
    const { id } = workOrder;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.details}`
              : 'Orden de trabajo completada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />

        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal,
          }}
          open={open}
          TransitionComponent={Transition}
          onClose={this.handleClose}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
            <h4 className={classes.modalTitle}>Completar Orden de Trabajo</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.completeWorkOrder}>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText=""
                      id="realizationDate"
                      value={this.state.dateNow}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'date',
                        required: true,
                        name: 'date',
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Comentarios"
                      id="taskDescription"
                      error={errors.razon}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        defaultValue: '',
                        name: 'taskDescription',
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <InputLabel htmlFor="multiple-select" className={classes.selectLabel}>
                        Productos
                      </InputLabel>
                      <Select
                        multiple
                        value={this.state.selectedProducts}
                        onChange={this.handleChangeProducts}
                        MenuProps={{
                          className: classes.selectMenu,
                          classes: { paper: classes.selectPaper },
                        }}
                        classes={{
                          select: classes.select,
                        }}
                        inputProps={{
                          name: 'products',
                          id: 'products',
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                        >
                          Productos
                        </MenuItem>
                        {this.state.products.map(product => (
                          <MenuItem
                            key={product.id}
                            value={product.id}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelectedMultiple,
                            }}
                          >
                            {product.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <GridContainer>
                <GridItem justify={'center'} xs={4} sm={7} md={8}>
                  <CardFooter>
                    <Button type="submit" color="gamsRed">
                      Sí
                    </Button>
                  </CardFooter>
                </GridItem>
                <GridItem justify={'center'} xs={8} sm={5} md={4}>
                  <CardFooter>
                    <Button type="reset" color="danger" simple onClick={this.handleClose}>
                      No
                    </Button>
                  </CardFooter>
                </GridItem>
              </GridContainer>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

CompleteWorkOrderSection.propTypes = {
  classes: PropTypes.object.isRequired,
  workOrder: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listWorkOrders: PropTypes.func,
};

export default withStyles(modalStyle)(CompleteWorkOrderSection);
