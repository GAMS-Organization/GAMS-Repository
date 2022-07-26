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

import serviceWorkOrder from '../../../services/api/workOrder';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import CardFooter from '../../components/Card/CardFooter';
import CardBody from '../../components/Card/CardBody';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import serviceUser from '../../../services/api/user';

class AssignWorkOrderSection extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    this.state = {
      workOrder: {},
      errors: {},
      notification: false,
      selectedWorkers: [],
      workers: [],
      dateNow: date,
    };
    this.listWorkers();
  }

  handleClose = () => {
    this.props.close();
    this.setState({ open: false, selectedWorkers: [] });
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props !== nextProps || this.state !== nextState;
  }

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
    this.setState({ workers });
  };

  handleChangeWorkers = event => {
    this.setState({ selectedWorkers: event.target.value });
  };

  assignWorkOrder = async e => {
    e.preventDefault();

    const assignData = {
      id: this.props.workOrder.id,
      startDate: this.state.dateNow,
      workersId: this.state.selectedWorkers,
    };

    const response = await serviceWorkOrder.assign(assignData);
    this.handleClose();
    if (response.type === 'ASSIGN_SUCCESSFUL') {
      this.setState({ notification: true, open: false });
      this.props.listWorkOrders();
      this.props.close();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, Transition, open } = this.props;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.details}`
              : 'Orden de trabajo Asignada correctamente'
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
          onClose={this.handleClose}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <GridContainer justify={'center'}>
            <GridItem>
              <h4 className={classes.modalDeleteTitle}>Asignar Orden de Trabajo</h4>
            </GridItem>
          </GridContainer>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.assignWorkOrder}>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
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
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridContainer justify={'center'}>
                  <GridItem xs={12} sm={6} md={6}>
                    <Button block={true} type="submit" color="gamsRed">
                      Sí
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <Button block={true} type="reset" color="danger" simple onClick={this.handleClose}>
                      No
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

AssignWorkOrderSection.propTypes = {
  classes: PropTypes.object.isRequired,
  workOrder: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listWorkOrders: PropTypes.func,
};

export default withStyles(modalStyle)(AssignWorkOrderSection);
