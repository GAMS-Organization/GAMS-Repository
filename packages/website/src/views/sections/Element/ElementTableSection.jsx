import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import ElementTable from '../../components/Table/ElementTable.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceElement from '../../../services/api/element';
import Pagination from '../../components/Pagination/Pagination';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';

class ElementTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: [],
      totalPages: 1,
      page: 1,
    };
  }

  //se obtienen los elementos
  async componentWillMount() {
    this.listElements();
  }

  listElements = async (page = 1, itemsPerPage = 15) => {
    const response = await serviceElement.list(page, itemsPerPage);
    let elements = [];
    for (const element of response.data.items) {
      let dataElement = {
        visibleData: [element.name, element.code, element.service.name],
        id: element.id,
      };
      elements.push(dataElement);
    }
    this.setState({ element: elements, totalPages: response.data.pageCount, page: page });
  };

  render() {
    const { classes, shouldLoad, onLoad } = this.props;
    if (shouldLoad) {
      this.listElements();
      onLoad(false);
    }
    return (
      <GridContainer justify={'center'}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Elementos</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todos los Elementos</p>
            </CardHeader>
            <CardBody>
              <ElementTable
                tableHeaderColor="gamsBlue"
                tableHead={['Nombre', 'Codigo', 'Servicio']}
                tableData={this.state.element}
                listElements={this.listElements}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card className={classes.cardCenter}>
            <Pagination
              listCallback={this.listElements}
              currentPage={this.state.page}
              totalPages={this.state.totalPages}
              color="gamsRed"
            />
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(tablesSectionsstyle)(ElementTableSection);
