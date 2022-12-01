import { FC, ButtonHTMLAttributes } from 'react';
import buttonVariants from './buttonVariants';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'link'
}

const Button: FC<ButtonProps> = ({ variant = 'primary', children, ...props}) => {

  return (
    <button
      className={buttonVariants.get(variant)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;