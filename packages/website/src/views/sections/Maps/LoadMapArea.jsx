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
import serviceArea from '../../../services/api/area';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import { Input } from '@material-ui/core';
import Arrow_Upward from '@material-ui/icons/ArrowUpward';
import EntryPurchase from '../../components/Stock/EntryPurchase';
import Assignment from '@material-ui/icons/Assignment';
import CurrentStock from '../../components/Stock/CurrentStock';
import Arrow_Downward from '@material-ui/icons/ArrowDownward';
import DepartureConsumption from '../../components/Stock/DepartureConsumption';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import serviceCurrentStock from '../../../services/api/currentStock';
import MapIcon from '@material-ui/icons/Map';

class LoadMapArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      selectedServices: [],
      area: {},
      service: [],
      errors: {},
      open: false,
      notification: {
        show: false,
        message: '',
        color: '',
        place: 'tr',
      },
      rolClicked: false,
    };
    const styles = {
      img: {
        padding: '15px',
      },
    };
  }

  //se obtienen los servicios y sus respectivos  mapas
  componentWillMount = async () => {
    const responseService = await serviceArea.list();

    let services = [];

    for (const service of responseService.data.items) {
      let dataService = [service.id.toString(), service.name];
      services.push(dataService);
    }

    this.setState({ service: services });
  };

  componentDidMount = () => {
    this.props.onRef(this);
  };

  componentWillUnmount = () => {
    this.props.onRef(undefined);
  };

  handleClose = () => {
    this.setState({ open: false, rolClicked: false });
  };

  showModal = async servicios => {
    this.setState({ open: true, selectedServices: servicios });
  };

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
  uploadMapArea = async e => {
    e.preventDefault();
    const formElements = e.target.elements;

    const formDataImage = new FormData();
    formDataImage.append('file', this.state.selectedImage, this.state.selectedImage.name);

    const response = await serviceArea.imageMapUpload(formDataImage, formElements.namedItem('id').value);
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
        open: true,
        rolClicked: false,
      });
    } else {
      if (response.type === 'UPLOAD_IMAGE_SUCCESFUL') {
        const formValues = {
          id: formElements.namedItem('id').value,
          map: NameSector.concat(response.data.path.split(/(\\|\/)/g).pop()),
        };
        const response2 = await serviceArea.update(formValues);

        if (response2.type === 'UPDATED_SUCCESFUL') {
          this.setState({
            notification: { show: true, color: 'success', message: 'El mapa fue cargado correctamente', place: 'tr' },
            open: false,
            rolClicked: false,
          });
          window.location.reload();
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
    const { classes, area, Transition } = this.props;
    const { errors } = this.state;
    const { id, name, code, map } = area;

    return (
      <div>
        <Snackbar
          place={this.state.notification.place}
          color={this.state.notification.color}
          icon={AddAlert}
          message={this.state.notification.message}
          open={this.state.notification.show}
          closeNotification={this.closeNotification}
          close
        />
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal,
          }}
          fullWidth={true}
          maxWidth={'lg'}
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.state.open}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
            <h4 className={classes.modalTitle}>Editar mapa</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.uploadMapArea}>
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
                <CustomTabs
                  title=""
                  headerColor="gamsBlue"
                  tabs={this.state.selectedServices.map(service => {
                    return {
                      tabName: service,
                      tabIcon: MapIcon,
                      //tabContent: <>{service}</>,
                    };
                  })}
                />
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

LoadMapArea.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(modalStyle)(LoadMapArea);
