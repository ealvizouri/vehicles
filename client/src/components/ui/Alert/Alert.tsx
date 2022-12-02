import { FC } from 'react';
import alertVariants from './alertVariants';



export type AlertType = {
  title: string,
  description: string,
  variant: string,
  className?: string
}

const Alert: FC<AlertType> = ({ title, description, variant, className }) => (
  <div className={`${alertVariants.get(variant)} ${className}`} role="alert">
    <p className="font-bold">{title}</p>
    <p>{description}</p>
  </div>
);

export default Alert;