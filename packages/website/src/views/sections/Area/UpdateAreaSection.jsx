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

import serviceArea from '../../../services/api/area';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import serviceService from '../../../services/api/service';

class UpdateAreaSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: {},
      service: [],
      //selectedServices: props.area.services,
      selectedServices: [],
      errors: {},
      open: false,
      notification: false,
      rolClicked: false,
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

  componentDidMount = () => {
    this.props.onRef(this);
    console.log(this.state.area);
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

  //se actualiza el area luego de ser editado
  updateArea = async e => {
    e.preventDefault();

    const fields = ['id', 'name', 'services'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    //formValues.roles = [formValues.roles];

    formValues.services = formValues.services.split(',');

    const response = await serviceArea.update(formValues);

    if (response.type === 'UPDATED_SUCCESFUL') {
      this.setState({ notification: true, open: false, rolClicked: false });
      window.location.reload();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  handleChangeServices = event => {
    this.setState({ selectedServices: event.target.value });
  };

  render() {
    const { classes, area, Transition } = this.props;
    const { errors } = this.state;
    const { id, name, services } = area;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.details}`
              : 'Area actualizada correctamente'
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
            <h4 className={classes.modalTitle}>Actualizar Area</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.updateArea}>
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
                <GridItem xs={12} sm={12} md={8}>
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
                <GridItem xs={12} sm={12} md={10}>
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

UpdateAreaSection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(modalStyle)(UpdateAreaSection);
