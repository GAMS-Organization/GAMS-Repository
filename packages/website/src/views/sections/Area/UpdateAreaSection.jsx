import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Snackbar from '../../components/Snackbar/Snackbar';
// @material-ui/icons components
import AddAlert from '@material-ui/icons/AddAlert';

import serviceArea from '../../../services/api/area';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import serviceService from '../../../services/api/service';
import CardFooter from '../../components/Card/CardFooter';

class UpdateAreaSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: {},
      service: [],
      selectedServices: [],
      errors: {},
      notification: false,
    };
  }

  //Se obtienen los servicios
  async componentWillMount() {
    const response = await serviceService.list();
    let services = [];
    for (const service of response.data.items) {
      let dataService = service.name;
      services.push(dataService);
    }
    this.setState({ service: services });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props !== nextProps || this.state !== nextState;
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  //se actualiza el area luego de ser editado
  updateArea = async e => {
    e.preventDefault();

    const fields = ['name', 'services'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    formValues.id = this.props.area.id;
    formValues.services = formValues.services.split(',');
    const response = await serviceArea.update(formValues);

    if (response.type === 'UPDATED_SUCCESSFUL') {
      this.setState({ notification: true });
      this.props.listAreas();
      this.props.close();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  handleChangeServices = event => {
    this.setState({ selectedServices: event.target.value });
  };

  render() {
    const { classes, area, Transition, close, open } = this.props;
    const { errors } = this.state;
    const { id, name, services } = area;
    if (this.state.area.id !== id) {
      this.setState({ area: area, selectedServices: area.services });
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
              : 'Area actualizada correctamente'
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
            <h3 className={classes.modalTitle}>Actualizar Área</h3>
          </GridContainer>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.updateArea}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
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
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel htmlFor="multiple-select" className={classes.selectLabel}>
                      Servicios
                    </InputLabel>
                    <Select
                      multiple
                      value={this.state.selectedServices}
                      onChange={this.handleChangeServices}
                      MenuProps={{
                        className: classes.selectMenu,
                        classes: { paper: classes.selectPaper },
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      inputProps={{
                        name: 'services',
                        id: 'services',
                        defaultValue: services,
                      }}
                    >
                      <MenuItem
                        disabled
                        classes={{
                          root: classes.selectMenuItem,
                        }}
                      >
                        Servicios
                      </MenuItem>
                      {this.state.service.map(service => (
                        <MenuItem
                          key={service}
                          value={service}
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelectedMultiple,
                          }}
                        >
                          {service}
                        </MenuItem>
                      ))}
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

UpdateAreaSection.propTypes = {
  classes: PropTypes.object.isRequired,
  area: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listAreas: PropTypes.func,
};

export default withStyles(modalStyle)(UpdateAreaSection);
