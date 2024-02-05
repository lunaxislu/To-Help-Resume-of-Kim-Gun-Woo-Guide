import { MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const StModalContainer = styled.div`
  width: 60%;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 768px) {
    width: 90%;
    top: 55%;
    left: 50%;
  }
`;

const StButtonBox = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: var(--2-gray);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

const Buttons = styled.button`
  padding: 0.8rem 1.625rem;
  border-radius: 9px;
  outline: none;
  border: none;
  background-color: var(--3-gray);
  cursor: pointer;
  color: var(--opc-100);

  a {
    text-decoration: none;
    color: black;
  }

  &:hover {
    background-color: var(--opc-100);
    color: var(--3-gray);

    a {
      color: white;
    }
  }
`;

const StOverayBox = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0.4rem;
`;

const StInfoBox = styled(MapMarker)`
  width: fit-content;
  padding: 1rem;
`;

export { StModalContainer, StButtonBox, Buttons, StOverayBox, StInfoBox };
