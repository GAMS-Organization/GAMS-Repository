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

import workOrderService from '../../../services/api/workOrder';
import Info from '../../components/Typography/Info';
import Warning from '../../components/Typography/Warning';
import Success from '../../components/Typography/Success';
import Danger from '../../components/Typography/Danger';
import OfflineBolt from '@material-ui/icons/OfflineBolt';

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
  cardHeader: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  mx3: {
    marginRight: '.5rem',
    '&~ div': {
      marginLeft: '0px',
      marginRight: '.5rem',
    },
    '@media (max-width: 500px)': {
      '&~ div': {
        marginTop: '.5rem',
      },
    },
  },
  alternativeText: {
    margin: '0 20px',
    '&> h5': {
      textAlign: 'center',
    },
  },
};

class WorkOrdersWorkerHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrdersWorker: [],
      totalWorkOrderWorkerPages: 1,
      workOrderWorkerPage: 1,
    };
  }

  componentWillMount = async () => {
    const response = await workOrderService.listByWorker();
    this.setState({ workOrdersWorker: response.items, totalWorkOrderWorkerPages: response.pageCount });
  };

  handleOnClick = async () => {
    const response = await workOrderService.listByWorker(this.state.workOrderWorkerPage + 1);
    this.setState({
      workOrdersWorker: this.state.workOrdersWorker.concat(response.items),
      totalWorkOrderWorkerPages: response.pageCount,
      workOrderWorkerPage: this.state.workOrderWorkerPage + 1,
    });
  };

  render() {
    const { classes } = this.props;

    const state = {
      Libre: 'info',
      Pausada: 'warning',
      Finalizada: 'success',
      Asignada: 'warning',
      Tomada: 'warning',
      Cancelada: 'danger',
    };

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Actividades Recientes</h4>
              <div className={classes.cardHeader}>
                <p className={classes.cardCategoryWhite + ' ' + classes.mx3}>
                  Todas sus actividades como personal de mantenimiento son listadas aqui.
                </p>
                <Info badge>Libre</Info>
                <Warning badge>Tomada</Warning>
                <Warning badge>Asignada</Warning>
                <Warning badge>Pausada</Warning>
                <Success badge>Finalizada</Success>
                <Danger badge>Cancelada</Danger>
              </div>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {this.state.workOrdersWorker.length !== 0 ? (
                    this.state.workOrdersWorker.map((workOrder, index) => {
                      return (
                        <SnackbarContent
                          message={`${workOrder.orderDate} - ${workOrder.state.toUpperCase()} - Prioridad: ${
                            workOrder.priority
                          } - ${workOrder.comment} `}
                          color={state[workOrder.state]}
                          icon={OfflineBolt}
                          key={workOrder.comment + index}
                        />
                      );
                    })
                  ) : (
                    <GridContainer justify={'center'}>
                      <div className={classes.alternativeText}>
                        <h5>Todavía no haz realizado ninguna actividad.</h5>
                      </div>
                    </GridContainer>
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>
            {this.state.workOrderWorkerPage !== this.state.totalWorkOrderWorkerPages &&
            this.state.totalWorkOrderWorkerPages ? (
              <CardFooter>
                <GridContainer justify="center" md={12} sm={12} xs={12}>
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

WorkOrdersWorkerHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkOrdersWorkerHistory);
