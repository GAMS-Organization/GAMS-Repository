/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
// creates a beautiful scrollbar
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Navbar from '../views/components/Navbars/Navbar.jsx';
import Footer from '../views/components/Footer/Footer.jsx';
import Sidebar from '../views/components/Sidebar/Sidebar.jsx';

import routes from '../routes.js';

import dashboardStyle from '../styles/jss/material-dashboard-react/layouts/dashboardStyle.jsx';

import logo from '../styles/img/UTN.png';

const { REACT_APP_SERVER_URL } = process.env;
let userInfo = {};

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={props => {
              const Component = prop.component;
              return <Component {...props} {...userInfo} />;
            }}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'blue',
      hasImage: true,
      fixedClasses: 'dropdown show',
      mobileOpen: false,
    };
  }
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === 'dropdown') {
      this.setState({ fixedClasses: 'dropdown show' });
    } else {
      this.setState({ fixedClasses: 'dropdown' });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={'GAMS'}
          logo={logo}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="gamsRed"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar routes={routes} handleDrawerToggle={this.handleDrawerToggle} color="gamsBlue" {...rest} />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Dashboard);
