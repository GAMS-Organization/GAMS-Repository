import React from 'react';
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

import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import CardFooter from '../../components/Card/CardFooter';
import CardBody from '../../components/Card/CardBody';
import PropTypes from 'prop-types';
import serviceWorkOrder from '../../../services/api/workOrder';
import workOrder from '../../../services/api/workOrder';

class DetailWorkOrderSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrder: {},
      errors: {},
      notification: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props !== nextProps || this.state.notification !== nextState.notification;
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  /*showUsers = user => {
    return user.map(users => {
      return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Usuario"
              id="user"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                disabled: true,
                defaultValue: users.name,
                name: 'user',
              }}
            />
          </GridItem>
        </GridContainer>
      );
    });
  };*/

  showWorkers = workers => {
    return workers.map(worker => {
      return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Usuario"
              id="user"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                disabled: true,
                defaultValue: worker.name,
                name: 'user',
              }}
            />
          </GridItem>
        </GridContainer>
      );
    });
  };

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
              : 'Orden de trabajo tomada correctamente'
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
          onClose={close}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
            <h4 className={classes.modalTitle}>Detalles</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Fecha de la orden"
                  id="orderDate"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    type: 'date',
                    name: 'orderDate',
                    defaultValue: workOrder.orderDate,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Prioridad"
                  id="priority"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    name: 'priority',
                    defaultValue: workOrder.priority,
                  }}
                />
              </GridItem>
              {/*{this.showUsers(workOrder.user)}*/}
              {this.showWorkers(workOrder.workers)}
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Activo"
                  id=""
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    name: '',
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Estado"
                  id="state"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    name: 'state',
                    defaltValue: workOrder.state,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Responsables"
                  id=""
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    name: '',
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Día de comienzo"
                  id="startDate"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    name: 'startDate',
                    type: 'date',
                    defaltValue: workOrder.startDate,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Día realizado"
                  id="realizationDate"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    name: 'startDate',
                    type: 'date',
                    defaltValue: workOrder.realizationDate,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Sector"
                  id="sector"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    name: 'sector',
                    defaltValue: workOrder.sector,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Área"
                  id="area"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    name: 'area',
                    defaltValue: workOrder.area,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Servicio"
                  id="servicio"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    name: 'servicio',
                    defaltValue: workOrder.servicio,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Elemento"
                  id="elemento"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    name: 'elemento',
                    defaltValue: workOrder.element,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Detalle"
                  id="details"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    name: 'details',
                    defaltValue: workOrder.details,
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem justify={'center'} xs={4} sm={7} md={4}></GridItem>
              <GridItem justify={'center'} xs={8} sm={5} md={4}>
                <CardFooter>
                  <Button color="danger" simple onClick={() => close()}>
                    Cerrar
                  </Button>
                </CardFooter>
              </GridItem>
            </GridContainer>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

DetailWorkOrderSection.propTypes = {
  classes: PropTypes.object.isRequired,
  workOrder: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listWorkOrders: PropTypes.func,
};

export default withStyles(modalStyle)(DetailWorkOrderSection);
