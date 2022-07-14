import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceEvent from '../../../services/api/preventive';
import Pagination from '../../components/Pagination/Pagination';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';
import PreventiveTable from '../../components/Table/PreventiveTable';

class EventTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      totalPages: 10,
      page: 1,
    };
  }

  //se obtienen los productos
  async componentWillMount() {
    await this.listEvents();
  }

  listEvents = async (page = 1, itemsPerPage = 15) => {
    const response = await serviceEvent.list(page, itemsPerPage);
    let events = [];
    for (const event of response.data.items) {
      let dataEvent = [event.title, event.description, event.startDate, event.endDate];
      events.push(dataEvent);
    }

    this.setState({ event: events, totalPages: response.data.pageCount, page: page });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify={'center'}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Eventos</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todos los eventos</p>
            </CardHeader>
            <CardBody>
              <PreventiveTable
                tableHeaderColor="gamsBlue"
                tableHead={['Título', 'Descripción', 'Fecha de inicio', 'Fecha de fin']}
                tableData={this.state.event}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card className={classes.cardCenter}>
            <Pagination
              listCallback={this.listEvents}
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

export default withStyles(tablesSectionsstyle)(EventTableSection);
