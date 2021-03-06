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

import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';

class ViewDepartureConsumption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departure: {},
      //rolSelected: 'user',
      errors: {},
      open: false,
      notification: false,
      rolClicked: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  handleClose() {
    this.setState({ open: false, rolClicked: false });
  }

  showModal() {
    this.setState({ open: true });
  }

  closeNotification() {
    this.setState({ notification: false, errors: {} });
  }

  showProducts = consumptions => {
    return consumptions.map(consumption => {
      return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Producto"
              id="product"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                disabled: true,
                defaultValue: consumption.product.name,
                name: 'product',
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <CustomInput
              labelText="Cantidad"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                disabled: true,
                defaultValue: consumption.quantity,
                name: 'quantity',
              }}
            />
          </GridItem>
        </GridContainer>
      );
    });
  };

  render() {
    const { classes, departure, Transition } = this.props;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.details}`
              : 'Producto actualizado correctamente'
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
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.state.open}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
            <h4 className={classes.modalTitle}>Detalles de la salida</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            {departure.consumptions ? (
              <>
                {this.showProducts(departure.consumptions)}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      labelText="Observaciones"
                      id="observations"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        defaultValue: departure.observations,
                        name: 'observations',
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Fecha"
                      id="date"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        defaultValue: departure.date,
                        name: 'date',
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </>
            ) : null}
            <Button color="gamsRed" onClick={this.handleClose}>
              Cerrar
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

ViewDepartureConsumption.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(modalStyle)(ViewDepartureConsumption);
