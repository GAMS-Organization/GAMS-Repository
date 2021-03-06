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

import serviceStock from '../../../services/api/currentStock';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';

class UpdateStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      errors: {},
      open: false,
      notification: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.updateStock = this.updateStock.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  handleClose() {
    this.setState({ open: false });
  }

  showModal() {
    this.setState({ open: true });
  }

  closeNotification() {
    this.setState({ notification: false, errors: {} });
  }

  async updateStock(e) {
    e.preventDefault();

    const fields = ['id', 'quantity', 'minimunQuantity'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    const response = await serviceStock.update(formValues);

    if (response.type === 'UPDATED_SUCCESFUL') {
      this.setState({ notification: true, open: false, rolClicked: false });
      window.location.reload();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  }

  render() {
    const { classes, current, Transition } = this.props;
    const { errors } = this.state;
    const { id, quantity, minimunQuantity } = current;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.details}`
              : 'Stock actualizado correctamente'
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
            <h4 className={classes.modalTitle}>Actualizar stock</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.updateStock}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={1}>
                  <CustomInput
                    labelText="ID"
                    id="id"
                    error={errors.name}
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      disabled: true,
                      defaultValue: id,
                      name: 'id',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Cantidad"
                    id="quantity"
                    error={errors.quantity}
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      defaultValue: quantity,
                      name: 'quantity',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Cantidad Minima"
                    id="minimunQuantity"
                    error={errors.minimunQuantity}
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                      min: 1,
                    }}
                    inputProps={{
                      type: 'number',
                      defaultValue: minimunQuantity,
                      name: 'minimunQuantity',
                      inputProps: { min: 1 },
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Button type="submit" color="gamsRed">
                Actualizar
              </Button>
              <Button color="danger" simple onClick={this.handleClose}>
                Cancelar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

UpdateStock.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(modalStyle)(UpdateStock);
