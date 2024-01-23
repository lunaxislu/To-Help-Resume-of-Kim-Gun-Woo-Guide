import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StCardContainer = styled.div`
  width: 111.6rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 2rem auto;

  @media screen and (max-width: 1024px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const StCardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 20.8rem;
  height: 31.5rem;
  gap: 0.5rem;
  text-decoration: none;
  cursor: pointer;
  color: var(--11-gray);

  &:link {
    text-decoration: none;
  }
  &:visited {
    text-decoration: none;
  }
`;

export const StProductQuality = styled.p`
  width: 10rem;
  text-align: center;
  display: block;
  color: var(--9-gray);
  background: var(--opc-20);
  border-radius: 0.4rem;
  padding: 0.7rem 1rem;
  font-size: var(--fontSize-H6);
  margin-top: 1rem;
`;

export const StProductImage = styled.img`
  object-fit: cover;
  width: 20.8rem;
  height: 20.8rem;
  border-style: none;
  border-radius: 0.6rem;
`;

export const StProductTitle = styled.p`
  margin-top: 1rem;
`;

export const StProductPrice = styled.p`
  font-weight: bold;
  margin-top: 1rem;
`;
