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

import serviceSector from '../../../services/api/sector';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import { Input } from '@material-ui/core';

class LoadMapSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      sector: {},
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

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  fileUploadHandler = () => {};

  //se actualiza la section luego de ser editado
  /*updateSector = async e => {
    e.preventDefault();

    const fields = ['id', 'name', 'code'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    formValues.roles = [formValues.roles];

    const response = await serviceSector.update(formValues);

    if (response.type === 'UPDATED_SUCCESFUL') {
      this.setState({ notification: true, open: false, rolClicked: false });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };*/

  render() {
    const { classes, sector, Transition } = this.props;
    const { errors } = this.state;
    const { id, name, code } = sector;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.details}`
              : 'Mapa cargado correctamente'
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
            <h4 className={classes.modalTitle}>Cargar mapa</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.updateSector}>
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
                      disabled: true,
                      required: true,
                      defaultValue: name,
                      name: 'name',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Codigo"
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
                <GridItem xs={12} sm={12} md={6}>
                  <input type="file" onChange={this.fileSelectedHandler} />
                  <button onClick={this.fileUploadHandler}>Subir</button>
                  {/*<Button type="" color="gamsBlue">
                    Cargar archivo
                  </Button>*/}
                </GridItem>
                {/*<GridItem xs={12} sm={12} md={12}>
                  <embed></embed> MOSTRAR PDF
                  </GridItem>*/}
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

LoadMapSection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(modalStyle)(LoadMapSection);
