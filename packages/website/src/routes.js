// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Register from '@material-ui/icons/GroupAdd';
import Login from '@material-ui/icons/LockOpen';
// core components/views for Admin layout
import DashboardPage from 'views/containers/Dashboard.jsx';
import UsersView from 'views/containers/UsersView.jsx';
import TableList from 'views/containers/TableList.jsx';
import Typography from 'views/containers/Typography.jsx';
import Icons from 'views/containers/Icons.jsx';
import Maps from 'views/containers/Maps.jsx';
import NotificationsPage from 'views/containers/Notifications.jsx';

// core components/views for Auth layout
import LoginPage from 'views/containers/LoginPage.jsx';
import RegisterPage from 'views/containers/RegisterPage.jsx';

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
