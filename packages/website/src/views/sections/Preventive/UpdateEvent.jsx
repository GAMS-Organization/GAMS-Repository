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

import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import { createDate, createDateTime, toDate, toTime } from '../../../utils/helpers/dateHelper';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import serviceUser from '../../../services/api/user';
import CheckboxInput from '../../components/CustomInput/Checkbox';
import servicePreventive from '../../../services/api/preventive';

class UpdateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      open: true,
      notification: false,
      selectedWorkers: [],
      workers: [],
      allDay: props.event.allDay,
    };
    this.listWorkers();
  }

  handleClose = () => {
    this.props.closeHandler();
    this.setState({ open: false, selectedWorkers: [] });
  };

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  listWorkers = async (page = 1, itemsPerPage = 15) => {
    const response = await serviceUser.list(page, itemsPerPage);

    let workers = [];
    for (const user of response.data.items) {
      if (user.roles[0] !== 'user') {
        let workersData = { id: user.id, name: user.name, surname: user.surname };
        workers.push(workersData);
      }
    }
    this.setState({ workers, selectedWorkers: this.props.event.resource.workers, allDay: this.props.event.allDay });
  };

  handleChangeWorkers = event => {
    this.setState({ selectedWorkers: event.target.value });
  };

  handleCheck = value => {
    this.setState({ allDay: value });
  };

  updateEvent = async e => {
    const fields = ['startDate', 'endDate', 'title', 'description', 'workers', 'startTime', 'endTime'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    this.handleClose();
    this.props.closeHandler();

    const event = {
      title: formValues.title,
      startDate: formValues.startDate + ' ' + formValues.startTime,
      endDate: formValues.endDate + ' ' + formValues.endTime,
      allDay: this.state.allDay,
      description: formValues.description,
      workersId: this.state.selectedWorkers,
    };

    this.handleClose();
    this.props.closeHandler();

    const response = await servicePreventive.update(event, this.props.event.resource.id);

    if (response.type === 'UPDATED_SUCCESSFULLY') {
      this.setState({ notification: true, open: false, rolClicked: false });
      window.location.reload();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  deleteEvent = async e => {
    this.handleClose();
    this.props.closeHandler();

    const response = await servicePreventive.delete(this.props.event.resource.id);

    if (response.type === 'DELETED_SUCCESSFULLY') {
      this.setState({ notification: true, open: false, rolClicked: false });
      window.location.reload();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, event, Transition } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.details}`
              : 'Evento actualizado correctamente'
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
          onClose={this.handleClose}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
            <h4 className={classes.modalTitle}>Actualizar evento</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.updateEvent}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Título"
                    id="title"
                    error={errors.title}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      defaultValue: event.title,
                      name: 'title',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Fecha de inicio"
                    id="startDate"
                    error={errors.startDate}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      required: true,
                      defaultValue: toDate(event.start),
                      name: 'startDate',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Fecha de fin"
                    id="endDate"
                    error={errors.endDate}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      required: true,
                      defaultValue: toDate(event.end),
                      name: 'endDate',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Descripción"
                    id="description"
                    error={errors.description}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      defaultValue: event.resource.description,
                      name: 'description',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Comienza"
                        id="startTime"
                        error={errors.startTime}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          disabled: this.state.allDay,
                          required: true,
                          defaultValue: toTime(event.start),
                          name: 'startTime',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Finaliza"
                        id="endTime"
                        error={errors.endTime}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          disabled: this.state.allDay,
                          required: true,
                          defaultValue: toTime(event.end),
                          name: 'endTime',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CheckboxInput handleCheck={this.handleCheck} label={'Todo el día'} checked={this.state.allDay} />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={10}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel htmlFor="multiple-select" className={classes.selectLabel}>
                      Responsables
                    </InputLabel>
                    <Select
                      multiple
                      value={this.state.selectedWorkers}
                      onChange={this.handleChangeWorkers}
                      MenuProps={{
                        className: classes.selectMenu,
                        classes: { paper: classes.selectPaper },
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      inputProps={{
                        name: 'workers',
                        id: 'workers',
                      }}
                    >
                      <MenuItem
                        disabled
                        classes={{
                          root: classes.selectMenuItem,
                        }}
                      >
                        Responsables
                      </MenuItem>
                      {this.state.workers.map(worker => (
                        <MenuItem
                          key={worker.id}
                          value={worker.id}
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelectedMultiple,
                          }}
                        >
                          {worker.name + ' ' + worker.surname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Button type="submit" color="gamsRed">
                    Actualizar
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Button onClick={e => this.deleteEvent(e)} color="gamsBlack">
                    Eliminar
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Button type="reset" color="danger" simple onClick={this.handleClose}>
                    Cancelar
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

UpdateEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
  update: PropTypes.func,
  closeHandler: PropTypes.func,
};

export default withStyles(modalStyle)(UpdateEvent);
