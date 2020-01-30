// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Login from '@material-ui/icons/LockOpen';
import AssignmentIcon from '@material-ui/icons/Assignment';
// core components/views for Admin layout
import UsersView from 'views/containers/UsersView.jsx';
import Products from 'views/containers/Products';
import Stock from 'views/containers/Stock.jsx';

// core components/views for Auth layout
import LoginPage from 'views/containers/LoginPage.jsx';

const dashboardRoutes = [
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
    path: '/login-page',
    name: 'Logout',
    icon: Login,
    component: LoginPage,
    layout: '/auth',
  },
];

export default dashboardRoutes;
