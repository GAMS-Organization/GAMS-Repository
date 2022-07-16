import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons components
import Close from '@material-ui/icons/Close';
// core components
import tableStyle from '../../../styles/jss/material-dashboard-react/components/tableStyle.jsx';

import DeleteAssetSection from '../../sections/Asset/DeleteAssetSection';

class AssetTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      deleteModal: false,
      asset: {},
      errors: {},
      notification: false,
    };
  }

  closeNotification = () => {
    this.setState({ notification: false, errors: {} });
  };

  closeModal = () => {
    this.setState({ deleteModal: false });
  };

  //se elimina el activo
  /*deleteAsset = async prop => {
    const response = await serviceAsset.delete(prop[0]);

    if (response.type === 'DELETED_SUCCESSFUL') {
      this.setState({ notification: true });
    } else {
      this.setState({ notification: true, errors: response.error });
    }
    this.props.listAssets();
  };*/

  handleClickDelete = prop => {
    this.setState({
      asset: { id: prop[0], code: prop[1] },
      deleteModal: true,
    });
  };

  componentWillMount = () => {
    this.setState({ modal: false });
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;

    return (
      <div className={classes.tableResponsive}>
        <DeleteAssetSection
          asset={this.state.asset}
          open={this.state.deleteModal}
          close={this.closeModal}
          listAssets={this.props.listAssets}
        />
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell + ' ' + classes.tableHeadCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                <TableRow key={key} hover>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                  <TableCell className={classes.tableActions}>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Eliminar"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      disableFocusListener={true}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => this.handleClickDelete(prop)}
                      >
                        <Close className={classes.tableActionButtonIcon + ' ' + classes.close} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

AssetTable.defaultProps = {
  tableHeaderColor: 'gray',
};

AssetTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
    'gamsBlue',
    'gamsBlack',
    'gamsRed',
    'gamsGray',
    'gamsWhite',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  listAssets: PropTypes.func,
};

export default withStyles(tableStyle)(AssetTable);
