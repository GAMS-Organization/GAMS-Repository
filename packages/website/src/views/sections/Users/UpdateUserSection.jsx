import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
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
import { InputLabel } from '@material-ui/core';
import CardFooter from '../../components/Card/CardFooter';

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
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props !== nextProps || this.state !== nextState;
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  handleRol = event => {
    this.setState({ [event.target.name]: event.target.value, rolClicked: true });
  };

  //se actualiza el usuario luego de ser editado
  updateUser = async e => {
    e.preventDefault();
    const formElements = e.target.elements;

    const name = formElements.namedItem('name').value;
    const surname = formElements.namedItem('surname').value;
    const email = formElements.namedItem('email').value;
    const roles = formElements.namedItem('roles').value;

    const formValues = {
      id: this.props.user.id,
      name: name,
      surname: surname,
      email: email,
      roles: [roles],
    };
    const response = await serviceUser.update(formValues);

    if (response.type === 'UPDATED_SUCCESSFUL') {
      this.setState({ notification: true, open: false, rolClicked: false });
      this.props.listUsers();
      this.props.close();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, user, Transition, close, open } = this.props;
    const { errors } = this.state;
    const { name, surname, email, roles } = user;
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
              ? `Error ${this.state.errors.code}. ${this.state.errors.details}`
              : 'Usuario actualizado correctamente'
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
            <h3 className={classes.modalTitle}>Actualizar usuario</h3>
          </GridContainer>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.updateUser}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
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
                <GridItem xs={12} sm={12} md={6}>
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
                <GridItem xs={12} sm={12} md={6}>
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
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel htmlFor="sector" className={classes.selectLabel}>
                      Tipo de usuario
                    </InputLabel>
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

UpdateUserSection.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listUsers: PropTypes.func,
};

export default withStyles(modalStyle)(UpdateUserSection);
