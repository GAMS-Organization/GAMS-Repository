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
import MaterialTable from 'material-table';
import serviceProduct from '../../../services/api/products';
import serviceDeparture from '../../../services/api/departureConsumptionStock';

class CompleteWorkOrderSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrder: {},
      errors: {},
      notification: false,
      products: [],
      columns: [],
      data: [],
    };
    //this.listProducts();
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

  async componentWillMount() {
    const response = await serviceProduct.list(1, 500);
    let dataProduct = {};
    for (const product of response.data.items) {
      dataProduct[product.id] = product.name;
    }

    this.setState({
      columns: [{ title: 'Producto', field: 'product', lookup: dataProduct }, { title: 'Cantidad', field: 'quantity' }],
    });
  }

  completeWorkOrder = async e => {
    e.preventDefault();

    const products = [];
    const quantities = [];
    for (const consumption of this.state.data) {
      products.push(parseInt(consumption.product));
      quantities.push(parseInt(consumption.quantity));
    }

    const formElements = e.target.elements;

    const realizationDate = formElements.namedItem('realizationDate').value;
    const taskDescription = formElements.namedItem('taskDescription').value;

    const request = {
      id: this.props.workOrder.id,
      realizationDate: realizationDate,
      taskDescription: taskDescription,
      productId: products,
      quantities: quantities,
    };

    if (products.length !== quantities.length || products.length === 0 || quantities.length === 0) {
      this.setState({
        notification: true,
        errors: { code: 422, errors: 'No se puedo completar la orden de trabajo. Campos incompletos' },
      });
    } else {
      const response = await serviceWorkOrder.complete(request);
      if (response.type === 'COMPLETED_SUCCESFUL') {
        this.setState({ notification: true });
      } else {
        this.setState({ notification: true, errors: response.error });
      }
    }
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
                    <MaterialTable
                      title="Agregue los productos utilizados"
                      columns={this.state.columns}
                      data={this.state.data}
                      options={{ paging: false, search: false, draggable: false, actionsColumnIndex: 3 }}
                      localization={{
                        header: { actions: 'Acciones' },
                        body: {
                          addTooltip: 'Nuevo',
                          deleteTooltip: 'Eliminar',
                          editTooltip: 'Editar',
                          emptyDataSourceMessage: 'Ningun producto añadido',
                          editRow: {
                            saveTooltip: 'Guardar',
                            cancelTooltip: 'Cancelar',
                            deleteText: '¿Estás seguro de querer eliminar este registro?',
                          },
                        },
                      }}
                      editable={{
                        onRowAdd: newData =>
                          new Promise(resolve => {
                            setTimeout(() => {
                              resolve();
                              this.setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                              });
                            }, 600);
                          }),
                        onRowUpdate: (newData, oldData) =>
                          new Promise(resolve => {
                            setTimeout(() => {
                              resolve();
                              if (oldData) {
                                this.setState(prevState => {
                                  const data = [...prevState.data];
                                  data[data.indexOf(oldData)] = newData;
                                  return { ...prevState, data };
                                });
                              }
                            }, 600);
                          }),
                        onRowDelete: oldData =>
                          new Promise(resolve => {
                            setTimeout(() => {
                              resolve();
                              this.setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                              });
                            }, 600);
                          }),
                      }}
                    />
                  </GridItem>
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
                  {/*<GridItem xs={12} sm={12} md={12}>
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
                  </GridItem>*/}
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
