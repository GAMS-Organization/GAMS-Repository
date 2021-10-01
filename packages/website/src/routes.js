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
import Explore from '@material-ui/icons/Explore';
import BuildIcon from '@material-ui/icons/Build';
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
import Activities from 'views/containers/Activities';
import ListWorkOrder from 'views/containers/ListWorkOrder';
import Tools from 'views/containers/Tools';
import CreateToolRequestSection from 'views/sections/Tools/CreateToolRequestSection';
import ToolRequestTableSection from './views/sections/Tools/ToolRequestTableSection';

// core components/views for Auth layout
import LoginPage from 'views/containers/LoginPage.jsx';

const dashboardRoutes = [
  {
    path: '/my-activities',
    name: 'Actividades',
    icon: Explore,
    component: Activities,
    layout: '/admin',
    title: 'Historial de actividades',
    roles: ['admin', 'personal', 'user'],
  },
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
    name: 'O. trabajo',
    icon: OfflineBolt,
    layout: '/admin',
    group: true,
    title: 'Ordenes de Trabajo',
    roles: ['admin', 'personal', 'user'],
    children: [
      {
        path: '/WorkOrder',
        name: 'Nueva O.T.',
        icon: OfflineBolt,
        component: WorkOrder,
        layout: '/admin',
        group: true,
        title: 'Nueva órden de trabajo',
        roles: ['admin', 'personal', 'user'],
      },
      {
        path: '/ListWorkOrder',
        name: 'Ver O.T.',
        icon: OfflineBolt,
        component: ListWorkOrder,
        layout: '/admin',
        group: true,
        title: 'Ver O.T.',
        roles: ['admin', 'personal', 'user'],
      },
    ],
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
    path: '/products',
    name: 'Productos',
    icon: Toys,
    component: Products,
    layout: '/admin',
    title: 'Productos',
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
    name: 'Gestión',
    icon: Input,
    layout: '/admin',
    group: true,
    title: 'Gestión',
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
    name: 'Herramientas',
    icon: BuildIcon,
    group: true,
    layout: '/admin',
    title: 'Herramientas',
    roles: ['admin', 'personal', 'user'],
    children: [
      {
        path: '/tools',
        name: 'Gestión',
        icon: BuildIcon,
        component: Tools,
        layout: '/admin',
        title: 'Gestión',
        roles: ['admin', 'personal', 'user'],
      },
      {
        path: '/CreateToolRequestSection',
        name: 'Solicitar',
        icon: BuildIcon,
        component: CreateToolRequestSection,
        layout: '/admin',
        title: 'Solicitar',
        roles: ['admin', 'personal', 'user'],
      },
      {
        path: '/ToolRequestTableSection',
        name: 'Solicitudes',
        icon: BuildIcon,
        component: ToolRequestTableSection,
        layout: '/admin',
        title: 'Solicitudes',
        roles: ['admin', 'personal', 'user'],
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
