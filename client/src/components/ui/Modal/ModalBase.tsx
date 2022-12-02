import { useEffect, FC, ReactNode } from 'react';
import ModalBaseContainer from './ModalBaseContainer';

interface ModalBaseProps {
  id: string;
  open: boolean;
  size: string;
  close: Function;
  children: ReactNode;
}

const ModalBase: FC<ModalBaseProps> = ({ id, open, size, close, children }) => {
  useEffect(() => {
    const findClosest = (e: any) => {
      if (!e.target.closest(`#${id}, button[data-modal-button]`)) {
        close();
      }
    }
    document.addEventListener('click', findClosest);
    return () => {
      document.removeEventListener('click', findClosest);
    }
  }, [id, close]);
  return (
    <ModalBaseContainer open={open} size={size}>
      {open ?<div id={id} className="modal">
        {children}
      </div> : null}
    </ModalBaseContainer>
  );
}

export default ModalBase;