import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import NewProduct from '../sections/Products/NewProduct';
import ProductTableSection from '../sections/Products/ProductTableSection';
import UpdateProductSection from '../sections/Products/UpdateProductSection';

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

  const { REACT_APP_SERVER_URL } = process.env;

  class Products extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        errors: {},
      };
    }
  
    render() {
      return (
        <div>
            <NewProduct />
            <ProductTableSection />
        </div>
      );
    }
  }

  Products.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
  };

  export default withStyles(styles)(Products);