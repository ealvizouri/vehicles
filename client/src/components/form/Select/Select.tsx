import { useCallback, FC, InputHTMLAttributes, ChangeEvent } from 'react';
import { useField } from 'react-final-form';
import FormItem from '../FormItem';

export type SelectOption = {
  [x: string]: string | number
}

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string,
  name: string,
  options: SelectOption[],
  placeholder?: string,
  error?: string,
  className?: string,
  textKey?: string,
  valueKey?: string,
}

 const Input: FC<InputProps> = ({
    textKey = 'text',
    valueKey = 'value',
    label,
    name,
    className,
    options,
    placeholder,
    ...props
  }) => {
  const { input, meta } = useField(name);
  const onChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    if (props.onChange) {
      props.onChange(e);
    }
    input.onChange(e);
  }, [props, input]);
  return (
    <FormItem label={label} name={name} error={meta.touched && (meta.error || meta.submitError)}>
      <select
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        {...props}
        {...input}
        onChange={onChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((item) => (
          <option key={item[valueKey]} value={item[valueKey]}>{item[textKey]}</option>
        ))}
      </select>
    </FormItem>
  );
}

export default Input;
