import type { RoleTypes } from '@/lib/auth/roles.ts';
import type { ReactNode } from 'react';
import { Authorization } from '@/lib/auth/authorization.tsx';

export const CanView = ({
  allowedRoles,
  children,
}: {
  allowedRoles: RoleTypes[];
  children: ReactNode;
}) => (
  <Authorization allowedRoles={allowedRoles} forbiddenFallback={null}>
    {children}
  </Authorization>
);
