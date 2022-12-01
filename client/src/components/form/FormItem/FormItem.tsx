import React from 'react';

type FormItemProps = {
  label: string,
  name: string,
  error?: string,
  className?: string,
  children: React.ReactNode
}

const FormItem = ({ label, name, error, className, children }: FormItemProps) => {
  return (
    <div className={className}>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
        {children}
      </label>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}

export default FormItem;