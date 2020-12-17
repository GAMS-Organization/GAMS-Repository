import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import PreventiveCalendar from '../sections/Preventive/PreventiveCalendar';
import PreventiveTableSection from '../sections/Preventive/PreventiveTableSection';
import Button from '../components/CustomButtons/Button';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';

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

class Preventive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
    };
  }

  handleShowAllClick = () => {
    this.setState({ showAll: !this.state.showAll });
  };

  render() {
    return (
      <>
        <PreventiveCalendar />
        <GridContainer justify={'center'}>
          <GridItem>
            <Button onClick={() => this.handleShowAllClick()} color={'gamsRed'}>
              {!this.state.showAll ? 'Mostrar tabla' : 'Ocultar tabla'}
            </Button>
          </GridItem>
        </GridContainer>
        {this.state.showAll ? <PreventiveTableSection /> : null}
      </>
    );
  }
}

Preventive.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
};

export default withStyles(styles)(Preventive);
