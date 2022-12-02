import styled from 'styled-components';

interface ModalBaseContainerProps {
  open: boolean;
  size: string;
}

const ModalBaseContainer = styled.div<ModalBaseContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2F2F2F1F;
  ${({ open }: { open: boolean }) => open ? '' : 'display: none;'}
  div.modal {
    border: 1px solid #8C8C8C;
    border-radius: 5px;
    padding: 10px;
    background-color: #FFF;
    ${({ size }: any) => {
      let s = {
        sm: [80, 40],
        md: [50, 50],
        lg: [50, 50]
      };
      switch(size) {
        case 'sm':
          s.sm = [80, 20];
          s.md = [20, 15];
          s.lg = [20, 15];
          break;
        case 'md':
          s.sm = [80, 30];
          s.md = [20, 15];
          s.lg = [20, 15];
          break;
        case 'lg':
        default:;
      }
      return `
        min-width: ${s.sm[0]}%;
        min-height: ${s.sm[1]}%;
        @media (min-width: 600px) {
          min-width: ${s.md[0]}%;
          min-height: ${s.md[1]}%;
        }
        @media (min-width: 1200px) {
          min-width: ${s.lg[0]}%;
          min-height: ${s.lg[1]}%;
        }
      `;
    }}
  }
`;

export default ModalBaseContainer;