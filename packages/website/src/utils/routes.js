// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Login from '@material-ui/icons/LockOpen';
// core components/views for Admin layout
import DashboardPage from '../containers/Dashboard/Dashboard.jsx';
import RooftoppersPage from '../containers/Rooftoppers/Rooftoppers.jsx';
import UserProfile from '../containers/UserProfile/UserProfile.jsx';
import TableList from '../containers/TableList/TableList.jsx';
import Typography from '../containers/Typography/Typography.jsx';
import Icons from '../containers/Icons/Icons.jsx';
import Maps from '../containers/Maps/Maps.jsx';
import NotificationsPage from '../containers/Notifications/Notifications.jsx';
// core components/views for Auth layout
import LoginPage from '../containers/Login/LoginPage.jsx';

const dashboardRoutes = [
  {
    path: '/rooftoppers',
    name: 'Rooftoppers',
    icon: Dashboard,
    component: RooftoppersPage,
    layout: '/dashboard-website',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/dashboard-website',
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: Person,
    component: UserProfile,
    layout: '/dashboard-website',
  },
  {
    path: '/table',
    name: 'Table List',
    icon: 'content_paste',
    component: TableList,
    layout: '/dashboard-website',
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: LibraryBooks,
    component: Typography,
    layout: '/dashboard-website',
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: BubbleChart,
    component: Icons,
    layout: '/dashboard-website',
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: LocationOn,
    component: Maps,
    layout: '/dashboard-website',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: Notifications,
    component: NotificationsPage,
    layout: '/dashboard-website',
  },
  {
    path: '/login-page',
    name: 'Login Page',
    icon: Login,
    component: LoginPage,
    layout: '/auth',
  },
];

export default dashboardRoutes;
