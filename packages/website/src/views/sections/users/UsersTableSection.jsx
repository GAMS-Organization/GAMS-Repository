import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import UsersTable from '../../components/Table/UsersTable.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceUser from '../../../services/api/user';
import Pagination from '../../components/Pagination/Pagination';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';

class UsersTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalPages: 1,
      page: 1,
    };
  }

  //se obtienen los usuarios
  componentWillMount = async () => {
    await this.listUsers();
  };

  listUsers = async (page = 1, itemsPerPage= 15) => {
    const response = await serviceUser.list(page, itemsPerPage);

    let users = [];
    for (const user of response.data.items) {
      let dataUser = [user.id.toString(), user.name, user.surname, user.email, user.roles[0], user.state];
      users.push(dataUser);
    }
    this.setState({ users: users, totalPages: response.data.pageCount, page: page  });
  };

  pagination = () => {
    const pages = [
      {
        text: 'PREV',
        onClick: () => {
          this.state.page === 1? this.listUsers(1) : this.listUsers(this.state.page-1);
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
            this.listUsers(index);
          },
        });
      }
    }
    pages.push({
      text: 'NEXT',
      onClick: () => {
        this.state.page === this.state.totalPages? this.listUsers(this.state.totalPages) : this.listUsers(this.state.page + 1);
      },
    });
    return pages;
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Usuarios</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todos los usuarios</p>
            </CardHeader>
            <CardBody>
              <UsersTable
                tableHeaderColor="gamsBlue"
                tableHead={['ID', 'Nombre', 'Apellido', 'Correo', 'Usuario', 'Estado']}
                tableData={this.state.users}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes.cardCenter}>
            <Pagination pages={this.pagination()} color="gamsRed" />
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(tablesSectionsstyle)(UsersTableSection);
