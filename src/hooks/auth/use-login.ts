import { useMutation } from '@tanstack/react-query';
import { getLoginApi } from '@/api/auth/get-login-api.ts';

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      getLoginApi(email, password),
    retry: false,
  });
}
