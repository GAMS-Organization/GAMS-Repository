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

class UpdateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      open: false,
      notification: false,
    };
  }

  componentDidMount = () => {
    this.props.onRef(this);
  };

  componentWillUnmount = () => {
    this.props.onRef(undefined);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  showModal = () => {
    this.setState({ open: true });
  };

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  createEvent = async e => {

    const fields = ['startDate', 'endDate', 'title'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    const event = {
      title: formValues.title,
      start: formValues.startDate,
      end: formValues.endDate,
    }

    this.props.create(event);


    // e.preventDefault();
    //
    // const fields = ['id', 'name'];
    // const formElements = e.target.elements;
    // const formValues = fields
    //   .map(field => ({
    //     [field]: formElements.namedItem(field).value,
    //   }))
    //   .reduce((current, next) => ({ ...current, ...next }));
    //
    // formValues.roles = [formValues.roles];
    //
    // const response = await serviceProduct.update(formValues);
    //
    // if (response.type === 'UPDATED_SUCCESFUL') {
    //   this.setState({ notification: true, open: false, rolClicked: false });
    //   window.location.reload();
    // } else {
    //   this.setState({ notification: true, errors: response.error });
    // }
  };

  render() {
    const { classes, event, Transition } = this.props;
    const { errors } = this.state;
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
          onClose={() => this.setState({open: false})}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
            <h4 className={classes.modalTitle}>Actualizar evento</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.createEvent}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Fecha de inicio"
                    id="startDate"
                    error={errors.startDate}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      required: true,
                      defaultValue: event.start,
                      name: 'startDate',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Fecha de fin"
                    id="endDate"
                    error={errors.endDate}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      required: true,
                      defaultValue: event.end,
                      name: 'endDate',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Título"
                    id="title"
                    error={errors.title}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      defaultValue: '',
                      name: 'title',
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Button type="submit" color="gamsRed">
                Crear
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

UpdateEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
  create: PropTypes.func,
};

export default withStyles(modalStyle)(UpdateEvent);
