import { getLogoutApi } from '@/api/auth/get-logout-api.ts';
import { Button } from '@/components/ui/button.tsx';

export const LogoutButton = () => {
  const handleLogout = async () => {
    await getLogoutApi();
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
