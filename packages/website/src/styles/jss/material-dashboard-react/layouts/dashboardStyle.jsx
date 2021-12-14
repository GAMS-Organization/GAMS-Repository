import { drawerWidth, transition, container } from '../../material-dashboard-react.jsx';

const appStyle = theme => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
    backgroundColor: 'e0e0e0',
  },
  content: {
    marginTop: '70px',
    padding: '30px 15px',
    minHeight: 'calc(100vh - 123px)',
    backgroundColor: '#c9c8dc',
    height: '100%',
  },
  container,
  map: {
    marginTop: '70px',
  },
});

export default appStyle;
