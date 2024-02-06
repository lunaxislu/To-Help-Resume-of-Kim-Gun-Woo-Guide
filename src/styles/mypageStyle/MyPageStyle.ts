import styled from 'styled-components';
import { StFadeAni } from '../../pages/productsDetail/style';

export const MyPageContainer = styled.div`
  position: relative;
  width: 77.5%;
  margin: 0 auto;
  animation: ${StFadeAni} 0.6s forwards;

  @media screen and (max-width: 768px) {
    width: 93%;
    margin: 2rem;
  }
`;
