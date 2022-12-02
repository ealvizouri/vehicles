import styled from 'styled-components';

const ModalConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .content {
    flex-basis: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 5px 10px;
  }
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default ModalConfirmContainer;
