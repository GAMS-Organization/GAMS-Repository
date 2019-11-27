import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// @material-ui/icons
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';
import GridContainer from '../Grid/GridContainer';

class EntryPurchase extends React.Component {
    state = {
      checked: this.props.checkedIndexes,
    };
    handleToggle = value => () => {
      const { checked } = this.state;
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      this.setState({
        checked: newChecked,
      });
    };
    render() {
      const { classes, tasksIndexes, tasks, rtlActive } = this.props;
      const tableCellClasses = classnames(classes.tableCell, {
        [classes.tableCellRTL]: rtlActive,
      });
      return(
        <Table className={classes.table}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
                            <p className={classes.cardCategoryWhite}>Here is a subtitle for this table</p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={['Name', 'Country', 'City', 'Salary']}
                                tableData={[
                                    ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
                                    ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
                                    ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                                    ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                                    ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
                                    ['Mason Porter', 'Chile', 'Gloucester', '$78,615'],
                                ]}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </Table>
      );
      /*return (
        <Table className={classes.table}>
          <TableBody>
            {tasksIndexes.map(value => (
              <TableRow key={value} className={classes.tableRow}>
                <TableCell className={tableCellClasses}>
                  <Checkbox
                    checked={this.state.checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    onClick={this.handleToggle(value)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.root,
                    }}
                  />
                </TableCell>
                <TableCell className={tableCellClasses}>{tasks[value]}</TableCell>
                <TableCell className={classes.tableActions}>
                  <Tooltip id="tooltip-top" title="Edit Task" placement="top" classes={{ tooltip: classes.tooltip }}>
                    <IconButton aria-label="Edit" className={classes.tableActionButton}>
                      <Edit className={classes.tableActionButtonIcon + ' ' + classes.edit} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip id="tooltip-top-start" title="Remove" placement="top" classes={{ tooltip: classes.tooltip }}>
                    <IconButton aria-label="Close" className={classes.tableActionButton}>
                      <Close className={classes.tableActionButtonIcon + ' ' + classes.close} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );*/
    }
  }
  
  Tasks.propTypes = {
    classes: PropTypes.object.isRequired,
    tasksIndexes: PropTypes.arrayOf(PropTypes.number),
    tasks: PropTypes.arrayOf(PropTypes.node),
    rtlActive: PropTypes.bool,
  };
  
  export default withStyles(tasksStyle)(EntryPurchase);