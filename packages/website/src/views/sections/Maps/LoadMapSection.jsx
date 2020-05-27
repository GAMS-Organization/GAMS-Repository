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
import CardAvatar from '../../components/Card/CardAvatar';

import serviceSector from '../../../services/api/sector';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import { Input } from '@material-ui/core';

import imgPlano from '../../../styles/img/plano3.jpg';

class LoadMapSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
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

  imageSelectedHandler = event => {
    this.setState({
      selectedImage: event.target.files[0],
    });
  };

  /*EJEMPLO DE ROOFTOP*/
  /*imageSelectedHandler = event => {
    this.setState({
      selectedImage: event.target.files[0],
    });
    this.showButtonUploadImage();
  };*/

  //se actualiza el mapa luego de ser editado
  uploadMapSector = async e => {
    e.preventDefault();

    const fields = ['id', 'map'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    const formDataImage = new FormData();
    formDataImage.append('file', this.state.selectedImage, this.state.selectedImage.name);

    const response = await serviceSector.imageMapUpload(formDataImage);

    if (response.type === 'UPLOAD_IMAGE_SUCCESFUL') {
      const formValues = {
        id: formElements.namedItem('id').value,
        map: response.data.path,
      };
      const response2 = await serviceSector.uploadMap(formValues);

      if (response2.type === 'UPLOAD_SUCCESFUL') {
        this.setState({ notification: true, open: false, rolClicked: false });
        window.location.reload();
      } else {
        this.setState({ notification: true, errors: response2.error });
      }
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, sector, Transition } = this.props;
    const { errors } = this.state;
    const { id, name, code, map } = sector;
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
            <form onSubmit={this.uploadMapSector}>
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
                <GridItem xs={12} sm={12} md={4}>
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
                <GridItem xs={12} sm={12} md={7}>
                  <br />
                  <br />
                  <input
                    labelText="Mapa"
                    id="map"
                    type="file"
                    accept="image/*"
                    error={errors.map}
                    onChange={this.imageSelectedHandler}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      defaultValue: map,
                      name: 'map',
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
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CardAvatar>
                <img
                  id="profileImageShow"
                  //src={this.props.formData.profileImage}
                  //className={`${classes.customAvatarPlaceholder}`}
                  width="100%"
                  height="100%"
                />
              </CardAvatar>
              <CardAvatar>
                <img src={imgPlano} width="100%" height="100%" onLoadSuccess={this.fileSelectedHandler}></img>
              </CardAvatar>
            </GridItem>
          </GridContainer>
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
