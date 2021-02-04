import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import IconButton from '@material-ui/core/IconButton/index';
import Hidden from '@material-ui/core/Hidden/index';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import Button from '../CustomButtons/Button.jsx';

import headerStyle from '../../../styles/jss/material-dashboard-react/components/headerStyle.jsx';

function Header({ ...props }) {
  function makeBrand() {
    var title;
    for (const prop of props.routes) {
      if (!prop.group) {
        if (prop.layout + prop.path === props.location.pathname) {
          title = prop.title;
        }
      } else {
        for (const child of prop.children) {
          if (child.layout + child.path === props.location.pathname) {
            title = child.title;
          }
        }
      }
    }
    return title;
  }
  const { classes, color, userInfo } = props;
  const appBarClasses = classNames({
    [' ' + classes[color]]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex + ' ' + classes.customContainer}>
          {/* Here we create navbar brand, based on route name */}
          <Button disabled color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
          <h6 className={classes.userName}>{userInfo.name}</h6>
        </div>
        <Hidden smDown implementation="css">
          {/*<AdminNavbarLinks {...classes} />*/}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton color="inherit" aria-label="open drawer" onClick={props.handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'gamsBlue',
    'gamsWhite',
    'gamsBlack',
    'gamsRed',
    'gamsGray',
  ]),
};

export default withStyles(headerStyle)(Header);
