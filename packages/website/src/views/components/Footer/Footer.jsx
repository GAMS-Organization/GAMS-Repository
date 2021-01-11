import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import footerStyle from '../../../styles/jss/material-dashboard-react/components/footerStyle.jsx';

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <p className={classes.right}>
        <span>
          &copy; {1900 + new Date().getYear()} , Desarrollado por{' '}
          <a
            href="https://www.facebook.com/ale.minacori"
            target="_blank"
            className={classes.a}
            rel="noopener noreferrer"
          >
            Alejandro Minacori
          </a>{' '}
          y{' '}
          <a
            href="https://www.facebook.com/javi.sicardi"
            target="_blank"
            className={classes.a}
            rel="noopener noreferrer"
          >
            Javier Sicardi
          </a>{' '}
          para la{' '}
          <a href="http://www.sanfrancisco.utn.edu.ar/" target="_blank" className={classes.a} rel="noopener noreferrer">
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
