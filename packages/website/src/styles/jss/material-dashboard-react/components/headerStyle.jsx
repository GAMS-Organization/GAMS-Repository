import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  gamsBlackColor,
  gamsGrayColor,
  gamsWhiteColor,
  gamsBlueColor,
  gamsRedColor,
} from '../../material-dashboard-react.jsx';

const headerStyle = theme => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '10px',
    zIndex: '1029',
    color: grayColor[7],
    border: '0',
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '50px',
    display: 'block',
  },
  container: {
    ...container,
    minHeight: '50px',
  },
  flex: {
    flex: 1,
  },
  title: {
    ...defaultFont,
    lineHeight: '24px',
    fontSize: '18px',
    borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    margin: '0 0 0 12px',
    '&:hover,&:focus': {
      background: 'transparent',
    },
    '@media (max-width : 500px)': {
      fontSize: '18px',
      lineHeight: '1.5em',
    }
  },
  appResponsive: {
    top: '8px',
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  gamsBlue: {
    backgroundColor: gamsBlueColor[2],
    color: whiteColor,
    ...defaultBoxShadow,
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
  },
  gamsBlack: {
    backgroundColor: gamsBlackColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
  },
  gamsRed: {
    backgroundColor: gamsRedColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
  },
  gamsWhite: {
    backgroundColor: gamsWhiteColor[0],
    color: grayColor,
    ...defaultBoxShadow,
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
  },
  gamsGray: {
    backgroundColor: gamsGrayColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
  },
  customContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width : 500px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    }
  },
  userName: {
    margin: 0,
    padding: '12px',
    textTransform: 'capitalize',
    textAlign: 'right',
    '@media (max-width : 500px)': {
      fontSize: '14px',
      padding: '0 12px'
    }
  },
});

export default headerStyle;
