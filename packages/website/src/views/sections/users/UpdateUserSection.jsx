import React from 'react';
import axios from 'axios/index';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
// @material-ui/icons components
import Close from '@material-ui/icons/Close';

import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';

class UpdateUserSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeSelected: '1',
      errors: {},
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  handleClose() {
    this.setState({ open: false });
  }

  showModal() {
    console.log("se llamo desde el padre");
    this.setState({ open: true });
  }

  handleType = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async createUser(e) {
    e.preventDefault();

    const fields = ['name', 'lastName', 'username', 'password', 'type'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    /*
    let registerRequest;
    try {
      registerRequest = await axios.post(
        `http://${REACT_APP_SERVER_URL}/profile/update-profile-info`,
        {
          ...formValues,
        },
        {
          withCredentials: true,
        },
      );
    } catch ({ response }) {
      registerRequest = response;
    }
    const { data: registerRequestData } = registerRequest;

    if (!registerRequestData.success) {
      this.setState({
        errors: registerRequestData.messages && registerRequestData.messages.errors,
      });
    }
    */

  }

  render() {
    const { classes, name, lastName, email, password, Transition } = this.props;
    const { errors } = this.state;
    return (
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
          <Button simple className={classes.modalCloseButton} key="close" aria-label="Close">
            {' '}
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Modal title</h4>
        </DialogTitle>
        <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
          <form onSubmit={this.createUser}>
            <GridContainer>
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
                  id="lastName"
                  error={errors.lastName}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    defaultValue: lastName,
                    name: 'lastName',
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Correo"
                  id="email-address"
                  error={errors.username}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    defaultValue: email,
                    name: 'username',
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Contraseña"
                  id="password"
                  error={errors.password}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    defaultValue: password,
                    name: 'password',
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <FormControl fullWidth className={classes.selectFormControl + ' ' + classes.selectUnderlineRoot}>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    classes={{
                      select: classes.select,
                    }}
                    value={this.state.rolSelected}
                    onChange={this.handleType}
                    inputProps={{
                      name: 'rolSelected',
                      id: 'type',
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Tipo
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value="1"
                    >
                      Cliente
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value="2"
                    >
                      Personal
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value="3"
                    >
                      Administrador
                    </MenuItem>
                  </Select>
                </FormControl>
              </GridItem>
            </GridContainer>
            <Button type="submit" color="gamsRed">
              Crear
            </Button>
            <Button color="danger" simple onClick={this.handleClose}>
              Close
            </Button>
          </form>
        </DialogContent>
      </Dialog>
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
