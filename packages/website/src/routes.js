// @material-ui/icons
import Person from '@material-ui/icons/Person';
import LocationOn from '@material-ui/icons/LocationOn';
import Login from '@material-ui/icons/LockOpen';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Build from '@material-ui/icons/Build';
import House from '@material-ui/icons/Home';
import Toys from '@material-ui/icons/Toys';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Category from '@material-ui/icons/Category';
import Today from '@material-ui/icons/Today';
import Input from '@material-ui/icons/Input';
// core components/views for Admin layout
import Users from 'views/containers/Users.jsx';
import Products from 'views/containers/Products';
import Stock from 'views/containers/Stock.jsx';
import Sector from 'views/containers/Sector.jsx';
import Service from 'views/containers/Service.jsx';
import Area from 'views/containers/Area.jsx';
import Element from 'views/containers/Element.jsx';
import Asset from 'views/containers/Asset.jsx';
import Preventive from 'views/containers/Preventive';

// core components/views for Auth layout
import LoginPage from 'views/containers/LoginPage.jsx';

const dashboardRoutes = [
  {
    path: '/stock',
    name: 'Stock',
    icon: AssignmentIcon,
    component: Stock,
    layout: '/admin',
    roles: ['admin', 'personal'],
  },
  {
    path: '/preventive',
    name: 'Preventivo',
    icon: Today,
    component: Preventive,
    layout: '/admin',
    roles: ['admin', 'personal'],
  },
  {
    path: '/users',
    name: 'Usuarios',
    icon: Person,
    component: Users,
    layout: '/admin',
    roles: ['admin', 'personal'],
  },
  {
    path: '/products',
    name: 'Productos',
    icon: Toys,
    component: Products,
    layout: '/admin',
    roles: ['admin', 'personal'],
  },
  {
    name: 'Gestión',
    icon: Input,
    layout: '/admin',
    group: true,
    roles: ['admin', 'personal'],
    children: [
      {
        path: '/sector',
        name: 'Sector',
        icon: House,
        component: Sector,
        layout: '/admin',
        roles: ['admin', 'personal'],
      },
      {
        path: '/area',
        name: 'Área',
        icon: LocationOn,
        component: Area,
        layout: '/admin',
        roles: ['admin', 'personal'],
      },
      {
        path: '/service',
        name: 'Servicio',
        icon: Build,
        component: Service,
        layout: '/admin',
        roles: ['admin', 'personal'],
      },
      {
        path: '/element',
        name: 'Elementos',
        icon: Category,
        component: Element,
        layout: '/admin',
        roles: ['admin', 'personal'],
      },
      {
        path: '/asset',
        name: 'Activos',
        icon: AllInclusive,
        component: Asset,
        layout: '/admin',
        roles: ['admin', 'personal'],
      },
    ],
  },
  {
    path: '/login-page',
    name: 'Salir',
    icon: Login,
    component: LoginPage,
    layout: '/auth',
    roles: ['admin', 'personal', 'user'],
  },
];

export default dashboardRoutes;
