import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import GridContainer from '../../components/Grid/GridContainer';
import CustomInput from '../../components/CustomInput/CustomInput';
import CardFooter from '../../components/Card/CardFooter';
import Button from '../../components/CustomButtons/Button';
import SnackbarContent from '../../components/Snackbar/SnackbarContent';
import Explore from '@material-ui/icons/Explore';

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

class WorkOrdersHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={this.createProduct}>
            <Card>
              <CardHeader color="gamsBlue">
                <h4 className={classes.cardTitleWhite}>Actividades recientes</h4>
                <p className={classes.cardCategoryWhite}>Todas sus actividades son listadas aquí</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <SnackbarContent
                      message={'INFO - This is a regular notification made with color="info"'}
                      close
                      color="info"
                      icon={Explore}
                    />
                    <br />
                    <SnackbarContent
                      message={'SUCCESS - This is a regular notification made with color="success"'}
                      close
                      color="success"
                    />
                    <br />
                    <SnackbarContent
                      message={'WARNING - This is a regular notification made with color="warning"'}
                      close
                      color="warning"
                    />
                    <br />
                    <SnackbarContent
                      message={'DANGER - This is a regular notification made with color="danger"'}
                      close
                      color="danger"
                    />
                    <br />
                    <SnackbarContent
                      message={'PRIMARY - This is a regular notification made with color="primary"'}
                      close
                      color="primary"
                    />
                    <br />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridContainer justify="center" md={12}>
                  <Button type="submit" color="gamsRed">
                    Ver más
                  </Button>
                </GridContainer>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    );
  }
}

WorkOrdersHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkOrdersHistory);
