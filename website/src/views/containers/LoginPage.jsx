import React from "react";
import PropTypes from "prop-types";
import axios from "axios/index";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment/index";
import Icon from "@material-ui/core/Icon/index";
import Checkbox from "@material-ui/core/Checkbox/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import Card from "../components/Card/Card.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";

import loginPageStyle from "../../styles/jss/material-dashboard-react/views/loginPageStyle.jsx";

const { REACT_APP_SERVER_URL } = process.env;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      errors: {}
    };
  }
  login = async e => {
    e.preventDefault();

    const { history } = this.props;

    const fields = ["username", "password"];
    const formElements = e.target.elements;

    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    let loginRequest;
    try {
      loginRequest = await axios.post(
        `http://${REACT_APP_SERVER_URL}/login`,
        {
          ...formValues
        },
        {
          withCredentials: true
        }
      );
    } catch ({ response }) {
      loginRequest = response;
    }
    const { data: loginRequestData } = loginRequest;
    if (loginRequestData.success) {
      return history.push("/dashboard");
    }

    this.setState({
      errors: loginRequestData.messages && loginRequestData.messages.errors
    });
  };
  handleToggle = value => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8}>
            <h4 className={classes.textCenter} style={{ marginTop: 0 }}>
              Bienvenidos a GAMS, el software de gestión de activos
              para la UTN “Facultad Regional San Francisco”{" "}  
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.login}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="gamsBlue"
                >
                  <h4 className={classes.cardTitle}>Ingresar</h4>                 
                </CardHeader>
                <CardBody>
                  <p
                    className={`${classes.textCenter} ${classes.checkboxLabel}`}                    
                  >
                    <strong>Inicie sesion con su Email y su
                      Contraseña</strong>{" "}
                  </p>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    error={errors.username || errors.invalidEmailOrPassword}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      required: true,
                      name: "username",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Contraseña..."
                    id="password"
                    error={errors.password || errors.invalidEmailOrPassword}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      type: "password",
                      required: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                  <FormControlLabel
                    classes={{
                      root:
                        classes.checkboxLabelControl +
                        " " +
                        classes.checkboxLabelControlClassName,
                      label: classes.checkboxLabel
                    }}
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={() => this.handleToggle(1)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    label={<span>Recordarme</span>}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="gamsRedColor" simple size="lg" block>
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
  errors: PropTypes.object
};

export default withStyles(loginPageStyle)(LoginPage);
