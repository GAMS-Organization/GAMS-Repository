// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Register from '@material-ui/icons/GroupAdd';
import Login from '@material-ui/icons/LockOpen';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Build from '@material-ui/icons/Build';
// core components/views for Admin layout
import DashboardPage from 'views/containers/Dashboard.jsx';
import UsersView from 'views/containers/UsersView.jsx';
import TableList from 'views/containers/TableList.jsx';
import Typography from 'views/containers/Typography.jsx';
import Icons from 'views/containers/Icons.jsx';
import Maps from 'views/containers/Maps.jsx';
import NotificationsPage from 'views/containers/Notifications.jsx';
import Products from 'views/containers/Products';
import Stock from 'views/containers/Stock.jsx';
import Sector from 'views/containers/Sector.jsx';
import Service from 'views/containers/Service.jsx';
import Area from 'views/containers/Area.jsx';
import Element from 'views/containers/Element.jsx';

// core components/views for Auth layout
import LoginPage from 'views/containers/LoginPage.jsx';
import RegisterPage from 'views/containers/RegisterPage.jsx';
import { setTokenSourceMapRange } from 'typescript';
import { element } from 'prop-types';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/users',
    name: 'Users',
    icon: Person,
    component: UsersView,
    layout: '/admin',
  },
  {
    path: '/products',
    name: 'Productos',
    icon: AssignmentIcon,
    component: Products,
    layout: '/admin',
  },
  {
    path: '/stock',
    name: 'Stock',
    icon: AssignmentIcon,
    component: Stock,
    layout: '/admin',
  },
  {
    path: '/sector',
    name: 'Sector',
    icon: LocationOn,
    component: Sector,
    layout: '/admin',
  },
  {
    path: '/service',
    name: 'Servicio',
    icon: Build,
    component: Service,
    layout: '/admin',
  },
  {
    path: '/area',
    name: 'Area',
    icon: LocationOn,
    component: Area,
    layout: '/admin',
  },
  {
    path: '/element',
    name: 'Elementos',
    icon: Build,
    component: Element,
    layout: '/admin',
  },
  {
    path: '/table',
    name: 'Table List',
    icon: 'content_paste',
    component: TableList,
    layout: '/admin',
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: LibraryBooks,
    component: Typography,
    layout: '/admin',
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: BubbleChart,
    component: Icons,
    layout: '/admin',
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: LocationOn,
    component: Maps,
    layout: '/admin',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: Notifications,
    component: NotificationsPage,
    layout: '/admin',
  },
  {
    path: '/login-page',
    name: 'Login Page',
    icon: Login,
    component: LoginPage,
    layout: '/auth',
  },
  {
    path: '/register-page',
    name: 'Register Page',
    icon: Register,
    component: RegisterPage,
    layout: '/auth',
  },
];

export default dashboardRoutes;
