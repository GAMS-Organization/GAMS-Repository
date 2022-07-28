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
import Button from '../../components/CustomButtons/Button.jsx';
import Snackbar from '../../components/Snackbar/Snackbar';
// @material-ui/icons components
import AddAlert from '@material-ui/icons/AddAlert';
import serviceArea from '../../../services/api/area';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import MapIcon from '@material-ui/icons/Map';
import CardFooter from '../../components/Card/CardFooter';

class LoadMapArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      selectedServices: [],
      area: {},
      service: [],
      errors: {},
      notification: {
        show: false,
        message: '',
        color: '',
        place: 'tr',
      },
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props !== nextProps || this.state !== nextState;
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
  uploadMapService = async (e, areaName) => {
    e.preventDefault();
    const inputElement = e.target.elements.namedItem('map');
    const formDataImage = new FormData();
    formDataImage.append('file', this.state.selectedImage, this.state.selectedImage.name);

    const response = await serviceArea.imageMapUpload(formDataImage, this.props.area.id);
    const nameArea = 'area/';
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
        const urlService = nameArea.concat(response.data.path.split(/(\\|\/)/g).pop());

        const formValues = {
          id: this.props.area.id,

          maps: [{ url: urlService, service: inputElement.id }],
          services: this.state.selectedServices,
          name: this.props.area.name,
        };
        const response2 = await serviceArea.update(formValues);

        if (response2.type === 'UPDATED_SUCCESSFUL') {
          this.setState({
            notification: {
              show: true,
              color: 'success',
              message: 'El mapa fue cargado correctamente',
              place: 'tr',
            },
            area: {
              ...this.state.area,
              maps: response2.area.maps,
            },
          });
          this.props.listAreas();
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
    const { classes, area, Transition, close, open } = this.props;
    const { errors } = this.state;
    const { id, name, maps } = area;
    if (this.state.area.id !== id) {
      this.setState({ area: area, selectedServices: area.services });
    }
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
          }}
          fullWidth={true}
          maxWidth={'lg'}
          open={open}
          TransitionComponent={Transition}
          onClose={close}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <GridContainer justify={'center'}>
            <h3 className={classes.modalTitle}>Editar mapa: {name}</h3>
          </GridContainer>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form
              onSubmit={e => {
                this.uploadMapService(e, name);
              }}
            >
              <GridContainer>
                <CustomTabs
                  title=""
                  headerColor="gamsBlue"
                  tabs={this.state.selectedServices.map((service, index) => {
                    return {
                      tabName: service,
                      tabIcon: MapIcon,
                      tabContent: (
                        <>
                          <GridContainer justify={'center'}>
                            <GridItem xs={12} sm={12} md={10}>
                              <img
                                src={`http://${window.location.hostname}/api/static/${this.state.area.maps[index]}`}
                                width="100%"
                                height="100%"
                                align="center"
                                alt={'No se ha cargado el mapa aún o no se ha encontrado'}
                              />
                            </GridItem>
                          </GridContainer>
                          <br />
                          <br />
                          <GridContainer>
                            <GridItem xs={12} sm={8} md={8}>
                              <input
                                labelText="Mapa"
                                id={service}
                                type="file"
                                accept="image/*"
                                error={errors.map}
                                name={'map'}
                                onChange={this.imageSelectedHandler}
                                required={true}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  defaultValue: maps[index],
                                  name: 'map',
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                              <Button type="submit" color="gamsRed">
                                Actualizar
                              </Button>
                            </GridItem>
                          </GridContainer>
                        </>
                      ),
                    };
                  })}
                />
              </GridContainer>
              <CardFooter>
                <GridContainer justify={'center'}>
                  <GridItem xs={12} sm={6} md={6}>
                    <Button block={true} color="danger" simple onClick={() => close()}>
                      Salir
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

LoadMapArea.propTypes = {
  classes: PropTypes.object.isRequired,
  area: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listAreas: PropTypes.func,
};

export default withStyles(modalStyle)(LoadMapArea);
