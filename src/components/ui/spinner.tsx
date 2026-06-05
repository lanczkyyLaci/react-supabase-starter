import { cn } from '@/utils/cn.ts';
import * as React from 'react';

function Spinner({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="spinner"
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
}

export { Spinner };
