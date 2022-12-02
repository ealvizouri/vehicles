import { FC, ReactNode, MouseEventHandler } from 'react';
import ModalBase from './ModalBase';
import ModalConfirmContainer from './ModalConfirmContainer';
import Button from 'components/ui/Button';

interface ModalConfirmProps {
  id: string;
  open: boolean;
  size?: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const ModalConfirm: FC<ModalConfirmProps> = ({ id, open, onConfirm, onCancel, size = 'sm', children }) => (
  <ModalBase id={id} open={open} size={size} close={onCancel}>
    <ModalConfirmContainer>
      <div className="content">
      {children}
      </div>
      <div className="buttons">
        <Button variant="danger" onClick={onConfirm}>Confirm</Button>
        <Button
          className="ml-3"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </ModalConfirmContainer>
  </ModalBase>
);

export default ModalConfirm;