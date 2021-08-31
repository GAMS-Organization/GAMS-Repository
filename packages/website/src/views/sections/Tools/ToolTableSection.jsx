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
import serviceTool from '../../../services/api/tool';

import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';
import Pagination from '../../components/Pagination/Pagination';

class ToolTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tool: [],
    };
  }

  async componentWillMount() {
    await this.listTools();
  }

  listTools = async (page = 1, itemsPerPage = 500) => {
    const response = await serviceTool.list(page, itemsPerPage);
    let tools = [];
    for (const tool of response.data.items) {
      let dataProduct = { visibleData: [tool.name, tool.totalQuantity, tool.borrowQuantity], id: tool.id.toString() };
      tools.push(dataProduct);
    }

    this.setState({ tool: tools, totalPages: response.data.pageCount });
  };

  pagination = () => {
    const pages = [
      {
        text: 'PREV',
        onClick: () => {
          this.state.page === 1 ? this.listTools(1) : this.listTools(this.state.page - 1);
        },
      },
    ];
    for (let index = 1; index <= this.state.totalPages; index++) {
      if (index === this.state.page) {
        pages.push({ text: index, active: true });
      } else {
        pages.push({
          text: index,
          onClick: async () => {
            this.listTools(index);
          },
        });
      }
    }
    pages.push({
      text: 'NEXT',
      onClick: () => {
        this.state.page === this.state.totalPages
          ? this.listTools(this.state.totalPages)
          : this.listTools(this.state.page + 1);
      },
    });
    return pages;
  };

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
        <GridItem>
          <Card className={classes.cardCenter}>
            <Pagination pages={this.pagination()} color="gamsRed" />
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(tablesSectionsstyle)(ToolTableSection);
