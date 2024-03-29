import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import ToolRequestTable from '../../components/Table/ToolRequestTable';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import serviceTool from '../../../services/api/tool';

import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';
import Pagination from '../../components/Pagination/Pagination';

class ToolRequestTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolRequest: [],
    };
  }

  async componentWillMount() {
    await this.listToolsRequest();
  }

  listToolsRequest = async (page = 1, itemsPerPage = 500) => {
    let response;
    if (this.props.roles[0] === 'user') {
      response = await serviceTool.listMyToolRequest(page, itemsPerPage);
    } else {
      response = await serviceTool.listToolRequest(page, itemsPerPage);
    }
    let toolsRequest = [];
    for (const toolRequest of response.data.items) {
      let dataToolRequest = {
        visibleData: [
          toolRequest.tool.name,
          toolRequest.quantity,
          toolRequest.user.name,
          toolRequest.status,
          toolRequest.area.name,
          toolRequest.date,
        ],
        id: toolRequest.id.toString(),
        areaId: toolRequest.area.id.toString(),
        toolId: toolRequest.tool.id.toString(),
      };
      toolsRequest.push(dataToolRequest);
    }

    this.setState({ toolRequest: toolsRequest, totalPages: response.data.pageCount });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify={'center'}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Solicitudes de Herramientas</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todas las Solicitudes de Herramientas</p>
            </CardHeader>
            <CardBody>
              <ToolRequestTable
                tableHeaderColor="gamsBlue"
                tableHead={['Herramienta', 'Cantidad', 'Usuario', 'Estado', 'Área', 'Fecha']}
                tableData={this.state.toolRequest}
                listToolsRequest={this.listToolsRequest}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card className={classes.cardCenter}>
            <Pagination
              listCallback={this.listToolsRequest}
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

export default withStyles(tablesSectionsstyle)(ToolRequestTableSection);
