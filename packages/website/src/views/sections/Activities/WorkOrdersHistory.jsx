import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import GridContainer from '../../components/Grid/GridContainer';
import CardFooter from '../../components/Card/CardFooter';
import Button from '../../components/CustomButtons/Button';
import SnackbarContent from '../../components/Snackbar/SnackbarContent';
import Explore from '@material-ui/icons/Explore';

import workOrderService from '../../../services/api/workOrder';
import Info from '../../components/Typography/Info';
import Warning from '../../components/Typography/Warning';
import Success from '../../components/Typography/Success';
import Danger from '../../components/Typography/Danger';

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
  mx3: {
    marginLeft: '1rem',
    marginRight: '.8rem',
  },
};

class WorkOrdersHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrders: [],
      totalWorkOrderPages: 1,
      workOrderPage: 1,
    };
  }

  componentWillMount = async () => {
    const response = await workOrderService.listByUser();
    this.setState({ workOrders: response.items, totalWorkOrderPages: response.pageCount });
  };

  handleOnClick = async () => {
    const response = await workOrderService.listByUser(this.state.workOrderPage + 1);
    this.setState({
      workOrders: this.state.workOrders.concat(response.items),
      totalWorkOrderPages: response.pageCount,
      workOrderPage: this.state.workOrderPage + 1,
    });
  };

  render() {
    const { classes } = this.props;

    const state = {
      libre: 'info',
      pausada: 'warning',
      finalizada: 'success',
      asignada: 'warning',
      tomada: 'warning',
      cancelada: 'danger',
    };

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Actividades recientes</h4>
              <GridContainer>
                <p className={classes.cardCategoryWhite + ' ' + classes.mx3}>
                  Todas sus actividades son listadas aquí.
                </p>
                <Info badge>Notificada</Info>
                <Warning badge>En proceso</Warning>
                <Success badge>Realizada</Success>
                <Danger badge>Cancelada</Danger>
              </GridContainer>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {this.state.workOrders.length !== 0 ? (
                    this.state.workOrders.map(workOrder => {
                      return (
                        <SnackbarContent
                          message={`${workOrder.orderDate} - ${workOrder.comment} - Propridad: ${workOrder.priority}`}
                          color={state[workOrder.state]}
                          icon={Explore}
                        />
                      );
                    })
                  ) : (
                    <GridContainer justify={'center'}>
                      <h5>Todavía no haz realizado ninguna actividad.</h5>
                    </GridContainer>
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>
            {this.state.workOrderPage !== this.state.totalWorkOrderPages ? (
              <CardFooter>
                <GridContainer justify="center" md={12}>
                  <Button
                    color="gamsRed"
                    onClick={() => {
                      this.handleOnClick();
                    }}
                  >
                    Ver más
                  </Button>
                </GridContainer>
              </CardFooter>
            ) : null}
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

WorkOrdersHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkOrdersHistory);
