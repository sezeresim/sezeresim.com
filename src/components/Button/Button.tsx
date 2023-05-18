import * as React from 'react';

import clsxm from '@/lib/clsxm';

export enum ButtonVariant {
  'primary',
  'cyan',
  'green',
  'teal',
  'blue',
  'red',
}

export type ButtonProps = {
  isLoading?: boolean;
  variant?: keyof typeof ButtonVariant;
  size?: 'small' | 'medium' | 'large';
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'medium',
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center px-4 py-2.5 rounded',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'shadow-sm',
          'duration-75 transition-colors',
          'font-medium text-center text-sm',
          [
            variant === 'cyan' && [
              'text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80',
            ],
            variant === 'green' && [
              'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80',
            ],
            variant === 'teal' && [
              'text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80',
            ],
            variant === 'blue' && [
              'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80',
            ],
            variant === 'red' && [
              'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80',
            ],
          ],
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent hover:text-transparent disabled:cursor-wait transition-none',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              '-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            loading
          </div>
        )}
        {children}
      </button>
    );
  }
);

export default Button;
