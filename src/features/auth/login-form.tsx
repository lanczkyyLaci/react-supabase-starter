import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/auth/use-login.ts';
import { paths } from '@/config/paths.ts';
import { loginSchema, type LoginFormValues } from '@/lib/auth/schema/login-schema.ts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ErrorMessage } from '@/components/ui/error-message';
import { FieldError } from '@/components/ui/field-error';
import { MailIcon } from 'lucide-react';

export function LoginForm() {
  const navigate = useNavigate();
  const login = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: LoginFormValues) {
    login.mutate(data, {
      onSuccess: () => {
        navigate(paths.app.dashboard.getHref());
      },
    });
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo & Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground">
          <svg
            className="h-7 w-7 text-background"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Üdvözöljük</h1>
        <p className="mt-2 text-muted-foreground">Jelentkezzen be a fiókjába a folytatáshoz</p>
      </div>

      {/* Form */}
      <form
        id="login-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 pb-2"
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                endIcon={<MailIcon />}
                {...field}
                id="login-email"
                type="email"
                size="lg"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
              />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-password" className="text-sm font-medium">
                Password
              </label>
              <Input
                {...field}
                id="login-password"
                type="password"
                size="lg"
                aria-invalid={fieldState.invalid}
              />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
        <div className="min-h-[20px]">
          {login.isError && (
            <ErrorMessage message={(login.error as any)?.message ?? 'Something went wrong.'} />
          )}
        </div>
      </form>

      <Button
        type="submit"
        form="login-form"
        className="w-full"
        size="xl"
        disabled={login.isPending}
      >
        {login.isPending ? 'Signing in...' : 'Login'}
      </Button>
    </div>
  );
}
