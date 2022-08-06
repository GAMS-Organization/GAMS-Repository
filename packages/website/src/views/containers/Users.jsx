import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components

import NewUserSection from '../sections/Users/NewUserSection';
import UsersTable from '../sections/Users/UsersTableSection';

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

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      shouldLoad: false,
    };
  }

  handleOnSubmit = value => {
    this.setState({ shouldLoad: value });
  };

  render() {
    const { roles } = this.props;
    return (
      <div>
        {(roles.includes('admin') || roles.includes('boss')) && (
          <NewUserSection onSubmit={() => this.handleOnSubmit(true)} />
        )}
        <UsersTable roles={roles} shouldLoad={this.state.shouldLoad} onLoad={this.handleOnSubmit} />
      </div>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
};

export default withStyles(styles)(Users);
