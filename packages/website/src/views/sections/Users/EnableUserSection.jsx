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

import serviceUser from '../../../services/api/user';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import CardFooter from '../../components/Card/CardFooter';

class EnableUserSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
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

  enableUser = async e => {
    e.preventDefault();
    const response = await serviceUser.enable(this.props.user.id);
    if (response.type === 'ENABLE_SUCCESSFUL') {
      this.setState({ notification: true });
      this.props.listUsers();
      this.props.close();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, user, Transition, close, open } = this.props;
    const { name, surname } = user;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.details}`
              : 'Usuario activado correctamente'
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
            <h3 className={classes.modalTitle}>¿Está seguro que desea activar el siguiente usuario?</h3>
          </GridContainer>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.enableUser}>
              <GridContainer justify={'center'}>
                <h6>
                  {name} {surname}
                </h6>
              </GridContainer>
              <CardFooter>
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
              </CardFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

EnableUserSection.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listUsers: PropTypes.func,
};

export default withStyles(modalStyle)(EnableUserSection);
