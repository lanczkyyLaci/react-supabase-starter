import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const inputVariants = cva(
  'input-field w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      size: {
        default: 'h-9',
        xs: 'h-7 text-xs px-2',
        sm: 'h-8 text-sm px-2',
        lg: 'h-10',
        xl: 'h-11',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const iconSizeMap: Record<string, string> = {
  xs: "[&_svg:not([class*='size-'])]:size-3",
  sm: "[&_svg:not([class*='size-'])]:size-3.5",
  default: "[&_svg:not([class*='size-'])]:size-4",
  lg: "[&_svg:not([class*='size-'])]:size-[18px]",
  xl: "[&_svg:not([class*='size-'])]:size-5",
};

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };

function Input({ className, type, size, startIcon, endIcon, ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === 'password';

  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const passwordToggle = isPassword ? (
    <button
      type="button"
      tabIndex={-1}
      onClick={() => setShowPassword((v) => !v)}
      className="pointer-events-auto cursor-pointer"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  ) : null;

  const resolvedEndIcon = passwordToggle ?? endIcon;

  if (startIcon || resolvedEndIcon) {
    return (
      <div className="relative">
        {startIcon && (
          <span
            className={cn(
              'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted-foreground',
              iconSizeMap[size ?? 'default'],
            )}
          >
            {startIcon}
          </span>
        )}
        <input
          type={resolvedType}
          data-slot="input"
          className={cn(
            inputVariants({ size }),
            startIcon && 'pl-8',
            resolvedEndIcon && 'pr-8',
            className,
          )}
          {...props}
        />
        {resolvedEndIcon && (
          <span
            className={cn(
              'absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground',
              iconSizeMap[size ?? 'default'],
            )}
          >
            {resolvedEndIcon}
          </span>
        )}
      </div>
    );
  }

  return (
    <input
      type={resolvedType}
      data-slot="input"
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
export type { InputProps };
