import AdminLayout from '../layouts/Admin';
import MainLayout from '../layouts/Main';
import ProfileLayout from '../layouts/ProfileLayout';
import Sign from '../layouts/Sign';

export const publicRoutes = [
  { path: '/', component: MainLayout},
  { path: '/login/:type?', component: Sign, exact: true },
  {path: '/', component: MainLayout},
];

export const privateRoutes = [
  {path: '/profile', component: ProfileLayout},
]
export const adminRoutes = [
  {path: '/adminpanel/*', component: AdminLayout}
]