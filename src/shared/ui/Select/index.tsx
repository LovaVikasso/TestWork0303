import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type Option<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
};

export const Select = <T extends string | number>({
  options,
  value,
  onChange,
  label,
  className = '',
  disabled = false,
}: Props<T>) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <select
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={String(option.value)} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
