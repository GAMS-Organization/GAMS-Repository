import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import AreasTable from '../../components/Table/AreasTable.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceArea from '../../../services/api/area';

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

class AreaTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: [],
    };
  }

  //se obtienen los areas
  async componentWillMount() {
    const response = await serviceArea.list();

    let areas = [];
    for (const area of response.data.items) {
      let dataArea = [area.id.toString(), area.name, area.code, area.sector, area.services.toString().replace(/,/gi, ' - ', )];
      areas.push(dataArea);
    }
    console.log(areas);
    this.setState({ area: areas });
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Areas</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todas las areas</p>
            </CardHeader>
            <CardBody>
              <AreasTable
                tableHeaderColor="gamsBlue"
                tableHead={['ID', 'Nombre', 'Codigo', 'Sector', 'Servicios']}
                tableData={this.state.area}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(AreaTableSection);
