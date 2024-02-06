import styled from 'styled-components';
import { StFadeAni } from '../chat/style';

const ListWrapper = styled.div`
  max-width: 144rem;
  width: 77.5;
  margin: auto;
  position: relative;
`;

const StProductsListContainer = styled.div`
  max-width: 144rem;
  width: 77.5%;
  display: flex;
  margin: auto;
  animation: ${StFadeAni} 0.3s ease;
  @media screen and (max-width: 768px) {
    max-width: 95%;
    min-width: 30rem;
    padding: 0;
  }
`;

const StListTitle = styled.h2`
  max-width: 144rem;
  width: 77.5%;
  margin-block: 2rem;
  font-size: 3rem;
  margin-left: 12%;

  span {
    margin-left: 0.6rem;
    font-size: 2rem;
  }

  @media screen and (max-width: 768px) {
    margin-left: 8%;
    padding: 0 1.2rem;
  }
`;

const StEndPoint = styled.div`
  color: black;
  font-size: 3rem;
  position: absolute;
  bottom: -5.25%;
  left: 50%;
  transform: translateX(-50%);

  @media screen and (max-width: 1023px) {
    bottom: -3%;
  }

  @media screen and (max-width: 768px) {
    font-size: 2rem;
    bottom: -2%;
  }
`;

export { ListWrapper, StProductsListContainer, StListTitle, StEndPoint };
