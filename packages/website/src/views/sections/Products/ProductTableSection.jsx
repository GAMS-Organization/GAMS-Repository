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

const styles = {
    cardCategoryWhite: {
      '&,& a,& a:hover,& a:focus': {
        color: 'rgba(255,255,255,.62)',
        margin: '0',
        fontSize: '14px',
        marginTop: '0',
        marginBottom: '0',
      },
      '& a,& a:hover,& a:focus': {
        color: '#FFFFFF',
      },
    },
    cardTitleWhite: {
      color: '#FFFFFF',
      marginTop: '0px',
      minHeight: 'auto',
      fontWeight: '300',
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: '3px',
      textDecoration: 'none',
      '& small': {
        color: '#777',
        fontSize: '65%',
        fontWeight: '400',
        lineHeight: '1',
      },
    },
  };

class ProductTableSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        product: [],
        };
    }

    /*async componentWillMount() {
        const response = await serviceProduct.list();
        console.log(response);
        let products = [];
          for (const product of response.data.items) {
            let dataProduct = [product.id.toString(), product.name];
            products.push(dataProduct);
          }
          this.setState({ products: products });
    }*/

    render() {
        const { classes } = this.props;
        return (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="gamsBlue">
                  <h4 className={classes.cardTitleWhite}>Productos</h4>
                  <p className={classes.cardCategoryWhite}>Aquí se listan todos los productos</p>
                </CardHeader>
                <CardBody>
                  <ProductTable
                    tableHeaderColor="gamsBlue"
                    tableHead={['ID', 'Nombre']}
                    tableData={this.state.product}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        );
    }
}

export default withStyles(styles)(ProductTableSection);
