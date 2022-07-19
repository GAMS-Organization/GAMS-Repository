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

import serviceEducationalElement from '../../../services/api/educationalElement';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class UpdateEducationalElementRequestSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      educationalElementRequest: {},
      statusSelected: '',
      errors: {},
      notification: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props !== nextProps || this.state !== nextState;
  }

  handleClose = () => {
    this.props.close();
    this.setState({ open: false, statusSelected: '' });
  };

  closeNotification = () => {
    this.setState({ notification: false, errors: {}, statusSelected: '' });
  };

  handleChangeStatus = event => {
    this.setState({ statusSelected: event.target.value });
  };

  updateEducationalElementRequest = async e => {
    e.preventDefault();
    const formValues = {
      educationalElementId: this.props.educationalElementRequest.id,
      status: this.state.statusSelected,
      areaId: this.props.educationalElementRequest.areaId,
      id: this.props.educationalElementRequest.id,
    };

    const response = await serviceEducationalElement.updateElementRequest(formValues);

    if (response.type === 'UPDATED_SUCCESSFUL') {
      this.setState({ notification: true, open: false, statusSelected: '' });
      this.props.listEducationalElementRequest();
      this.props.close();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  statusList = {
    pendiente: 'Pendiente',
    llevando: 'En proceso de entrega',
    entregado: 'Entregado',
    devuelto: 'Devuelto',
    cancelado: 'Cancelado',
  };

  render() {
    const { classes, Transition, open, close } = this.props;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.details}`
              : 'Estado actualizado correctamente'
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
          open={open}
          TransitionComponent={Transition}
          onClose={close}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
            <h4 className={classes.modalTitle}>Actualizar Estado</h4>
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.updateEducationalElementRequest}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel htmlFor="Estado" className={classes.selectLabel}>
                      Estado
                    </InputLabel>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      value={this.state.statusSelected}
                      onChange={this.handleChangeStatus}
                      inputProps={{
                        name: 'statusSelected',
                        id: 'status',
                        defaultValue: this.props.educationalElementRequest.status,
                      }}
                    >
                      <MenuItem
                        disabled
                        classes={{
                          root: classes.selectMenuItem,
                        }}
                      >
                        Estado
                      </MenuItem>
                      {Object.keys(this.statusList).map(key => {
                        return (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected,
                            }}
                            value={key}
                          >
                            {this.statusList[key]}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer justify={'center'}>
                <Button type="submit" color="gamsRed">
                  Actualizar
                </Button>
                <Button color="danger" simple onClick={this.handleClose}>
                  Cancelar
                </Button>
              </GridContainer>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

UpdateEducationalElementRequestSection.propTypes = {
  classes: PropTypes.object.isRequired,
  educationalElementRequest: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listEducationalElementRequest: PropTypes.func,
};

export default withStyles(modalStyle)(UpdateEducationalElementRequestSection);
