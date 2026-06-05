import { Navigate } from 'react-router';
import { useAuth } from '../lib/auth/use-auth.ts';
import { paths } from '@/config/paths.ts';

import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={paths.auth.login.getHref()} replace />;
  }

  return children;
}
