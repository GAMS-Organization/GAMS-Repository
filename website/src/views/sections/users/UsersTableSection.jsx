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

function UsersTableSection(props) {
  const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Usuarios</h4>
            <p className={classes.cardCategoryWhite}>Aquí se listan todos los usuarios</p>
          </CardHeader>
          <CardBody>
            <UsersTable
              tableHeaderColor="primary"
              tableHead={['ID', 'Nombre', 'Apellido', 'Correo', 'Contraseña', 'Tipo de cuenta', 'Token']}
              tableData={[
                ['1', 'Alejandro', 'Minacori', 'alenemo4@hotmail', '1234', 'cliente', '987asd1qw321'],
                ['2', 'Javier', 'Sicardi', 'javinemo4@hotmail', '1234', 'cliente', '81as7891w321'],
                ['3', 'Valentin', 'Boasso', 'valenemo4@hotmail', '1234', 'cliente', '8as79w7654wljk1'],
                ['4', 'Franco', 'Cortesini', 'franconemo4@hotmail', '1234', 'personal', '258uytcvbc2d'],
                ['5', 'Juan', 'Froilan', 'juannemo4@hotmail', '1234', 'admin', '789typwe789df879'],
                ['6', 'Joel', 'Mercol', 'joelnemo4@hotmail', '1234', 'personal', '7982312xc456as3ch8'],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  );
}

export default withStyles(styles)(UsersTableSection);
