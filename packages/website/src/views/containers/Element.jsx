import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import NewElementSection from '../sections/Element/NewElementSection';
import ElementTableSection from '../sections/Element/ElementTableSection';

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

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  render() {
    return (
      <div>
        <NewElementSection />
        <ElementTableSection />
      </div>
    );
  }
}

Element.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  code: PropTypes.string,
  email: PropTypes.string,
};

export default withStyles(styles)(Element);
