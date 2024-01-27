import styled from 'styled-components';

const StProductRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StRowLabel = styled.div`
  width: 150px;
  font-family: 'Pretendard-Medium';
  color: #878787;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    width: 120px;
  }
`;

const StModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #1d1d1d50;
  z-index: 100;
`;

const StMapModal = styled.div`
  position: absolute;
  width: 100%;
  height: 300px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    width: 100%;
    max-width: 768px;
    top: 55%;
  }
`;

export { StProductRow, StRowLabel, StModalBackDrop, StMapModal };
