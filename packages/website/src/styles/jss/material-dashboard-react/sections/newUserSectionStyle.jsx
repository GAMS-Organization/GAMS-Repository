import customSelect from '../components/customSelectStyle.jsx';

const newUserSectionStyle = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  selectUnderlineRoot: {
    '& > div': {
      marginTop: '13px',
    },
  },
  customInput: {
    '@media (max-width: 960px)': {
      marginTop: '10px',
    },
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  ...customSelect,
};

export default newUserSectionStyle;
