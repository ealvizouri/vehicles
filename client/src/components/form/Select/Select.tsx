import { FC, InputHTMLAttributes } from 'react';
import { useField } from 'react-final-form';
import FormItem from '../FormItem';

export type SelectOption = {
  text: string,
  value: string | number
}

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string,
  name: string,
  options: SelectOption[],
  error?: string,
  className?: string
}

 const Input: FC<InputProps> = ({ label, name, className, options, ...props }) => {
  const { input, meta } = useField(name);
  return (
    <FormItem label={label} name={name} error={meta.touched && meta.error}>
      <select
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        {...props}
        {...input}
      >
        {options.map(item => (
          <option value={item.value}>{item.text}</option>
        ))}
      </select>
    </FormItem>
  );
}

export default Input;
