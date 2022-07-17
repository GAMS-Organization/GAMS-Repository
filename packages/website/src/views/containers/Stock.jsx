import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import TableStockSection from '../sections/Stock/TableStockSection';
import PurchaseTable from '../sections/Stock/PurchaseTable';
import ConsumptionTable from '../sections/Stock/ConsumptionTable';
import GridContainer from '../components/Grid/GridContainer';

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

class Stock extends React.Component {
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
    return (
      <div>
        <GridContainer>
          <PurchaseTable onSubmit={() => this.handleOnSubmit(true)} />
          <ConsumptionTable onSubmit={() => this.handleOnSubmit(true)} />
        </GridContainer>
        <TableStockSection shouldLoad={this.state.shouldLoad} onLoad={this.handleOnSubmit} />
      </div>
    );
  }
}

Stock.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
};

export default withStyles(styles)(Stock);
