import { BiEdit } from 'react-icons/bi';
import { GoChevronLeft } from 'react-icons/go';
import { GoChevronRight } from 'react-icons/go';
import { BiWon } from 'react-icons/bi';
import styled, { css } from 'styled-components';
import { StFadeAni } from "../../pages/productsDetail/style";

// ProductsList(page)
export const EntireContainer = styled.div`
  max-width: 144rem;
  display: flex;
  margin: auto;
  animation: ${StFadeAni} 0.3s ease;
  @media screen and (max-width: 768px) {
    max-width: 76.8rem;
    min-width: 30rem;
    padding: 0;
  }
`;
export const ContentsContainer = styled.div`
  width: 77.5%;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 93%;
  }
`;
export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3.5rem 0 1rem 0;
  @media screen and (max-width: 768px) {  
    margin: 1.5rem 0 1rem 0;
  }
`;
export const Title = styled.h1`
  font-size: var(--fontSize-H3);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-body);
  }
`;

export const BarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 0.9rem;
  @media screen and (max-width: 768px) {
    gap: 0.6rem;
    overflow-x: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none; /* Chrome , Safari , Opera */
    }
    // 비-웹킷 브라우저용 스크롤바 숨김
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface CategoryProps {
  $selectCategory: string[];
}

export const Category = styled.p<CategoryProps>`
  width: fit-content;
  padding: 0 2.5rem;
  text-align: center;
  vertical-align: middle;
  line-height: 1.5;
  border-radius: 5.6rem;
  color: var(--gray);
  background-color: var(--opc-30);
  white-space: nowrap;
  &:hover {
    cursor: pointer;
    background-color: var(--opc-100);
    color: var(--white);
  }
  // 배경색 조건부 렌더링
  ${(props) => {
    if (props.$selectCategory.length === 1 && props.$selectCategory.includes(props.children as string)) {
      return css`
        background-color: var(--opc-100);
        color: var(--white);
      `;
    }
    if (props.children === '전체') {
      return css`
        font-weight: var(--fontWeight-bold);
        background-color: transparent;
        border: 0.1rem solid var(--opc-100);
        color: var(--black);
      `;
    }
  }}
  /* @media screen and (max-width: 860px) {
    font-size: var(--fontSize-H5);
    padding: 0 1.3rem;
  } */
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
    line-height: 1.5;
    padding: 0 1.5rem;
  }
`;

export const SellWriteIcon = styled(BiWon)`
  color: var(--opc-100);
  width: 2rem;
  height: 2rem;
  @media screen and (max-width: 768px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
export const PostsWriteBtn = styled.div`
  width: 11rem;
  height: fit-content;
  line-height: 1.8;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5rem;
  gap: 0.5rem;
  background-color: var(--opc-20);
  white-space: nowrap;
  &:hover {
    cursor: pointer;
    background-color: var(--opc-100);
    color: var(--white);
    ${SellWriteIcon} {
      color: var(--white);
    }
  }
  @media screen and (max-width: 768px) {
    width: 9rem;
    height: 3rem;
    gap: 0.5rem;
    font-size: var(--fontSize-H5);
  }
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2.4rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 1.6rem;
  }
`;

// ProductsSearchBar
export const SearchBarInput = styled.input`
  width: 31.6rem;
  height: 3.4rem;
  background-color: var(--3-gray);
  font-size: var(--fontSize-H6);
  border: none;
  border-radius: 1.9rem;
  color: var(--8-gray);
  padding-left: 2rem;
  &::placeholder {
    color: var(--6-gray);
  }
`;

// ProductsSortBtn
// 목록 정렬바 스타일링 해야함

// ProductsList(components)
export const ProductsListContainer = styled.div`
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
    column-gap: 1rem;
    row-gap: 1.3rem;
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 670px) {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 1rem;
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
    transform: scale(1.02);
  }
  @media screen and (max-width: 768px) {
    padding: 1rem;
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
export const PageNumberStyle = styled.div`
  text-align: center;
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  gap: 5.6rem;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    margin-top: 4rem;
    gap: 2.6rem;
  }
`;
export const PrevNextButton = styled.button`
  background-color: transparent;
  border: none;
`;
export const PrevIcon = styled(GoChevronLeft)`
  width: 100%;
  height: 100%;
  color: var(--opc-100);
`;
export const NextIcon = styled(GoChevronRight)`
  width: 100%;
  height: 100%;
  color: var(--opc-100);
`;
interface PageBtnProps {
  $currentPage: number;
  pageNumber: number;
}
export const PageButton = styled.button<PageBtnProps>`
  background-color: transparent;
  border: none;
  color: ${(props) =>
    props.$currentPage === props.pageNumber
      ? 'var(--opc-100)'
      : 'var(--11-gray)'};
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
  }
`;
export const LoadingStyle = styled.div`
  text-align: center;
  font-size: var(--fontSize-H3);
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
`
export const SoldOut = styled.div`
  color: var(--white);
  background-color: var(--black);
  width: 100%;
  max-height: 5rem;
  //border-radius: 0.5rem;
  margin: auto;
  text-align: center;
  line-height: 2;
  font-size: var(--fontSize-H2);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
    width: 100%;
    line-height: 2.5;
  }
`
export const LikesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const Likes = styled.div`
  color: #ceb1b1;
  font-size: var(--fontSize-H6);
`