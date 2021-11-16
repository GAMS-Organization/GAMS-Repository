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
class DeleteAreaSection extends React.Component {
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

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props !== nextProps || this.state !== nextState;
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  deleteArea = async e => {
    e.preventDefault();
    const response = await serviceArea.delete(this.props.area.id);

    if (response.type === 'DELETED_SUCCESFUL') {
      this.setState({ notification: true });
      this.props.listAreas();
      this.props.close();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, area, Transition, close, open } = this.props;
    const { errors } = this.state;
    const { id, name } = area;
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
              ? `Error ${this.state.errors.code}, ${this.state.errors.details}`
              : 'Area Eliminada correctamente'
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
          <GridContainer justify={'center'}>
            <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
              <h4 className={classes.modalTitle}>¿Está seguro que desea eliminar el siguiente área?</h4>
            </DialogTitle>
            <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
              <h5 className={classes.modalTitle}>CUIDADO: Al eliminar borrará todos los registros del mismo</h5>
            </DialogTitle>
          </GridContainer>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.deleteArea}>
              <GridContainer justify={'center'}>
                <GridItem xs={12} sm={12} md={8}>
                  <GridContainer justify={'center'}>
                    <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
                      <h5 className={classes.modalTitle}>{name}</h5>
                    </DialogTitle>
                  </GridContainer>
                </GridItem>
              </GridContainer>
              <GridContainer justify={'center'}>
                <GridItem>
                  <Button type="submit" color="gamsRed">
                    Sí
                  </Button>
                  <Button color="danger" simple onClick={() => close()}>
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

DeleteAreaSection.propTypes = {
  classes: PropTypes.object.isRequired,
  area: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listAreas: PropTypes.func,
};

export default withStyles(modalStyle)(DeleteAreaSection);
