import { FC, InputHTMLAttributes } from 'react';
import { useField } from 'react-final-form';
import FormItem from '../FormItem';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  name: string,
  error?: string,
  className?: string
}

 const Input: FC<InputProps> = ({ label, name, className, ...props }) => {
  const { input, meta } = useField(name);
  return (
    <FormItem label={label} name={name} error={meta.touched && meta.error}>
      <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`} {...props} {...input} />
    </FormItem>
  );
}

export default Input;