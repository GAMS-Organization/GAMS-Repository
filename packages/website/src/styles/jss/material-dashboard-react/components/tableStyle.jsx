import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont,
  gamsBlueColor,
  gamsGrayColor,
  gamsWhiteColor,
  gamsRedColor,
  gamsBlackColor,
} from '../../material-dashboard-react.jsx';
import tooltipStyle from '../../material-dashboard-react/tooltipStyle.jsx';

const tableStyle = theme => ({
  warningTableHeader: {
    color: warningColor[0],
  },
  primaryTableHeader: {
    color: primaryColor[0],
  },
  dangerTableHeader: {
    color: dangerColor[0],
  },
  successTableHeader: {
    color: successColor[0],
  },
  infoTableHeader: {
    color: infoColor[0],
  },
  roseTableHeader: {
    color: roseColor[0],
  },
  grayTableHeader: {
    color: grayColor[0],
  },
  gamsBlueTableHeader: {
    color: gamsBlueColor[0],
  },
  gamsRedTableHeader: {
    color: gamsRedColor[0],
  },
  gamsGrayTableHeader: {
    color: gamsGrayColor[0],
  },
  gamsBlackTableHeader: {
    color: gamsBlackColor[0],
  },
  gamsWhiteTableHeader: {
    color: gamsWhiteColor[0],
  },
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
  },
  ...tooltipStyle,
  tableCell: {
    ...defaultFont,
    lineHeight: '1.42857143',
    padding: '12px 8px',
    verticalAlign: 'middle',
  },
  tableHeadCell: {
    color: 'inherit',
    ...defaultFont,
    fontSize: '1em',
    fontWeight: '500',
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflow: 'auto',
  },
  tableActions: {
    display: 'flex',
    border: 'none',
    padding: '12px 8px !important',
    verticalAlign: 'middle',
  },
  tableActionButton: {
    width: '27px',
    height: '27px',
    padding: '0',
  },
  tableActionButtonIcon: {
    width: '17px',
    height: '17px',
  },
  edit: {
    backgroundColor: 'transparent',
    color: gamsBlueColor[0],
    boxShadow: 'none',
  },
  close: {
    backgroundColor: 'transparent',
    color: gamsRedColor[0],
    boxShadow: 'none',
  },
  disabled: {
    backgroundColor: 'transparent',
    color: gamsGrayColor[1],
    boxShadow: 'none',
  },
  searchInputContainer: {
    width: '200px',
    display: 'flex',
    alignItems: 'center',
  },
  itemIcon: {
    color: gamsRedColor[0],
  },
});

export default tableStyle;
