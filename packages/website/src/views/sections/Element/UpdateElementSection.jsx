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
import serviceElement from '../../../services/api/element';
import CardFooter from '../../components/Card/CardFooter';

class UpdateElementSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: {},
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

  //se actualiza el elemento luego de ser editado
  updateElement = async e => {
    e.preventDefault();

    const formValues = {
      id: this.props.element.id,
      name: this.state.element.name ? this.state.element.name : this.props.element.name,
      steps: this.state.element.steps ? this.state.element.steps : this.props.element.steps,
    };

    const response = await serviceElement.update(formValues);

    if (response.type === 'UPDATED_SUCCESSFUL') {
      this.setState({ notification: true, open: false });
      this.props.listElements();
      this.props.close();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  handleChange = event => {
    this.setState({ element: { ...this.state.element, [event.target.name]: event.target.value } });
  };

  render() {
    const { classes, element, Transition, open, close } = this.props;
    const { errors } = this.state;
    const { id, name, code, steps, service } = element;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.details}`
              : 'Elemento actualizado correctamente'
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
            <h3 className={classes.modalTitle}>Actualizar Elemento</h3>
          </GridContainer>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.updateElement}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Código"
                    id="code"
                    error={errors.code}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      required: true,
                      defaultValue: code,
                      name: 'code',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Servicio"
                    id="service"
                    error={errors.service}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      required: true,
                      defaultValue: service,
                      name: 'service',
                    }}
                  />
                </GridItem>
                <GridItem xs={12}>
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
                <GridItem xs={12}>
                  <CustomInput
                    labelText="Pasos"
                    id="steps"
                    error={errors.steps}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      defaultValue: steps,
                      name: 'steps',
                      onChange: this.handleChange,
                      multiline: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <CardFooter>
                <GridContainer justify={'center'}>
                  <GridItem xs={12} sm={6} md={6}>
                    <Button block={true} type="submit" color="gamsRed">
                      Actualizar
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <Button block={true} color="danger" simple onClick={() => close()}>
                      Cancelar
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

UpdateElementSection.propTypes = {
  classes: PropTypes.object.isRequired,
  element: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listElements: PropTypes.func,
};

export default withStyles(modalStyle)(UpdateElementSection);
