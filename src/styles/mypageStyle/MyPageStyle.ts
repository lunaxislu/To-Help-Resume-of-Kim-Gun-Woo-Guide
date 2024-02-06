import styled from 'styled-components';
import { StFadeAni } from '../../pages/productsDetail/style';

export const MyPageContainer = styled.div`
  position: relative;
  width: 77.5%;
  margin: 0 auto;
  padding: 5rem 2rem;
  animation: ${StFadeAni} 0.6s forwards;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 2rem;
  }
`;
