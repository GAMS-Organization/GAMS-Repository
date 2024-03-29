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

import serviceEducationalELement from '../../../services/api/educationalElement';
import modalStyle from '../../../styles/jss/material-dashboard-react/modalStyle';
import CardFooter from '../../components/Card/CardFooter';

class UpdateEducationalElementSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      educationalElement: {},
      errors: {},
      notification: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props !== nextProps || this.state.notification !== nextState.notification;
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  updateEducationalElement = async e => {
    e.preventDefault();

    const fields = ['name', 'totalQuantity', 'borrowQuantity'];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    formValues.id = this.props.educationalElement.id;
    const response = await serviceEducationalELement.update(formValues);

    if (response.type === 'UPDATED_SUCCESSFUL') {
      this.setState({ notification: true, open: false });
      this.props.listEducationalElements();
      this.props.close();
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  render() {
    const { classes, educationalElement, Transition, open, close } = this.props;
    const { errors } = this.state;
    const { name, totalQuantity, borrowQuantity } = educationalElement;
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}. ${this.state.errors.details}`
              : 'Articulo actualizado correctamente'
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
            <h3 className={classes.modalTitle}>Actualizar Artículo</h3>
          </GridContainer>
          <DialogContent id="classic-modal-slide-description" className={classes.modalBody}>
            <form onSubmit={this.updateEducationalElement}>
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Cantidad"
                    id="totalQuantity"
                    error={errors.totalQuantity}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      defaultValue: totalQuantity,
                      name: 'totalQuantity',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Cantidad Prestada"
                    id="borrowQuantity"
                    error={errors.borrowQuantity}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      defaultValue: borrowQuantity,
                      name: 'borrowQuantity',
                    }}
                  />
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

UpdateEducationalElementSection.propTypes = {
  classes: PropTypes.object.isRequired,
  educationalElement: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  listEducationalElements: PropTypes.func,
};

export default withStyles(modalStyle)(UpdateEducationalElementSection);
