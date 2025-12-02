import { AppLayout } from '@/layouts/AppLayout';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { CharactersPage } from '@/pages/CharactersPage';
import { Box } from '@mui/material';
import { type RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: CharactersPage },
      { path: '/characters', Component: CharactersPage },
      {
        path: '/characters/:id',
        Component: Box,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
];
