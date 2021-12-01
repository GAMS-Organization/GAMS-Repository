import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer/index';
import Hidden from '@material-ui/core/Hidden/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import Icon from '@material-ui/core/Icon/index';
// core components

import sidebarStyle from '../../../styles/jss/material-dashboard-react/components/sidebarStyle.jsx';
import { Collapse } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.includes(routeName);
  }
  function activeGroup(children) {
    let isActive = children.filter(child => props.location.pathname.includes(child.layout + child.path));
    return isActive.length !== 0;
  }
  const { classes, color, image, logoText, routes, userInfo } = props;

  const [open, setOpen] = React.useState(false);

  // verifies if userInfo.roles exist on route
  function isAvailableRoute(validRoles) {
    let isAvailable = false;
    for (const userRol of userInfo.roles) {
      if (validRoles.includes(userRol)) {
        isAvailable = true;
      }
    }
    return isAvailable;
  }

  const handleClick = name => {
    if (open === name) {
      setOpen(false);
    } else {
      setOpen(name);
    }
  };

  let links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (!isAvailableRoute(prop.roles)) {
          return null;
        }
        let listItemClasses = classNames({
          [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
        });
        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
        });
        return !prop.group ? (
          <NavLink to={prop.layout + prop.path} className={classes.item} activeClassName="active" key={key}>
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === 'string' ? (
                <Icon className={classNames(classes.itemIcon, whiteFontClasses)}>{prop.icon}</Icon>
              ) : (
                <prop.icon className={classNames(classes.itemIcon, whiteFontClasses)} />
              )}
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        ) : (
          <>
            <ListItem
              button
              divider={activeGroup(prop.children)}
              className={classes.itemLink + listItemClasses}
              onClick={() => handleClick(prop.name)}
            >
              {typeof prop.icon === 'string' ? (
                <Icon className={classNames(classes.itemIcon, whiteFontClasses)}>{prop.icon}</Icon>
              ) : (
                <prop.icon className={classNames(classes.itemIcon, whiteFontClasses)} />
              )}
              {open === prop.name ? (
                <KeyboardArrowUp
                  className={classNames(classes.itemIcon, classes.Arrow, whiteFontClasses, classes.floatRight)}
                />
              ) : (
                <KeyboardArrowDown
                  className={classNames(classes.itemIcon, classes.Arrow, whiteFontClasses, classes.floatRight)}
                />
              )}
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
            <Collapse in={open === prop.name} timeout="auto" unmountOnExit className={classes.childrenContainer}>
              <List component="div" disablePadding>
                {prop.children.map((prop, key) => {
                  let listItemClasses = classNames({
                    [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
                  });
                  if (!isAvailableRoute(prop.roles)) {
                    return null;
                  }
                  return (
                    <NavLink to={prop.layout + prop.path} className={classes.item} activeClassName="active" key={key}>
                      <ListItem button className={classes.itemLink + listItemClasses}>
                        {typeof prop.icon === 'string' ? (
                          <Icon className={classNames(classes.itemIcon, whiteFontClasses)}>{prop.icon}</Icon>
                        ) : (
                          <prop.icon className={classNames(classes.itemIcon, whiteFontClasses)} />
                        )}
                        <ListItemText
                          primary={prop.name}
                          className={classNames(classes.itemText, whiteFontClasses)}
                          disableTypography={true}
                        />
                      </ListItem>
                    </NavLink>
                  );
                })}
              </List>
            </Collapse>
          </>
        );
      })}
    </List>
  );
  let brand = (
    <div className={classes.logo}>
      <a href="https://www.sanfrancisco.utn.edu.ar" className={classNames(classes.logoLink)}>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={'right'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {/*<AdminNavbarLinks />*/}
            {links}
          </div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: 'url(' + image + ')' }} />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: 'url(' + image + ')' }} />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(sidebarStyle)(Sidebar);
