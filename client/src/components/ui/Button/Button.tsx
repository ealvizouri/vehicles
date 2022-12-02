import { FC, ButtonHTMLAttributes } from 'react';
import buttonVariants from './buttonVariants';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'link'
}

const Button: FC<ButtonProps> = ({ variant = 'primary', children, className, ...props}) => {

  return (
    <button
      className={`${buttonVariants.get(variant)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;