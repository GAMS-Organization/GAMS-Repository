import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import WorkOrdersAuthorHistory from '../sections/Activities/WorkOrdersAuthorHistory';
import WorkOrdersWorkerHistory from '../sections/Activities/WorkOrdersWorkerHistory';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  render() {
    const { roles } = this.props;
    return (
      <div>
        {roles.includes('personal') ? <WorkOrdersWorkerHistory /> : null}
        <WorkOrdersAuthorHistory />
      </div>
    );
  }
}

Activities.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Activities);
