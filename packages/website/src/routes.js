// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LocationOn from '@material-ui/icons/LocationOn';
import Login from '@material-ui/icons/LockOpen';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Build from '@material-ui/icons/Build';
// core components/views for Admin layout
import UsersView from 'views/containers/UsersView.jsx';
import Products from 'views/containers/Products';
import Stock from 'views/containers/Stock.jsx';
import Sector from 'views/containers/Sector.jsx';
import Service from 'views/containers/Service.jsx';
import Area from 'views/containers/Area.jsx';
import Element from 'views/containers/Element.jsx';
import Asset from 'views/containers/Asset.jsx';

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
    path: '/asset',
    name: 'Activos',
    icon: Build,
    component: Asset,
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
