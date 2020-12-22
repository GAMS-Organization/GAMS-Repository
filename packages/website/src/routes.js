// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LocationOn from '@material-ui/icons/LocationOn';
import Login from '@material-ui/icons/LockOpen';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Build from '@material-ui/icons/Build';
import House from '@material-ui/icons/Home';
import Toys from '@material-ui/icons/Toys';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Category from '@material-ui/icons/Category';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
// core components/views for Admin layout
import Users from 'views/containers/Users.jsx';
import Products from 'views/containers/Products';
import Stock from 'views/containers/Stock.jsx';
import Sector from 'views/containers/Sector.jsx';
import Service from 'views/containers/Service.jsx';
import Area from 'views/containers/Area.jsx';
import Element from 'views/containers/Element.jsx';
import Asset from 'views/containers/Asset.jsx';
import WorkOrder from 'views/containers/WorkOrder';

// core components/views for Auth layout
import LoginPage from 'views/containers/LoginPage.jsx';

const dashboardRoutes = [
  {
    path: '/users',
    name: 'Usuarios',
    icon: Person,
    component: Users,
    layout: '/admin',
    title: 'Usuarios',
  },
  {
    path: '/WorkOrder',
    name: 'O. trabajo',
    icon: OfflineBolt,
    component: WorkOrder,
    layout: '/admin',
    title: 'Ordenes de Trabajo',
  },
  {
    path: '/products',
    name: 'Productos',
    icon: Toys,
    component: Products,
    layout: '/admin',
    title: 'Productos',
  },
  {
    path: '/stock',
    name: 'Stock',
    icon: AssignmentIcon,
    component: Stock,
    layout: '/admin',
    title: 'Stock',
  },
  {
    path: '/sector',
    name: 'Sector',
    icon: House,
    component: Sector,
    layout: '/admin',
    title: 'Sector',
  },
  {
    path: '/area',
    name: 'Área',
    icon: LocationOn,
    component: Area,
    layout: '/admin',
    title: 'Área',
  },
  {
    path: '/service',
    name: 'Servicio',
    icon: Build,
    component: Service,
    layout: '/admin',
    title: 'Servicio',
  },
  {
    path: '/element',
    name: 'Elementos',
    icon: Category,
    component: Element,
    layout: '/admin',
    title: 'Elementos',
  },
  {
    path: '/asset',
    name: 'Activos',
    icon: AllInclusive,
    component: Asset,
    layout: '/admin',
    title: 'Activos',
  },
  {
    path: '/login-page',
    name: 'Salir',
    icon: Login,
    component: LoginPage,
    layout: '/auth',
    title: 'Salir',
  },
];

export default dashboardRoutes;
