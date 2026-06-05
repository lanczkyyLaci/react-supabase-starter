import { useAuth } from '@/lib/auth/use-auth.ts';
import { getLogoutApi } from '@/api/auth/get-logout-api.ts';

export const LogoutButton = () => {
  const { user, role } = useAuth();

  const handleLogout = async () => {
    await getLogoutApi();
  };

  return (
    <div>
      <p>Email: {user?.email ?? 'N/A'}</p>
      <p>Role: {role ?? 'N/A'}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
