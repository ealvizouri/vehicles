import { FC, InputHTMLAttributes } from 'react';
import { useField } from 'react-final-form';
import FormItem from '../FormItem';

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  name: string,
  error?: string,
  className?: string,
  onFileChange: Function
}

 const InputFile: FC<InputFileProps> = ({ label, name, className, onFileChange, ...props }) => {
  const { input, meta } = useField(name);
  return (
    <FormItem label={label} name={name} error={meta.touched && (meta.error || meta.submitError)}>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        {...props}
        type="file"
        {...input}
        onChange={(e) => {
          const { files } = e.target;
          onFileChange(files && files.length > 0 ? files[0] : null);
          input.onChange(e);
        }}
      />
    </FormItem>
  );
}

export default InputFile;