import React from 'react';
import axios from 'axios/index';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';
// @material-ui/icons components
import Close from '@material-ui/icons/Close';

import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import NewUserSection from './NewUserSection';

const { REACT_APP_SERVER_URL } = process.env;

class UpdateUserSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeSelected: '1',
      errors: {},
      classicModal: false,
    };
    this.createUser = this.createUser.bind(this);
  }

  handleType = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async createUser(e) {
    e.preventDefault();

    const fields = ['name', 'lastName', 'username', 'password', 'type'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    let registerRequest;
    try {
      registerRequest = await axios.post(
        `http://${REACT_APP_SERVER_URL}/profile/update-profile-info`,
        {
          ...formValues,
        },
        {
          withCredentials: true,
        },
      );
    } catch ({ response }) {
      registerRequest = response;
    }
    const { data: registerRequestData } = registerRequest;

    if (!registerRequestData.success) {
      this.setState({
        errors: registerRequestData.messages && registerRequestData.messages.errors,
      });
    }
  }

  render() {
    const { classes, name, lastName, email, password, type } = this.props;
    const { errors } = this.state;
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });
    return (
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={this.state.classicModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => this.handleClose('classicModal')}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
          <Button simple className={classes.modalCloseButton} key="close" aria-label="Close">
            {' '}
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Modal title</h4>
        </DialogTitle>
        <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
          <NewUserSection />
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button link>Nice Button</Button>
          <Button color="danger" simple>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

UpdateUserSection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(modalStyle)(UpdateUserSection);
