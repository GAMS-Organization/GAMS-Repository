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
import Pagination from '../../components/Pagination/Pagination';
import tablesSectionsstyle from '../../../styles/jss/material-dashboard-react/sections/tablesSectionsStyle';

class AssetTableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: [],
      totalPages: 1,
      page: 1,
    };
  }

  //se obtienen los activos
  async componentWillMount() {
    await this.listAssets();
  }

  listAssets = async (page = 1, itemsPerPage = 15) => {
    const response = await serviceAsset.list(page, itemsPerPage);
    let assets = [];
    for (const asset of response.data.items) {
      let dataAsset = [asset.id.toString(), asset.code, asset.sector.name, asset.area.name, asset.service.name, asset.element.name];
      assets.push(dataAsset);
    }
    this.setState({ asset: assets, totalPages: response.data.pageCount, page: page  });
  };

  pagination = () => {
    const pages = [
      {
        text: 'PREV',
        onClick: () => {
          this.state.page === 1? this.listAssets(1) : this.listAssets(this.state.page-1);
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
            this.listAssets(index);
          },
        });
      }
    }
    pages.push({
      text: 'NEXT',
      onClick: () => {
        this.state.page === this.state.totalPages? this.listAssets(this.state.totalPages) : this.listAssets(this.state.page + 1);
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
              <h4 className={classes.cardTitleWhite}>Activos</h4>
              <p className={classes.cardCategoryWhite}>Aquí se listan todos los Activos</p>
            </CardHeader>
            <CardBody>
              <AssetTable
                tableHeaderColor="gamsBlue"
                tableHead={['ID', 'Código', 'Sector', 'Área', 'Servicio', 'Elemento']}
                tableData={this.state.asset}
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

export default withStyles(tablesSectionsstyle)(AssetTableSection);
