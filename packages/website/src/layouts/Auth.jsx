import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import Footer from '../views/components/Footer/AuthFooter.jsx';

import routes from '../routes.js';

import pagesStyle from '../styles/jss/material-dashboard-react/layouts/authStyle.jsx';

import login from '../styles/img/fondoUTN.jpeg';

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      }
      return null;
    })}
  </Switch>
);

class Pages extends React.Component {
  componentDidMount() {
    document.body.style.overflow = 'unset';
  }
  getBgImage = () => {
    return login;
  };
  getActiveRoute = routes => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.wrapper}>
          <div className={classes.fullPage} style={{ backgroundImage: 'url(' + this.getBgImage() + ')' }}>
            {switchRoutes}
            <Footer white />
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(pagesStyle)(Pages);
