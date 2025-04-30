import {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  ReactElement,
} from 'react';
import classNames from 'classnames';

export type InputVariant = 'default' | 'success' | 'error';

export type InputProps<T extends ElementType = 'input'> = {
  as?: T;
  variant?: InputVariant;
  label?: string;
  error?: string;
  fullWidth?: boolean;
} & ComponentPropsWithoutRef<T>;

const Input = <T extends ElementType = 'input'>(
  props: InputProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const {
    as: Component = 'input',
    className,
    variant = 'default',
    label,
    error,
    fullWidth = false,
    ...rest
  } = props;

  const inputClasses = classNames(
    'form-control',
    {
      'is-valid': variant === 'success',
      'is-invalid': variant === 'error',
      'w-100': fullWidth,
    },
    className
  );

  return (
    <div className={classNames('mb-3', { 'w-100': fullWidth })}>
      {label && <label className="form-label">{label}</label>}
      <Component ref={ref} className={inputClasses} {...rest} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Input as <T extends ElementType = 'input'>(
  props: InputProps<T> & {
    ref?: ForwardedRef<HTMLInputElement>;
  }
) => ReactElement;
