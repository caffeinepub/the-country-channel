import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import Shows from './pages/Shows';
import DJs from './pages/DJs';
import Dashboard from './pages/admin/Dashboard';
import ManageShows from './pages/admin/ManageShows';
import ManageDJs from './pages/admin/ManageDJs';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public layout route
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public-layout',
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: Home,
});

const showsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/shows',
  component: Shows,
});

const djsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/djs',
  component: DJs,
});

// Admin layout route
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin-layout',
  component: AdminLayout,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin',
  component: Dashboard,
});

const adminShowsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/shows',
  component: ManageShows,
});

const adminDJsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/djs',
  component: ManageDJs,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([homeRoute, showsRoute, djsRoute]),
  adminLayoutRoute.addChildren([adminDashboardRoute, adminShowsRoute, adminDJsRoute]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
