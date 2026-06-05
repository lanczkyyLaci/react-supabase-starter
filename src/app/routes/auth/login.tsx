import { LoginForm } from '@/features/auth/login-form';
import { AuthLayout } from '@/components/layouts/auth-layout.tsx';

const loginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
export default loginPage;
