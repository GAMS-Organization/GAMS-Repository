import React from 'react';
import MaterialTable from 'material-table';
import serviceProduct from '../../../services/api/products';
import serviceDeparture from '../../../services/api/departureConsumptionStock';
import Button from '../../components/CustomButtons/Button';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Snackbar from '../../components/Snackbar/Snackbar';
import AddAlert from '@material-ui/icons/AddAlert';
import CustomInput from '../../components/CustomInput/CustomInput';
import CardBody from '../../components/Card/CardBody';
import Card from '../../components/Card/Card';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  button: {
    '@media (max-width: 960px)': {
      marginTop: '20px',
    },
  },
  consumptionInputs: {
    '@media (max-width: 960px)': {
      marginTop: '10px',
    },
  },
};

class ConsumptionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      errors: {},
      notification: false,
    };
    this.formRef = {};
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  //se crea el consumo
  handleConfirmConsumptionClick = async e => {
    e.preventDefault();

    const products = [];
    const quantities = [];
    for (const consumption of this.state.data) {
      products.push(parseInt(consumption.product));
      quantities.push(parseInt(consumption.quantity));
    }

    const formElements = e.target.elements;

    const date = formElements.namedItem('date').value;
    const observations = formElements.namedItem('observations').value;

    const request = {
      date: date,
      observations: observations,
      products: products,
      quantities: quantities,
    };

    if (products.length !== quantities.length || products.length === 0 || quantities.length === 0) {
      this.setState({ notification: true, errors: { code: 422, errors: 'No se pudo consumir. Campos incompletos' } });
    } else {
      const response = await serviceDeparture.create(request);

      if (response.type === 'CREATED_SUCCESSFUL') {
        this.setState({ notification: true, data: [] });
        this.formRef.reset();
      } else {
        this.setState({ notification: true, errors: response.error });
      }
    }
  };

  async componentWillMount() {
    const response = await serviceProduct.list(1, 500);
    let dataProduct = {};
    for (const product of response.data.items) {
      dataProduct[product.id] = product.name;
    }

    this.setState({
      columns: [
        { title: 'Producto', field: 'product', lookup: dataProduct },
        { title: 'Cantidad', field: 'quantity' },
      ],
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <GridItem xs={12} sm={12} md={12} lg={5}>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.errors}`
              : 'Salida registrada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />

        <MaterialTable
          title="Nueva salida"
          columns={this.state.columns}
          data={this.state.data}
          options={{ paging: false, search: false, draggable: false, actionsColumnIndex: 3 }}
          localization={{
            header: { actions: 'Acciones' },
            body: {
              addTooltip: 'Nuevo',
              deleteTooltip: 'Eliminar',
              editTooltip: 'Editar',
              emptyDataSourceMessage: 'Ningun producto añadido',
              editRow: {
                saveTooltip: 'Guardar',
                cancelTooltip: 'Cancelar',
                deleteText: '¿Estás seguro de querer eliminar este registro?',
              },
            },
          }}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState(prevState => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
        <Card>
          <CardBody>
            <form onSubmit={this.handleConfirmConsumptionClick} ref={ref => (this.formRef = ref)}>
              <GridContainer alignItems={'center'}>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText=""
                    id="date"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.consumptionInputs,
                    }}
                    inputProps={{
                      type: 'date',
                      required: true,
                      defaultValue: '',
                      name: 'date',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Observaciones"
                    id="observations"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.consumptionInputs,
                    }}
                    inputProps={{
                      required: true,
                      defaultValue: '',
                      name: 'observations',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Button type="submit" color="gamsRed" className={classes.button} block={true}>
                    Consumir
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(styles)(ConsumptionTable);
