import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter, Navigate } from 'react-router';
import { paths } from '@/config/paths.ts';
import { Spinner } from '@/components/ui/spinner.tsx';
import { default as AppRoot, ErrorBoundary as AppRootErrorBoundary } from './app/root';
import { ProtectedRoute } from '../protected-route.tsx';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      element: <Navigate to={paths.auth.login.getHref()} replace />,
    },
    {
      path: paths.auth.login.path,
      lazy: () => import('./auth/login').then(convert(queryClient)),
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      HydrateFallback: () => <Spinner className="min-h-screen" />,
      children: [
        {
          index: true,
          path: paths.app.dashboard.path,
          lazy: () => import('./app/dashboard').then(convert(queryClient)),
        },
        {
          path: paths.app.profile.path,
          lazy: () => import('./app/profile').then(convert(queryClient)),
        },
        {
          path: paths.app.newUser.path,
          lazy: () => import('./app/new-user').then(convert(queryClient)),
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('./not-found').then(convert(queryClient)),
    },
  ]);
