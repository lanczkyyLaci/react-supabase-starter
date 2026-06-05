import * as React from 'react';
import { useAuth } from './use-auth';

// --- Szerepkörök (ROLES) ---
// Az alkalmazásban elérhető felhasználói szerepkörök felsorolása.
// Új szerepkör hozzáadásához egyszerűen bővítsd ezt az objektumot.

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

// A szerepkör típusa — az ROLES objektum kulcsai (pl. 'ADMIN' | 'USER')

export type RoleTypes = keyof typeof ROLES;

// --- Jogosultság-ellenőrző hook (useAuthorization) ---
// Ez a hook adja vissza a bejelentkezett felhasználó szerepkörét,
// és egy `checkAccess` függvényt, amivel ellenőrizheted,
// hogy a felhasználónak van-e megfelelő szerepköre.
//
// Használat:
//   const { checkAccess, role } = useAuthorization();
//   const canEdit = checkAccess({ allowedRoles: ['ADMIN'] });

export const useAuthorization = () => {
  const { user, role } = useAuth();

  // Ha nincs bejelentkezett felhasználó, hibát dobunk.
  if (!user) {
    throw new Error(
      'Felhasználó nem található! Csak bejelentkezett felhasználók használhatják ezt a hookot.',
    );
  }

  // checkAccess: megkapja az engedélyezett szerepkörök listáját,
  // és visszaadja, hogy a felhasználó szerepköre benne van-e.
  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0 && role) {
        // A felhasználó role-ját (pl. 'admin') összehasonlítjuk
        // az engedélyezett ROLES értékekkel (pl. ROLES.ADMIN = 'admin')
        return allowedRoles.some((allowedRole) => ROLES[allowedRole] === role);
      }

      // Ha nincs megadva szerepkör-szűrő, alapból engedélyezzük
      return true;
    },
    [role],
  );

  return { checkAccess, role };
};
