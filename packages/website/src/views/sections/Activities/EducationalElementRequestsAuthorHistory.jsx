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

import educationalElementService from '../../../services/api/educationalElement';
import Info from '../../components/Typography/Info';
import Warning from '../../components/Typography/Warning';
import Success from '../../components/Typography/Success';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
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

class EducationalElementRequestsAuthorHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      educationalElementRequestsAuthor: [],
      totalEducationalElementRequestsHistoryAuthorPages: 1,
      educationalElementRequestsHistoryAuthorPage: 1,
    };
  }

  componentWillMount = async () => {
    const response = await educationalElementService.listByUser();
    this.setState({
      educationalElementRequestsAuthor: response.data.items,
      totalEducationalElementRequestsHistoryAuthorPages: response.data.pageCount,
    });
  };

  handleOnClick = async () => {
    const response = await educationalElementService.listByUser(
      this.state.educationalElementRequestsHistoryAuthorPage + 1,
    );
    this.setState({
      educationalElementRequestsAuthor: this.state.educationalElementRequestsAuthor.concat(response.data.items),
      totalEducationalElementRequestsHistoryAuthorPages: response.data.pageCount,
      educationalElementRequestsHistoryAuthorPage: this.state.educationalElementRequestsHistoryAuthorPage + 1,
    });
  };

  render() {
    const { classes } = this.props;

    const state = {
      pendiente: 'info',
      llevando: 'warning',
      entregado: 'warning',
      devuelto: 'success',
      cancelado: 'danger',
    };

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Solicitudes de Artículos</h4>
              <div className={classes.cardHeader}>
                <p className={classes.cardCategoryWhite + ' ' + classes.mx3}>
                  Todas sus solicitudes de artículos son listadas aquí.
                </p>
                <Info badge>Notificada</Info>
                <Warning badge>En camino</Warning>
                <Warning badge>En uso</Warning>
                <Success badge>Devuelta</Success>
                <Danger badge>Cancelada</Danger>
              </div>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {this.state.educationalElementRequestsAuthor.length !== 0 ? (
                    this.state.educationalElementRequestsAuthor.map((educationalElementRequest, index) => {
                      return (
                        <SnackbarContent
                          message={`${educationalElementRequest.date} - ${educationalElementRequest.area.name} - Artículo: ${educationalElementRequest.educationalElement.name} - Cantidad: ${educationalElementRequest.quantity}`}
                          color={state[educationalElementRequest.status]}
                          icon={OfflineBolt}
                          key={educationalElementRequest.educationalElement.name + index}
                        />
                      );
                    })
                  ) : (
                    <GridContainer justify={'center'}>
                      <div className={classes.alternativeText}>
                        <h5>Todavía no haz realizado ninguna solicitud de artículos.</h5>
                      </div>
                    </GridContainer>
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>
            {this.state.educationalElementRequestsHistoryAuthorPage !==
              this.state.totalEducationalElementRequestsHistoryAuthorPages &&
            this.state.totalEducationalElementRequestsHistoryAuthorPages ? (
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

EducationalElementRequestsAuthorHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EducationalElementRequestsAuthorHistory);
