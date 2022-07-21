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

import serviceDepartureConsumptionStock from '../../../services/api/departureConsumptionStock';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';

class DeleteDepartureConsumption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {},
      errors: {},
      notification: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props !== nextProps || this.state !== nextState;
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  deleteDeparture = async e => {
    e.preventDefault();
    const response = await serviceDepartureConsumptionStock.delete(this.props.departure.id);

    if (response.type === 'DELETED_SUCCESSFUL') {
      this.setState({ notification: true });
      this.props.listDepartures();
      this.props.close();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, Transition, close, open } = this.props;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.details}`
              : 'Consumición Eliminada correctamente'
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
          onClose={() => this.setState({ open: false })}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <GridContainer justify={'center'}>
            <GridItem>
              <h4 className={classes.modalDeleteTitle}>¿Está seguro que desea eliminar la siguiente consumición?</h4>
            </GridItem>
            <GridItem>
              <h5 className={classes.modalDeleteText}>CUIDADO: Al eliminar borrará todos los registros del mismo</h5>
            </GridItem>
          </GridContainer>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.deleteDeparture}>
              <GridContainer justify={'center'}>
                <GridItem xs={12} sm={6} md={6}>
                  <Button block={true} type="submit" color="gamsRed">
                    Sí
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <Button block={true} color="danger" simple onClick={() => close()}>
                    No
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

DeleteDepartureConsumption.propTypes = {
  classes: PropTypes.object.isRequired,
  departure: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listDepartures: PropTypes.func,
};

export default withStyles(modalStyle)(DeleteDepartureConsumption);
