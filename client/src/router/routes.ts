import AdminLayout from '../layouts/Admin';
import MainLayout from '../layouts/Main';
import Sign from '../layouts/Sign';

export const publicRoutes = [
  { path: '/', component: MainLayout},
  { path: '/login/:type?', component: Sign, exact: true },
];

export const privateRoutes = [
  {path: '/', component: MainLayout},
  {path: '/adminpanel', component: AdminLayout}
]