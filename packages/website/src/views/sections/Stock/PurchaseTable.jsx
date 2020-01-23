import React from 'react';
import MaterialTable from 'material-table';
import serviceProduct from '../../../services/api/products';
import serviceEntry from '../../../services/api/entryPurchaseStock';
import Button from '../../components/CustomButtons/Button';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Snackbar from '../../components/Snackbar/Snackbar';
import AddAlert from '@material-ui/icons/AddAlert';
import CustomInput from '../../components/CustomInput/CustomInput';
import CardBody from '../../components/Card/CardBody';
import Card from '../../components/Card/Card';
import CardFooter from '../../components/Card/CardFooter';

class PurchaseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  handleConfirmPurchaseClick = async e => {
    e.preventDefault();

    const products = [];
    const quantities = [];
    const providers = [];
    for(const purchase of this.state.data){
      products.push(parseInt(purchase.product));
      quantities.push(parseInt(purchase.quantity));
      providers.push(purchase.provider);
    }

    const formElements = e.target.elements;


    const date = formElements.namedItem('date').value;
    const observations = formElements.namedItem('observations').value;

    const request = {
      date: date,
      observations: observations,
      products: products,
      quantities: quantities,
      providers: providers,
    };

    const response = await serviceEntry.create(request);

    if (response.type === 'CREATED_SUCCESFUL') {
      this.setState({ notification: true });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
  };

  async componentWillMount() {
    const page = 1;
    const itemsPerPage = 30;
    const response = await serviceProduct.list(page, itemsPerPage);
    let dataProduct = {};
    for (const product of response.data.items) {
      dataProduct[product.id] = product.name;
    }

    this.setState({ columns: [
        { title: 'Producto', field: 'product', lookup:  dataProduct },
        { title: 'Proveedor', field: 'provider'},
        { title: 'Cantidad', field: 'quantity' },
      ]});
  }

  render() {

    return (
      <GridContainer>
        <Snackbar
          place="tr"
          color={this.state.errors.code ? 'danger' : 'success'}
          icon={AddAlert}
          message={
            this.state.errors.code
              ? `Error ${this.state.errors.code}, ${this.state.errors.errors}`
              : 'Entrada registrada correctamente'
          }
          open={this.state.notification}
          closeNotification={this.closeNotification}
          close
        />
        <GridItem xs={12} sm={12} md={6}>
      <MaterialTable
        title="Nueva entrada"
        columns={this.state.columns}
        data={this.state.data}
        options={{paging: false, search: false, draggable: false, actionsColumnIndex: 3}}
        localization={{header:{actions: "Acciones"},body:{addTooltip: "Nuevo",
            deleteTooltip: "Eliminar",
            editTooltip: "Editar",
            emptyDataSourceMessage: "Ningun producto añadido",
            editRow : {
          saveTooltip: "Guardar",
              cancelTooltip: "Cancelar",
              deleteText: "¿Estás seguro de querer eliminar este registro?"
            }},}}
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
          <form onSubmit={this.handleConfirmPurchaseClick}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Fecha"
                  id="date"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'date',
                    required: true,
                    defaultValue: "",
                    name: 'date',
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Observaciones"
                  id="observations"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    defaultValue: "",
                    name: 'observations',
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button type='submit' color="gamsRed">
                  Confirmar compra
                </Button>
              </GridItem>
            </GridContainer>
          </form>
      </CardBody>
      </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default PurchaseTable;


