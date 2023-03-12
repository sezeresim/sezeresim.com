export enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
}

export type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<'button'>;
