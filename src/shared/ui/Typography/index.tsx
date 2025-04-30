import { ReactNode, ElementType } from 'react';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'display-5'
  | 'display-6'
  | 'lead'
  | 'small'
  | 'text-muted'
  | 'text-primary'
  | 'text-secondary'
  | 'text-success'
  | 'text-danger'
  | 'text-warning'
  | 'text-info'
  | 'text-light'
  | 'text-dark'
  | 'text-start'
  | 'text-center'
  | 'text-end';

type Weight = 'fw-normal' | 'fw-bold' | 'fw-bolder' | 'fw-light' | 'fw-lighter';

type Props = {
  variant?: Variant;
  weight?: Weight;
  className?: string;
  children: ReactNode;
  as?: ElementType;
}

export const Typography = ({
  variant,
  weight,
  className = '',
  children,
  as: Component = 'p',
}: Props) => {
  const classes = [variant, weight, className].filter(Boolean).join(' ');

  return <Component className={classes}>{children}</Component>;
};
