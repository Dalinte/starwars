import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/router/routes.ts';

export const AppRouter = () => {
  return <RouterProvider router={createBrowserRouter(routes)} />;
};
