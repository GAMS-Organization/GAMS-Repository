import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import NewAreaSection from '../sections/Area/NewAreaSection';
import AreaTableSection from '../sections/Area/AreaTableSection';

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

class Area extends React.Component {
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
          <NewAreaSection onSubmit={() => this.handleOnSubmit(true)} />
        )}
        <AreaTableSection shouldLoad={this.state.shouldLoad} onLoad={this.handleOnSubmit} />
      </div>
    );
  }
}

Area.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  code: PropTypes.string,
  email: PropTypes.string,
};

export default withStyles(styles)(Area);
