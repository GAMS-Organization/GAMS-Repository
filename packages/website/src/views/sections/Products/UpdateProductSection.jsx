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

import serviceProduct from '../../../services/api/products';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';

class UpdateProductSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
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

  //se actualiza el producto luego de ser editado
  updateProduct = async e => {
    e.preventDefault();

    const formValues = {
      id: this.props.product.id,
      name: this.state.product.name ? this.state.product.name : this.props.product.name,
    };

    const response = await serviceProduct.update(formValues);

    if (response.type === 'UPDATED_SUCCESFUL') {
      this.setState({ notification: true, open: false });
      this.props.listProducts();
      this.props.close();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  handleChange = event => {
    this.setState({ product: { ...this.state.product, [event.target.name]: event.target.value } });
  };

  render() {
    const { classes, product, Transition, open, close } = this.props;
    const { errors } = this.state;
    const { id, name } = product;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.details}`
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
          open={open}
          TransitionComponent={Transition}
          onClose={close}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
            <h4 className={classes.modalTitle}>Actualizar producto</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.updateProduct}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={1}>
                  <CustomInput
                    labelText="ID"
                    id="id"
                    error={errors.name}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      required: true,
                      defaultValue: id,
                      name: 'id',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Nombre"
                    id="name"
                    error={errors.name}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      defaultValue: name,
                      name: 'name',
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Button type="submit" color="gamsRed">
                Actualizar
              </Button>
              <Button color="danger" simple onClick={() => close()}>
                Cancelar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

UpdateProductSection.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listProducts: PropTypes.func,
};

export default withStyles(modalStyle)(UpdateProductSection);
