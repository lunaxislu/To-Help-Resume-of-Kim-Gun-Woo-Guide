import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StCardContainer = styled.div`
  width: 111.6rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 2rem auto;

  @media screen and (max-width: 1024px) {
    padding: 0 1.5rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-height: 100%;
  }
`;

export const StCardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: auto;
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

  @media screen and (max-width: 768px) {
    flex: 1 1 40%;
  }
`;

export const StProductQuality = styled.p<{ qualityColor: string }>`
  width: 10rem;
  text-align: center;
  display: block;
  color: ${(props) =>
    props.qualityColor === '고장/파손 상품'
      ? 'var(--11-gray)'
      : 'var(--2-gray)'};
  background: ${(props) =>
    (props.qualityColor === '새상품(미사용)' && 'var(--opc-100)') ||
    (props.qualityColor === '사용감 없음' && '#ECECEC') ||
    (props.qualityColor === '사용감 적음' && '#ECECEC') ||
    (props.qualityColor === '사용감 많음' && '#ECECEC') ||
    (props.qualityColor === '고장/파손 상품' && 'var(--4-gray)')};
  border-radius: 0.4rem;
  padding: 0.7rem 1rem;
  font-size: var(--fontSize-H6);
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
    background-color: var(--opc-100);
    color: var(--2-gray);
  }
`;

export const StProductImage = styled.img`
  object-fit: cover;
  width: 20.8rem;
  height: 20.8rem;
  border-style: none;
  border-radius: 0.6rem;

  @media screen and (max-width: 768px) {
    object-fit: cover;
    width: 100%;
    max-height: 100%;
  }
`;

export const StProductTitle = styled.p`
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
  }
`;

export const StProductPrice = styled.p`
  font-weight: bold;
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
  }
`;

export const StNothingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
