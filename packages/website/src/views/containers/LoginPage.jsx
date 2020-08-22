import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment/index';
import Icon from '@material-ui/core/Icon/index';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
// core components
import GridContainer from '../components/Grid/GridContainer.jsx';
import GridItem from '../components/Grid/GridItem.jsx';
import CustomInput from '../components/CustomInput/CustomInput.jsx';
import Button from '../components/CustomButtons/Button.jsx';
import Card from '../components/Card/Card.jsx';
import CardBody from '../components/Card/CardBody.jsx';
import CardHeader from '../components/Card/CardHeader.jsx';
import CardFooter from '../components/Card/CardFooter.jsx';

import loginPageStyle from '../../styles/jss/material-dashboard-react/views/loginPageStyle.jsx';
import loginService from '../../services/api/auth';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      errors: { error: {} },
    };
  }

  componentWillMount = async () => {
    await loginService.logOut();
  };

  login = async e => {
    e.preventDefault();

    const { history } = this.props;

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const response = await loginService.logIn(email, password);

    if (response.user) {
      return history.push('/admin/');
    }

    this.setState({
      errors: response,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8}>
            <h4 className={classes.textCenter} style={{ marginTop: 0 }}>
              Bienvenidos a GAMS, el software de gestión de activos para la UTN “Facultad Regional San Francisco”{' '}
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.login}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="gamsBlue">
                  <h4 className={classes.cardTitle}>Ingresar</h4>
                </CardHeader>
                <CardBody>
                  <p className={`${classes.textCenter} ${classes.checkboxLabel}`}>
                    <strong>Inicie sesion con su Email y su Contraseña</strong>{' '}
                  </p>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    error={this.state.errors.error.status === 404}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName,
                    }}
                    inputProps={{
                      required: true,
                      name: 'email',
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Contraseña..."
                    id="password"
                    error={this.state.errors.error.status === 401}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName,
                    }}
                    inputProps={{
                      type: 'password',
                      required: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="gamsRed" simple size="lg" block>
                    Entrar
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  errors: PropTypes.object,
};

export default withStyles(loginPageStyle)(LoginPage);
