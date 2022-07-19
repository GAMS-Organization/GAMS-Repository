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

class UpdateSectorSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      sector: {},
      errors: {},
      notification: {
        show: false,
        message: '',
        color: '',
        place: 'tr',
      },
    };
  }

  closeNotification = () => {
    this.setState({
      notification: {
        show: false,
        errors: {},
        place: 'tr',
        message: '',
      },
    });
  };

  imageSelectedHandler = event => {
    this.setState({
      selectedImage: event.target.files[0],
    });
  };

  //se actualiza el mapa luego de ser editado
  uploadMapSector = async e => {
    e.preventDefault();

    const formDataImage = new FormData();
    formDataImage.append('file', this.state.selectedImage, this.state.selectedImage.name);

    const response = await serviceSector.imageMapUpload(formDataImage, this.props.sector.id);

    const NameSector = 'sector/';
    const invalid = / /;

    //En la primer condicion valida que el nombre de la imagen no contenga un espacio en blanco
    if (invalid.test(response.data.path.split(/(\\|\/)/g).pop())) {
      this.setState({
        notification: {
          show: true,
          color: 'danger',
          message: 'IMPORTANTE: EL NOMBRE DE LA IMAGEN NO PUEDE CONTENER ESPACIOS EN BLANCO',
          place: 'tc',
        },
      });
    } else {
      if (response.type === 'UPLOAD_IMAGE_SUCCESSFUL') {
        const formValues = {
          id: this.props.sector.id,
          map: NameSector.concat(response.data.path.split(/(\\|\/)/g).pop()),
        };
        const response2 = await serviceSector.update(formValues);

        if (response2.type === 'UPDATED_SUCCESSFUL') {
          this.setState({
            notification: { show: true, color: 'success', message: 'El mapa fue cargado correctamente', place: 'tr' },
          });
          this.props.listSectors();
          this.props.close();
        } else {
          this.setState({
            notification: {
              show: true,
              color: 'danger',
              message: `Error ${this.state.errors.code}, ${this.state.errors.errors}`,
              place: 'tr',
            },
            errors: response2.error,
          });
        }
      } else {
        this.setState({
          notification: {
            show: true,
            color: 'danger',
            message: `Error ${this.state.errors.code}, ${this.state.errors.errors}`,
            place: 'tr',
          },
          errors: response.error,
        });
      }
    }
  };

  render() {
    const { classes, sector, Transition, close, open } = this.props;
    const { errors } = this.state;
    const { name, map } = sector;

    return (
      <div>
        <Snackbar
          place={this.state.notification.place}
          color={this.state.notification.color || 'success'}
          icon={AddAlert}
          message={this.state.notification.message}
          open={this.state.notification.show}
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
          <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
            <h4 className={classes.modalTitle}>Cargar mapa</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.uploadMapSector}>
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
                  <br />
                  <br />
                  <input
                    labelText="Mapa"
                    id="map"
                    type="file"
                    accept="image/*"
                    error={errors.map}
                    onChange={this.imageSelectedHandler}
                    required={true}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      defaultValue: map,
                      name: 'map',
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer justify={'center'}>
                <Button type="submit" color="gamsRed">
                  Actualizar
                </Button>
                <Button color="danger" simple onClick={() => close()}>
                  Cancelar
                </Button>
              </GridContainer>
            </form>
          </DialogContent>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              {this.props.sector.map ? (
                <img
                  src={`http://${window.location.hostname}/api/static/${this.props.sector.map}`}
                  width="100%"
                  height="100%"
                  border="10"
                  alt={''}
                />
              ) : null}
            </GridItem>
          </GridContainer>
        </Dialog>
      </div>
    );
  }
}

UpdateSectorSection.propTypes = {
  classes: PropTypes.object.isRequired,
  sector: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listSectors: PropTypes.func,
};

export default withStyles(modalStyle)(UpdateSectorSection);
