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

import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import { toDate } from '../../../utils/helpers/dateHelper';
import CardFooter from '../Card/CardFooter';

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
  }

  componentDidMount = () => {
    this.props.onRef(this);
  };

  componentWillUnmount = () => {
    this.props.onRef(undefined);
  };

  handleClose = () => {
    this.setState({ open: false, rolClicked: false });
  };

  showModal = () => {
    this.setState({ open: true });
  };

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

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
          }}
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.setState({ open: false })}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <GridContainer justify={'center'}>
            <h3 className={classes.modalTitle}>Detalles de la salida</h3>
          </GridContainer>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            {departure.consumptions ? (
              <>
                {this.showProducts(departure.consumptions)}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
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
                        multiline: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Fecha"
                      id="date"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        defaultValue: toDate(departure.date, 3),
                        name: 'date',
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </>
            ) : null}
            <CardFooter>
              <GridContainer justify={'center'}>
                <GridItem xs={12} sm={12} md={6}>
                  <Button block={true} color="gamsRed" onClick={this.handleClose}>
                    Cerrar
                  </Button>
                </GridItem>
              </GridContainer>
            </CardFooter>
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
