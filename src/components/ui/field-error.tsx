import { cn } from '@/utils/cn.ts';

function FieldError({ message, className }: { message?: string; className?: string }) {
  return (
    <p className={cn('min-h-[5px] text-xs text-destructive', className)}>{message ?? '\u00A0'}</p>
  );
}

export { FieldError };
