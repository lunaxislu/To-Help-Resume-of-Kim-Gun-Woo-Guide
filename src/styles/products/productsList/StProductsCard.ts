import styled, { css } from 'styled-components';

export const ProductsListContainer = styled.div`
  max-width: 111.6rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: auto;
  column-gap: 1.5rem;
  row-gap: 2rem;
  @media screen and (max-width: 1220px) {
    row-gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 950px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    column-gap: 1.3rem;
    row-gap: 1.5rem;
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 670px) {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 1.3rem;
  }
  @media screen and (max-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ProductsCardContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  border-radius: 0.6rem;
  transition: all 0.2s linear;
  background-color: var(--bgColor);
  border: 0.1rem solid #71717130;
  padding: 1.5rem;
  &:hover {
    cursor: pointer;
    transform: translateY(-0.8rem);
  }
  @media screen and (max-width: 768px) {
    padding: 1rem;
    &:hover {
    transform: translateY(-0.6rem);
  }
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  margin-bottom: 1rem;
  border-radius: 0.6rem;
  position: relative;
  @media screen and (max-width: 768px) {
    margin-bottom: 0.6rem;
  }
`;


export const CardImage = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.6rem;
`;

interface QualityProps {
  $quality: string;
}
export const CardQuality = styled.li<QualityProps>`
  width: fit-content;
  padding: 0 0.7rem;
  text-align: center;
  line-height: 1.3;
  border-radius: 0.4rem;
  background-color: var(--c-green);
  margin-bottom: 0.6rem;
  font-size: var(--fontSize-H6);
  // 배경색 조건부 렌더링
  ${(props) => {
    if (props.children === '사용감 있음') {
      return css`
        background-color: var(--c-yellow);
      `;
    }
    if (props.children === '사용감 많음') {
      return css`
        background-color: var(--c-red);
      `;
    }
  }}
  
  @media screen and (max-width: 768px) {
    padding: 0 0.5rem;
    font-size: 1rem;
    line-height: 2.1;
  }
`;

export const CardTitle = styled.h2`
  width: 100%;
  margin-bottom: 0.6rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
  line-height: 1.3;
  //font-weight: var(--fontWeight-bold);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
  }
`;

export const CardPrice = styled.h2`
  font-weight: var(--fontWeight-bold);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
  }
`;

export const IsSellProducts = styled.div`
  width: 100%;
  height: 97%;
  position: absolute;
  display: flex;
  opacity: 90%;
  border-radius: 0.6rem;
  //background-color: var(--black);
`;

export const SoldOut = styled.div`
  color: var(--white);
  background-color: var(--black);
  width: 100%;
  max-height: 5rem;
  margin: auto;
  text-align: center;
  line-height: 2;
  font-size: var(--fontSize-H2);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
    width: 100%;
    line-height: 2.5;
  }
`;

export const LikesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Likes = styled.div`
  color: #ceb1b1;
  font-size: var(--fontSize-H6);
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;