import styled from 'styled-components';

export const StLoginContainer = styled.div`
  width: 400px;
  margin: 2rem auto;
  padding: 2rem 0;
  @media screen and (max-width: 768px) {
    width: 40rem;
  }
  @media screen and (max-width: 530px) {
    width: 35rem;
  }
`;

export const StLoginTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

export const StLoginText = styled.p`
  font-size: 18px;
  text-align: center;
  margin-bottom: 2rem;
`;
