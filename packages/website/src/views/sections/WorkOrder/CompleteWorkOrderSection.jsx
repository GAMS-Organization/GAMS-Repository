import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
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
import MaterialTable from 'material-table';
import serviceProduct from '../../../services/api/products';

class CompleteWorkOrderSection extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    this.state = {
      workOrder: {},
      errors: {},
      notification: false,
      products: [],
      columns: [],
      data: [],
      dateNow: date,
    };
  }

  handleClose = () => {
    this.setState({ open: false, data: [] });
    this.props.close();
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
      columns: [
        { title: 'Producto', field: 'product', lookup: dataProduct },
        { title: 'Cantidad', field: 'quantity' },
      ],
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

    const taskDescription = formElements.namedItem('taskDescription').value;

    const request = {
      id: this.props.workOrder.id,
      realizationDate: this.state.dateNow,
      taskDescription: taskDescription,
      productsId: products,
      quantities: quantities,
    };

    const response = await serviceWorkOrder.complete(request);
    if (response.type === 'COMPLETED_SUCCESSFUL') {
      this.setState({ notification: true });
      this.props.listWorkOrders();
      this.handleClose();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, Transition, open, close } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.details}`
              : 'Orden de trabajo completada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />

        <Dialog
          classes={{
            root: classes.modalRoot,
          }}
          open={open}
          TransitionComponent={Transition}
          onClose={close}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <GridContainer justify={'center'}>
            <h3 className={classes.modalTitle}>Completar Orden de Trabajo</h3>
          </GridContainer>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.completeWorkOrder}>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <MaterialTable
                      title="Productos"
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
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridContainer justify={'center'}>
                  <GridItem xs={12} sm={6} md={6}>
                    <Button block={true} type="submit" color="gamsRed">
                      Sí
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <Button block={true} type="reset" color="danger" simple onClick={this.handleClose}>
                      No
                    </Button>
                  </GridItem>
                </GridContainer>
              </CardFooter>
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
