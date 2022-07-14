import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import EducationalElementRequestTable from '../../components/Table/EducationalElementRequestTable';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import ServiceEducationalElement from '../../../services/api/educationalElement';

import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';
import Pagination from '../../components/Pagination/Pagination';

class EducationalElementRequestTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      educationalElementRequest: [],
    };
  }

  async componentWillMount() {
    await this.listEducationalElementRequest();
  }

  listEducationalElementRequest = async (page = 1, itemsPerPage = 500) => {
    let response;
    if (this.props.roles[0] === 'user') {
      response = await ServiceEducationalElement.listMyElementRequest(page, itemsPerPage);
    } else {
      response = await ServiceEducationalElement.listElementRequest(page, itemsPerPage);
    }
    let educationalElementsRequest = [];
    for (const educationalElementRequest of response.data.items) {
      let dataEducationalRequest = {
        visibleData: [
          educationalElementRequest.educationalElement.name,
          educationalElementRequest.quantity,
          educationalElementRequest.user.name,
          educationalElementRequest.status,
          educationalElementRequest.area.name,
          educationalElementRequest.date,
        ],
        id: educationalElementRequest.id.toString(),
        areaId: educationalElementRequest.area.id.toString(),
      };
      educationalElementsRequest.push(dataEducationalRequest);
    }

    this.setState({ educationalElementRequest: educationalElementsRequest, totalPages: response.data.pageCount });
  };

  pagination = () => {
    const pages = [
      {
        text: '<<',
        onClick: () => {
          this.listEducationalElementRequest(1);
        },
      },
      {
        text: '<',
        onClick: () => {
          this.state.page === 1
            ? this.listEducationalElementRequest(1)
            : this.listEducationalElementRequest(this.state.page - 1);
        },
      },
    ];
    for (
      let index = this.state.page - 7 > 0 ? this.state.page - 7 : 1;
      index <= this.state.page + 7 && index <= this.state.totalPages;
      index++
    ) {
      if (index === this.state.page) {
        pages.push({ text: index, active: true });
      } else {
        pages.push({
          text: index,
          onClick: async () => {
            this.listEducationalElementRequest(index);
          },
        });
      }
    }
    pages.push({
      text: '>',
      onClick: () => {
        this.state.page === this.state.totalPages
          ? this.listEducationalElementRequest(this.state.totalPages)
          : this.listEducationalElementRequest(this.state.page + 1);
      },
    });
    pages.push({
      text: '>>',
      onClick: () => {
        this.listEducationalElementRequest(this.state.totalPages);
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
              <h4 className={classes.cardTitleWhite}>Solicitudes de Artículos</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todas las Solicitudes de Artículos</p>
            </CardHeader>
            <CardBody>
              <EducationalElementRequestTable
                tableHeaderColor="gamsBlue"
                tableHead={['Artículo', 'Cantidad', 'Usuario', 'Estado', 'Área', 'Fecha']}
                tableData={this.state.educationalElementRequest}
                listEducationalElementRequest={this.listEducationalElementRequest}
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

export default withStyles(tablesSectionsstyle)(EducationalElementRequestTableSection);
