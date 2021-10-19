import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import EducationalElementTable from '../../components/Table/EducationalElementTable';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import serviceEducationalElement from '../../../services/api/educationalElement';

import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';
import Pagination from '../../components/Pagination/Pagination';

class EducationalElementTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      educationalElement: [],
    };
  }

  async componentWillMount() {
    await this.listEducationalElements();
  }

  listEducationalElements = async (page = 1, itemsPerPage = 500) => {
    const response = await serviceEducationalElement.list(page, itemsPerPage);
    let educationalElements = [];
    for (const educationalElement of response.data.items) {
      let dataEducationalElements = {
        visibleData: [educationalElement.name, educationalElement.totalQuantity, educationalElement.borrowQuantity],
        id: educationalElement.id.toString(),
      };
      educationalElements.push(dataEducationalElements);
    }

    this.setState({ educationalElement: educationalElements, totalPages: response.data.pageCount });
  };

  pagination = () => {
    const pages = [
      {
        text: 'PREV',
        onClick: () => {
          this.state.page === 1 ? this.listEducationalElements(1) : this.listEducationalElements(this.state.page - 1);
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
            this.listEducationalElements(index);
          },
        });
      }
    }
    pages.push({
      text: 'NEXT',
      onClick: () => {
        this.state.page === this.state.totalPages
          ? this.listEducationalElements(this.state.totalPages)
          : this.listEducationalElements(this.state.page + 1);
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
              <EducationalElementTable
                tableHeaderColor="gamsBlue"
                tableHead={['Nombre', 'Cantidad', 'Cantidad Prestada']}
                tableData={this.state.educationalElement}
                listEducationalElements={this.listEducationalElements}
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

export default withStyles(tablesSectionsstyle)(EducationalElementTableSection);
