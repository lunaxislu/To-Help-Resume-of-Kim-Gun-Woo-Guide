import styled from 'styled-components';
import { StFadeAni } from '../../pages/productsDetail/style';

export const MyPageContainer = styled.div`
  position: relative;
  width: 111.6rem;
  margin: 0 auto;
  padding: 5rem 0;
  animation: ${StFadeAni} 0.6s forwards;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;
