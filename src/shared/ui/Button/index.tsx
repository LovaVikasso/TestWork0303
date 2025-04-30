import {
  ComponentPropsWithoutRef,
  ComponentRef,
  ElementType,
  ForwardedRef,
  ReactElement,
} from 'react';
import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | "outlined" | "outline-primary";

type InferType<T> = T extends ElementType<infer U> ? U : never;

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T;
  fullWidth?: boolean;
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<T>;

const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T>,
  ref: ForwardedRef<InferType<T>>
) => {
  const {
    as: Component = 'button',
    children,
    className,
    fullWidth = false,
    variant = 'primary',
    ...rest
  } = props;

  const buttonClasses = classNames(
    'btn',
    {
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'w-100': fullWidth,
    },
    className
  );

  return (
    <Component ref={ref} className={buttonClasses} {...rest}>
      {children}
    </Component>
  );
};

/** Accepts all props of the native button element. */
export default Button as <T extends ElementType = 'button'>(
  props: ButtonProps<T> & {
    ref?: ForwardedRef<ComponentRef<T>>;
  }
) => ReactElement;
