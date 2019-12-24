import React from 'react';
import MaterialTable from 'material-table';
import serviceProduct from '../../../services/api/products';
import Button from '../../components/CustomButtons/Button';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

class LoadPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [
        { product: 1, quantity: 2, provider: "Electro Panta"},
      ],
    };
  }

  async componentWillMount() {
    const response = await serviceProduct.list();
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
      <Button>
        hola
      </Button>
        </GridItem>
      </GridContainer>
    );
  }
}

export default LoadPurchase;


