import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import ProductTable from '../../components/Table/ProductTable.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceProduct from '../../../services/api/products';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';

class ProductTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }

  //se obtienen los productos
  async componentWillMount() {
    await this.listProducts();
  }

  listProducts = async (page = 1, itemsPerPage = 500) => {
    const response = await serviceProduct.list(page, itemsPerPage);
    let products = [];
    for (const product of response.data.items) {
      let dataProduct = { visibleData: [product.name], id: product.id.toString() };
      products.push(dataProduct);
    }

    this.setState({ product: products, totalPages: response.data.pageCount });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify={'center'}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Productos</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todos los productos</p>
            </CardHeader>
            <CardBody>
              <ProductTable
                tableHeaderColor="gamsBlue"
                tableHead={['Nombre']}
                tableData={this.state.product}
                listProducts={this.listProducts}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(tablesSectionsstyle)(ProductTableSection);
