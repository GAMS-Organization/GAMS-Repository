import React from 'react';
import axios from 'axios/index';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';

import newUserSectionStyle from "../../../styles/jss/material-dashboard-react/sections/newUserSectionStyle";

const { REACT_APP_SERVER_URL } = process.env;

class NewUserSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeSelected: "1",
      errors: {},
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
    return (
      <div id="section-new-user">
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.createUser}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Nuevo usuario</h4>
                  <p className={classes.cardCategoryWhite}>Complete los datos</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
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
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                          labelText="Apellido"
                          id="lastName"
                          error={errors.lastName}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            required: true,
                            defaultValue: lastName,
                            name: 'lastName',
                          }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Correo"
                        id="email-address"
                        error={errors.username}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: email,
                          name: 'username',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                          labelText="Contraseña"
                          id="password"
                          error={errors.password}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            required: true,
                            defaultValue: password,
                            name: 'password',
                          }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl
                          fullWidth
                          className={
                            classes.selectFormControl +
                            " " +
                            classes.selectUnderlineRoot
                          }
                      >
                      <Select
                          MenuProps={{
                            className: classes.selectMenu
                          }}
                          classes={{
                            select: classes.select
                          }}
                          value={this.state.typeSelected}
                          onChange={this.handleType}
                          inputProps={{
                            name: "typeSelected",
                            id: "type"
                          }}
                      >
                        <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                        >
                          Tipo
                        </MenuItem>
                        <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="1"
                        >
                          Cliente
                        </MenuItem>
                        <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="2"
                        >
                          Personal
                        </MenuItem>
                        <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="3"
                        >
                          Admin
                        </MenuItem>
                      </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">
                    Crear
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

NewUserSection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(newUserSectionStyle)(NewUserSection);
