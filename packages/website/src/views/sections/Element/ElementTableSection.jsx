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

class ElementTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: [],
    };
  }

  //se obtienen los elementos
  async componentWillMount() {
    const response = await serviceElement.list();
    let elements = [];
    for (const element of response.data.items) {
      let dataElement = [element.id.toString(), element.name, element.code, element.service.name, element.description];
      elements.push(dataElement);
    }
    this.setState({ element: elements });
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Elementos</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todos los Elementos</p>
            </CardHeader>
            <CardBody>
              <ElementTable
                tableHeaderColor="gamsBlue"
                tableHead={['ID', 'Nombre', 'Codigo', 'Servicio', 'Descripcion']}
                tableData={this.state.element}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ElementTableSection);
