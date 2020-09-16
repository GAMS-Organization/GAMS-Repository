import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
// @material-ui/icons
import Check from '@material-ui/icons/Check';
//core components
import styles from '../../../styles/jss/material-dashboard-react/checkboxAdnRadioStyle.jsx';

class CheckboxInput extends React.Component {
  constructor(props) {
    super(props);
    const {checked} = props;
    this.state = {
      checked: checked,
    };
  }

  handleToggle = () => {
    this.setState({ checked: !this.state.checked });
    this.props.handleCheck(!this.state.checked);
  };

  render() {
    const { classes, label } = this.props;
    return (
      <div>
        <Checkbox
          tabIndex={-1}
          onClick={this.handleToggle}
          checkedIcon={<Check className={classes.checkedIcon} />}
          icon={<Check className={classes.uncheckedIcon} />}
          classes={{
            checked: classes.checked,
          }}
        />
        {label ? <label>{label}</label> : null}
      </div>
    );
  }
}

CheckboxInput.propTypes = {
  handleCheck: PropTypes.func,
};

export default withStyles(styles)(CheckboxInput);
