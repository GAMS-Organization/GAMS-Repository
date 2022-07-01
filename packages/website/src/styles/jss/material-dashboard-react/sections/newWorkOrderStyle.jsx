import customSelect from '../components/customSelectStyle.jsx';

const newWorkOrderStyle = {
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
  workOrderForm: {
    '@media (max-width: 960px)': {
      '& > div > div': {
        padding: '0px !important',
      },
    },
  },
  button: {
    marginTop: '30px',
    marginBottom: '20px',
  },
  ...customSelect,
};

export default newWorkOrderStyle;
