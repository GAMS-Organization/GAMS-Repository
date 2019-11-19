import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Snackbar from '../../components/Snackbar/Snackbar';
// @material-ui/icons components
import AddAlert from '@material-ui/icons/AddAlert';

import serviceUser from '../../../services/api/user';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';

class UpdateUserSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      rolSelected: 'user',
      errors: {},
      open: false,
      notification: false,
      rolClicked: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleClose() {
    this.setState({ open: false, rolClicked: false });
  }

  showModal() {
    this.setState({ open: true });
  }

  closeNotification() {
    this.setState({ notification: false });
  }

  handleRol = event => {
    this.setState({ [event.target.name]: event.target.value, rolClicked: true });
  };

  async updateUser(e) {
    e.preventDefault();

    const fields = ['id', 'name', 'surname', 'email', 'roles'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    formValues.roles = [formValues.roles];

    const response = await serviceUser.update(formValues);

    if (response.type === 'UPDATED_SUCCESFUL') {
      this.setState({ notification: true, open: false, rolClicked: false });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  }

  render() {
    const { classes, user, Transition } = this.props;
    const { errors } = this.state;
    const { id, name, surname, email, roles } = user;
    if (this.state.rolSelected !== roles && roles !== undefined && !this.state.rolClicked) {
      this.setState({ rolSelected: roles });
    }
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.details}`
              : 'Usuario actualizado correctamente'
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
            <h4 className={classes.modalTitle}>Actualizar usuario</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.updateUser}>
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
                <GridItem xs={12} sm={12} md={3}>
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
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Apellido"
                    id="surname"
                    error={errors.surname}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      defaultValue: surname,
                      name: 'surname',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Correo"
                    id="email"
                    error={errors.email}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      defaultValue: email,
                      name: 'email',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      value={this.state.rolSelected}
                      onChange={this.handleRol}
                      inputProps={{
                        name: 'rolSelected',
                        id: 'roles',
                      }}
                    >
                      <MenuItem
                        disabled
                        classes={{
                          root: classes.selectMenuItem,
                        }}
                      >
                        Tipo de usuario
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value="user"
                      >
                        Cliente
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value="personal"
                      >
                        Personal
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value="admin"
                      >
                        Administrador
                      </MenuItem>
                    </Select>
                  </FormControl>
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

UpdateUserSection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(modalStyle)(UpdateUserSection);
