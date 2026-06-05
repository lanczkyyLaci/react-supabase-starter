import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { AuthProvider } from '../lib/auth/auth.tsx';
import { TooltipProvider } from '@/components/ui/tooltip';
import * as React from 'react';
import { queryConfig } from '@/lib/react-query.ts';
import { Spinner } from '@/components/ui/spinner.tsx';

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner className="size-15" />
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.Suspense>
  );
}
