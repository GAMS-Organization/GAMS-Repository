import { drawerWidth, transition, container } from '../../material-dashboard-react.jsx';
import image from '../../../img/imagenTaller2.jpg';

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
    backgroundImage: 'url(' + image + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '100%',
  },
  container,
  map: {
    marginTop: '70px',
  },
});

export default appStyle;
