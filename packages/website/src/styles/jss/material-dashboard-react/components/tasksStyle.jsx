import { defaultFont, primaryColor, grayColor, gamsRedColor, gamsGrayColor } from '../../material-dashboard-react.jsx';
import tooltipStyle from '../../material-dashboard-react/tooltipStyle.jsx';
import checkboxAdnRadioStyle from '../../material-dashboard-react/checkboxAdnRadioStyle.jsx';
const tasksStyle = {
  ...tooltipStyle,
  ...checkboxAdnRadioStyle,
  table: {
    marginBottom: '0',
    overflow: 'visible',
  },
  tableRow: {
    position: 'relative',
    borderBottom: '1px solid ' + grayColor[5],
  },
  tableActions: {
    display: 'flex',
    border: 'none',
    padding: '12px 8px !important',
    verticalAlign: 'middle',
  },
  tableCell: {
    ...defaultFont,
    padding: '8px',
    verticalAlign: 'middle',
    border: 'none',
    lineHeight: '1.42857143',
    fontSize: '14px',
  },
  tableCellRTL: {
    textAlign: 'right',
  },
  tableActionButton: {
    width: '27px',
    height: '27px',
    padding: '0',
  },
  tableResponsive: {
    width: '100%',
    overflow: 'auto',
  },
  tableActionButtonIcon: {
    width: '17px',
    height: '17px',
  },
  edit: {
    backgroundColor: 'transparent',
    color: primaryColor[0],
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
};
export default tasksStyle;
