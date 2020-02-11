import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import SectorTable from '../../components/Table/SectorTable.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceSector from '../../../services/api/sector';

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

class SectorTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sector: [],
      totalPages: 1,
    };
  }

  //obtiene los sectores
  componentWillMount = async () => {
    const response = await serviceSector.list();
    let sectors = [];
    for (const sector of response.data.items) {
      let dataSector = [sector.id.toString(), sector.name, sector.code];
      sectors.push(dataSector);
    }

    this.setState({ sector: sectors, totalPages: response.data.pageCount  });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Sectores</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todos los sectores</p>
            </CardHeader>
            <CardBody>
              <SectorTable
                tableHeaderColor="gamsBlue"
                tableHead={['ID', 'Nombre', 'Codigo']}
                tableData={this.state.sector}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(SectorTableSection);
