import * as React from 'react';
import { useAuthorization, type RoleTypes } from './roles';
import { Navigate } from 'react-router-dom';
import { paths } from '@/config/paths.ts';

// --- Authorization komponens props típusa ---
// Kétféleképpen használható:
//   1. allowedRoles: szerepkör-lista alapján engedélyez/tilt
//   2. policyCheck: egyedi boolean feltétel alapján engedélyez/tilt
// A kettő egyszerre NEM használható (TypeScript kizárja).
type AuthorizationProps = {
  // Ha a felhasználónak nincs jogosultsága, ez jelenik meg helyette (alapból semmi)
  forbiddenFallback?: React.ReactNode;
  // A védett tartalom, ami csak jogosultság esetén jelenik meg
  children: React.ReactNode;
} & (
  | {
      // Szerepkör-lista: csak ezek a szerepkörök férhetnek hozzá
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      // Egyedi feltétel: true = hozzáférés engedélyezve, false = tiltva
      // Pl.: policyCheck={comment.authorId === user.id}
      policyCheck: boolean;
    }
);

// --- Authorization komponens ---
// Ezzel a komponenssel feltételesen jeleníthetsz meg tartalmat
// a felhasználó szerepköre vagy egyedi feltétel alapján.
//
// Használat szerepkör alapján:
//   <Authorization allowedRoles={['ADMIN']}>
//     <AdminPanel />
//   </Authorization>
//
// Használat egyedi feltétellel:
//   <Authorization policyCheck={isOwner}>
//     <DeleteButton />
//   </Authorization>
//
// Tiltott tartalom helyettesítése:
//   <Authorization allowedRoles={['ADMIN']} forbiddenFallback={<p>Nincs jogosultságod</p>}>
//     <AdminPanel />
//   </Authorization>
export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  if (!canAccess) {
    return forbiddenFallback ?? <Navigate to={paths.app.dashboard.getHref()} replace />;
  }

  return children;
};
