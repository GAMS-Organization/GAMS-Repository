import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import ToolTable from '../../components/Table/ToolTable';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';

class ToolTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tool: [],
    };
  }

  //se obtienen los productos
  /*async componentWillMount() {
    await this.listTools();
  }*/

  /*listTools = async (page = 1, itemsPerPage = 500) => {
    const response = await serviceProduct.list(page, itemsPerPage);
    let products = [];
    for (const product of response.data.items) {
      let dataProduct = { visibleData: [product.name], id: product.id.toString() };
      products.push(dataProduct);
    }

    this.setState({ product: products, totalPages: response.data.pageCount });
  };*/

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify={'center'}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Herramientas</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todas las Herramientas</p>
            </CardHeader>
            <CardBody>
              <ToolTable
                tableHeaderColor="gamsBlue"
                tableHead={['Nombre', 'Cantidad', 'Cantidad Prestada']}
                tableData={this.state.tool}
                listTools={this.listTools}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(tablesSectionsstyle)(ToolTableSection);
