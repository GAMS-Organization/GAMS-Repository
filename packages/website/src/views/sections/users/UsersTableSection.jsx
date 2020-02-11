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
    const response = await serviceUser.list();

    let users = [];
    for (const user of response.data.items) {
      let dataUser = [user.id.toString(), user.name, user.surname, user.email, user.roles[0], user.state];
      users.push(dataUser);
    }
    this.setState({ users: users, totalPages: response.data.pageCount  });
  };

  pagination = () => {
    const pages = [
      {
        text: 'PREV',
        onClick: () => {
          console.log("PREV");
        },
      },
    ];
    for (let index = 1; index <= this.state.totalPages; index++) {
      if (index === this.state.page) {
        pages.push({ text: index, active: true });
      } else {
        pages.push({
          text: index,
          onClick: () => {
            console.log(index);
          },
        });
      }
    }
    pages.push({
      text: 'NEXT',
      onClick: () => {
        console.log("NEXT");
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
          <Card>
            <Pagination pages={this.pagination()} color="gamsRed" />
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(UsersTableSection);
