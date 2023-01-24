import MainLayout from '../layouts/Main';
import Sign from '../layouts/Sign';

export const publicRoutes = [
  { path: '/', component: MainLayout},
  { path: '/login/:type?', component: Sign, exact: true },
];