import {
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  grayColor,
} from '../../material-dashboard-react.jsx';

const typographyStyle = {
  defaultFontStyle: {
    ...defaultFont,
    fontSize: '14px',
  },
  defaultHeaderMargins: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  quote: {
    padding: '10px 20px',
    margin: '0 0 20px',
    fontSize: '17.5px',
    borderLeft: '5px solid ' + grayColor[10],
  },
  quoteText: {
    margin: '0 0 10px',
    fontStyle: 'italic',
  },
  quoteAuthor: {
    display: 'block',
    fontSize: '80%',
    lineHeight: '1.42857143',
    color: grayColor[1],
  },
  mutedText: {
    color: grayColor[1],
  },
  primaryText: {
    color: primaryColor[0],
  },
  infoText: {
    color: infoColor[0],
  },
  successText: {
    color: successColor[0],
  },
  warningText: {
    color: warningColor[0],
  },
  dangerText: {
    color: dangerColor[0],
  },
  infoBadge: {
    backgroundColor: infoColor[0],
    borderRadius: '3px',
    fontWeight: 'bolder',
    color: 'white',
    padding: '3px 8px',
    margin: '0 5px',
  },
  successBadge: {
    backgroundColor: successColor[0],
    borderRadius: '3px',
    fontWeight: 'bolder',
    color: 'white',
    padding: '3px 8px',
    margin: '0 5px',
  },
  warningBadge: {
    backgroundColor: warningColor[0],
    borderRadius: '3px',
    fontWeight: 'bolder',
    color: 'white',
    padding: '3px 8px',
    margin: '0 5px',
  },
  dangerBadge: {
    backgroundColor: dangerColor[0],
    borderRadius: '3px',
    fontWeight: 'bolder',
    color: 'white',
    padding: '3px 8px',
    margin: '0 5px',
  },
};

export default typographyStyle;
