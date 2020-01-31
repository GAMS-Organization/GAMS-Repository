import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import AssetTable from '../../components/Table/AssetTable';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';

import serviceAsset from '../../../services/api/asset';

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

class AssetTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: [],
    };
  }

  async componentWillMount() {
    const response = await serviceAsset.list();
    let assets = [];
    for (const asset of response.data.items) {
      let dataAsset = [asset.id.toString(), asset.sector.name, asset.area.name, asset.service.name, asset.element.name];
      assets.push(dataAsset);
    }
    this.setState({ asset: assets });
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="gamsBlue">
              <h4 className={classes.cardTitleWhite}>Activos</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todos los Activos</p>
            </CardHeader>
            <CardBody>
              <AssetTable
                tableHeaderColor="gamsBlue"
                tableHead={['ID', 'Sector', 'Area', 'Servicio', 'Elemento']}
                tableData={this.state.asset}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(AssetTableSection);
