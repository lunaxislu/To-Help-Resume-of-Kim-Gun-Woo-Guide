import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const UsedItemResultsContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  margin-bottom: 4rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const CountBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;
export const CountPost = styled.div`
  display: flex;
  width: 100%;
  font-size: var(--fontSize-H3);
  align-items: center;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    gap: 1rem;
    font-size: var(--fontSize-H5);
  }
`;

export const ProductsCount = styled.h1<{
  showClickedList: boolean;
}>`
  width: 10rem;
  cursor: pointer;
  font-weight: ${({ showClickedList }) =>
    !showClickedList ? 'var(--fontWeight-bold)' : 'var(--fontWeight-medium)'};
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const CommunityCount = styled.h1<{
  showClickedList: boolean;
}>`
  width: 10rem;
  cursor: pointer;
  font-weight: ${({ showClickedList }) =>
    showClickedList ? 'var(--fontWeight-bold)' : 'var(--fontWeight-medium)'};
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const CountList = styled.h1`
  display: flex;
  font-size: var(--fontSize-H3);
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
  }
`;
export const LinktoUsedProducts = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8.3rem;
  height: 3.2rem;
  text-decoration: none;

  cursor: pointer;
  font-weight: var(--fontWeight-bold);
  gap: 0.8rem;
  background: var(--opc-20);
  border-radius: 4.5rem;
  font-size: var(--fontSize-H6);
  font-weight: var(--fontWeight-medium);
  color: var(--11-gray);
  @media screen and (max-width: 768px) {
    background: none;
    width: 6rem;
    font-size: 1.1rem;
    gap: 0.3rem;
  }
  &:hover {
    background-color: #83ad2e;
    color: #101d1c;
  }
  svg {
    width: 1rem;
    height: 0.9rem;
    @media screen and (max-width: 768px) {
      width: 1rem;
      height: 0.9rem;
      color: var(--opc-100);
    }
  }
`;
export const UsedItemsList = styled.ul<{
  usedItemCount: number;
  showClickedList: boolean;
}>`
  width: 100%;

  max-height: 100vh;
  display: grid;
  margin: auto;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 2rem;
  row-gap: 1.5rem;
  column-gap: 1.8rem;
  align-items: flex-start;
  justify-content: center;
  place-items: center;
  margin-top: 2rem;

  @media screen and (max-width: 1160px) {
    grid-template-columns: repeat(4, 1fr);
    margin-top: ${({ usedItemCount }) =>
      usedItemCount !== 0 ? '5rem' : '2rem'};
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    margin-top: ${({ usedItemCount }) => (usedItemCount !== 0 ? '5rem' : '')};
  }

  @media screen and (max-width: 768px) {
    column-gap: 1.5rem;
    row-gap: 1.8rem;
    grid-template-columns: repeat(3, 1fr);
    margin-top: ${({ usedItemCount }) => (usedItemCount !== 0 ? '3rem' : '')};
  }
  @media screen and (max-width: 670px) {
    column-gap: 1.5rem;
    row-gap: 1.8rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: ${({ usedItemCount }) => (usedItemCount !== 0 ? '2rem' : '')};
  }
  @media screen and (max-width: 520px) {
    row-gap: 1.8rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: ${({ usedItemCount }) => (usedItemCount !== 0 ? '2rem' : '')};
  }

  @media screen and (max-width: 349px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top: ${({ usedItemCount }) => (usedItemCount !== 0 ? '2rem' : '')};
  }
`;
export const ToProductsPage = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: var(--11-gray);
`;
export const ProductList = styled.li`
  width: 20.8rem;
  /* height: 31.5rem; */
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 520px) {
    width: 100%;
  }
  div {
    width: 20.8rem;
    height: 20.8rem;
    object-fit: cover;
    justify-content: center;
    border-radius: 0.6rem;
    @media screen and (max-width: 768px) {
      width: 14rem;
      height: 14rem;
      margin-bottom: 1rem;
    }
  }

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    border-radius: 0.6rem;
    border-style: none;
    @media screen and (max-width: 768px) {
      width: 14rem;
      height: 14rem;
      border-radius: 0.6rem;
    }
  }

  h3 {
    font-size: var(--fontSize-body);
    color: var(--11-gray);
    margin-top: 1rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
    overflow: hidden;
    height: 2.5rem;
    white-space: wrap;
    text-overflow: ellipsis;
    line-height: 1.5;
    @media screen and (max-width: 768px) {
      width: 14rem;
      height: 2rem;
      margin-top: 0.6rem;
      color: var(--11-gray, #f8f8f8);
      font-weight: var(--fontWeight-medium);
      font-size: var(--fontSize-H5);
    }
  }

  p {
    font-size: var(--fontSize-body);
    font-weight: var(--fontWeight-bold);
    color: var(--11-gray);
    margin-top: 1rem;
    text-align: left;
    @media screen and (max-width: 768px) {
      height: 2.3rem;
      font-weight: var(--fontWeight-bold);
      font-size: var(--fontSize-H5);
    }
  }
`;

export interface QualityProps {
  $quality: string;
}

export const ProductsCardQuality = styled.h1<QualityProps>`
  width: 9rem;
  padding: 0 0.8rem;
  text-align: center;
  line-height: 1.7;
  border-radius: 0.3rem;
  margin-top: 1rem;
  background-color: #fcfcfc;

  color: var(--2-gray);
  margin-bottom: 0.6rem;
  font-size: var(--fontSize-H6);
  // 배경색 조건부 렌더링
  ${(props) => {
    if (props.children === '새상품(미사용)') {
      return css`
        background-color: var(--opc-100);
        color: var(--2-gray);
      `;
    }
    if (props.children === '고장/파손 상품') {
      return css`
        background-color: var(--4-gray);
        color: var(--11-gray);
      `;
    }
  }}
  @media screen and (max-width: 768px) {
    margin-top: 1rem;
    width: 8rem;
    height: 2rem;
    font-size: 1rem;
    font-weight: 500;
    line-height: 191.2%;
    text-align: center;
  }
`;
