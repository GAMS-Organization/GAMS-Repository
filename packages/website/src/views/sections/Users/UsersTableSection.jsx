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

  listUsers = async (page = 1, itemsPerPage = 15) => {
    const response = await serviceUser.list(page, itemsPerPage);

    let users = [];
    let estado;
    for (const user of response.data.items) {
      estado = user.state === 'active' ? 'Activo' : 'Inactivo';

      var rol;
      switch (user.roles[0]) {
        case 'admin':
          rol = 'Administrador';
          break;
        case 'boss':
          rol = 'Jefe';
          break;
        case 'user':
          rol = 'Usuario';
          break;
        case 'personal':
          rol = 'Personal';
          break;
        default:
          break;
      }

      let dataUser = {
        visibleData: [user.name, user.surname, user.email, rol, estado],
        id: user.id.toString(),
      };
      users.push(dataUser);
    }
    this.setState({ users: users, totalPages: response.data.pageCount, page: page });
  };

  render() {
    const { classes, roles, shouldLoad, onLoad } = this.props;
    if (shouldLoad) {
      this.listUsers();
      onLoad(false);
    }
    return (
      <GridContainer justify={'center'}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Usuarios</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todos los usuarios</p>
            </CardHeader>
            <CardBody>
              <UsersTable
                tableHeaderColor="gamsBlue"
                tableHead={['Nombre', 'Apellido', 'Correo', 'Usuario', 'Estado']}
                tableData={this.state.users}
                listUsers={this.listUsers}
                roles={roles}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card className={classes.cardCenter}>
            <Pagination
              listCallback={this.listUsers}
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

export default withStyles(tablesSectionsstyle)(UsersTableSection);
