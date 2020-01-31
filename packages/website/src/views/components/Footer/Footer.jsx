import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
// core components
import footerStyle from '../../../styles/jss/material-dashboard-react/components/footerStyle.jsx';

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <List className={classes.list}>
          <ListItem className={classes.inlineBlock}>
            <a href="#home" className={classes.block}>
              Home
            </a>
          </ListItem>
        </List>
      </div>
      <p className={classes.right}>
        <span>
          &copy; {1900 + new Date().getYear()} , Desarrollado por{' '}
          <a href="https://www.facebook.com/ale.minacori" target="_blank" className={classes.a}>
            Alejandro Minacori
          </a>{' '}
          y{' '}
          <a href="https://www.facebook.com/javi.sicardi" target="_blank" className={classes.a}>
            Javier Sicardi
          </a>{' '}
          para la{' '}
          <a href="http://www.sanfrancisco.utn.edu.ar/" target="_blank" className={classes.a}>
            "UTN Facultad Regional San Francisco"
          </a>{' '}
        </span>
      </p>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(footerStyle)(Footer);
