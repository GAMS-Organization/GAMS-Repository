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
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import Today from '@material-ui/icons/Today';
import Input from '@material-ui/icons/Input';
import ListIcon from '@material-ui/icons/List';
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
import WorkOrder from 'views/containers/WorkOrder';
import ListWorkOrder from 'views/containers/ListWorkOrder';

// core components/views for Auth layout
import LoginPage from 'views/containers/LoginPage.jsx';

const dashboardRoutes = [
  {
    path: '/stock',
    name: 'Stock',
    icon: AssignmentIcon,
    component: Stock,
    layout: '/admin',
    title: 'Stock',
    roles: ['admin', 'personal'],
  },
  {
    path: '/preventive',
    name: 'Preventivo',
    icon: Today,
    component: Preventive,
    layout: '/admin',
    title: 'Mantenimiento preventivo',
    roles: ['admin', 'personal'],
  },
  {
    path: '/users',
    name: 'Usuarios',
    icon: Person,
    component: Users,
    layout: '/admin',
    title: 'Usuarios',
    roles: ['admin'],
  },
  {
    name: 'O. trabajo',
    icon: Input,
    layout: '/admin',
    group: true,
    title: 'Ordenes de Trabajo',
    roles: ['admin', 'personal', 'user'],
    children: [
      {
        path: '/WorkOrder',
        name: 'Crear',
        icon: OfflineBolt,
        component: WorkOrder,
        layout: '/admin',
        title: 'Ordenes de Trabajo',
        roles: ['admin', 'personal', 'user'],
      },
      {
        path: '/ListWorkOrder',
        name: 'Listado',
        icon: ListIcon,
        component: ListWorkOrder,
        layout: '/admin',
        title: 'Listado ordenes de trabajo',
        roles: ['admin', 'personal', 'user'],
      },
    ],
  },
  {
    path: '/products',
    name: 'Productos',
    icon: Toys,
    component: Products,
    layout: '/admin',
    title: 'Productos',
    roles: ['admin', 'personal'],
  },
  {
    name: 'Gestión',
    icon: Input,
    layout: '/admin',
    group: true,
    title: 'Gestón',
    roles: ['admin', 'personal'],
    children: [
      {
        path: '/sector',
        name: 'Sectores',
        icon: House,
        component: Sector,
        layout: '/admin',
        title: 'Sectores',
        roles: ['admin', 'personal'],
      },
      {
        path: '/area',
        name: 'Áreas',
        icon: LocationOn,
        component: Area,
        layout: '/admin',
        title: 'Áreas',
        roles: ['admin', 'personal'],
      },
      {
        path: '/service',
        name: 'Servicios',
        icon: Build,
        component: Service,
        layout: '/admin',
        title: 'Servicios',
        roles: ['admin', 'personal'],
      },
      {
        path: '/element',
        name: 'Elementos',
        icon: Category,
        component: Element,
        layout: '/admin',
        title: 'Elementos',
        roles: ['admin', 'personal'],
      },
      {
        path: '/asset',
        name: 'Activos',
        icon: AllInclusive,
        component: Asset,
        layout: '/admin',
        title: 'Activos',
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
    title: 'Salir',
    roles: ['admin', 'personal', 'user'],
  },
];

export default dashboardRoutes;
