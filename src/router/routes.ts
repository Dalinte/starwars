import { AppLayout } from '@/layouts/AppLayout';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { CharactersPage } from '@/pages/CharacterList/Index';
import { CharacterPage } from '@/pages/Character/Index';
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
        Component: CharacterPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
];
