import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import typographyStyle from '../../../styles/jss/material-dashboard-react/components/typographyStyle.jsx';

function Success({ ...props }) {
  const { classes, children, badge } = props;
  if (!badge) {
    return <div className={classes.defaultFontStyle + ' ' + classes.successText}>{children}</div>;
  } else {
    return <div className={classes.defaultFontStyle + ' ' + classes.successBadge}>{children}</div>;
  }
}

Success.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(typographyStyle)(Success);
