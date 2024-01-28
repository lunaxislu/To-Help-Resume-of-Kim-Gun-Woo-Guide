import { BiEdit } from 'react-icons/bi';
import { GoChevronLeft } from 'react-icons/go';
import { GoChevronRight } from 'react-icons/go';
import { BiWon } from 'react-icons/bi';
import styled, { css } from 'styled-components';

// ProductsList(page)
export const EntireContainer = styled.div`
  max-width: 144rem;
  display: flex;
  margin: auto;
  @media screen and (max-width: 768px) {
    max-width: 76.8rem;
    min-width: 30rem;
    padding: 0;
  }
`;
export const ContentsContainer = styled.div`
  max-width: 111.6rem;
  margin: auto;
  @media screen and (max-width: 1180px) {
    max-width: 93%;
  }
`;

export const Title = styled.h1`
  font-size: var(--fontSize-H3);
  margin: 4rem 0 2.6rem 0;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-body);
    margin: 2rem 0 1.4rem 0;
  }
`;

export const BarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  width: 100%;
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
  }
`;

interface CategoryProps {
  $selectCategory: string[];
}

export const Category = styled.p<CategoryProps>`
  width: fit-content;
  padding: 0 1.5rem;
  text-align: center;
  vertical-align: middle;
  line-height: 1.8;
  border-radius: 5.6rem;
  color: var(--6-gray);
  background-color: var(--opc-10);
  white-space: nowrap;
  &:hover {
    cursor: pointer;
    background-color: var(--opc-100);
    font-weight: var(--fontWeight-bold);
    color: var(--1-gray);
  }
  // 배경색 조건부 렌더링
  ${(props) => {
    if (props.$selectCategory.length === 1 && props.$selectCategory.includes(props.children as string)) {
      return css`
        background-color: var(--opc-100);
        font-weight: var(--fontWeight-bold);
        color: var(--1-gray);
      `;
    }
    if (props.children === '전체') {
      return css`
        background-color: transparent;
        border: 0.1rem solid var(--opc-100);
        color: var(--12-gray);
      `;
    }
  }}
  @media screen and (max-width: 820px) {
    font-size: var(--fontSize-H5);
    padding: 0 1.3rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    padding: 0 0.8rem;
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
  line-height: 175%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 7rem;
  gap: 0.5rem;
  background-color: var(--opc-20);
  white-space: nowrap;
  &:hover {
    cursor: pointer;
    background-color: var(--opc-100);
    font-weight: var(--fontWeight-bold);
    color: var(--1-gray);
    ${SellWriteIcon} {
      color: var(--2-gray);
    }
  }
  @media screen and (max-width: 930px) {
    display: none;
  }
`;
export const MobilePostsWriteBtn = styled.div`
  display: none;
  @media screen and (max-width: 930px) {
    margin: 4rem 0 2.6rem 0;
    width: 9.5rem;
    height: fit-content;
    line-height: 1.8;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 7rem;
    gap: 0.5rem;
    background-color: var(--opc-20);
    white-space: nowrap;
    &:hover {
      cursor: pointer;
      background-color: var(--opc-100);
      font-weight: var(--fontWeight-bold);
      color: var(--1-gray);
      ${SellWriteIcon} {
      color: var(--2-gray);
    }
    }
  }
  @media screen and (max-width: 768px) {
    width: 8.1rem;
    height: 2rem;
    border-radius: 5.6rem;
    gap: 0.5rem;
    font-size: var(--fontSize-H5);
    background-color: transparent;
    margin: 1.8rem 0 1.4rem 0;
  }
  @media screen and (max-width: 768px) {
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
  column-gap: 1.9rem;
  row-gap: 4rem;
  @media screen and (max-width: 1220px) {
    row-gap: 3rem;
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 950px) {
    row-gap: 2.5rem;
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    column-gap: 1.5rem;
    row-gap: 1.8rem;
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 670px) {
    grid-template-columns: repeat(3, 1fr);
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
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  margin-bottom: 2rem;
  border-radius: 0.6rem;
  position: relative;
  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const CardImage = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.6rem;
`;

export const CardQuality = styled.li`
  width: fit-content;
  padding: 0 0.7rem;
  text-align: center;
  line-height: 2;
  border-radius: 0.4rem;
  background-color: var(--opc-20);
  color: var(--10-gray);
  margin-bottom: 0.6rem;
  @media screen and (max-width: 768px) {
    padding: 0 0.5rem;
    font-size: 0.8rem;
    line-height: 2.1;
    background-color: rgba(219, 255, 0, 0.8);
    color: var(--2-gray);
  }
`;
export const CardTitle = styled.h2`
  width: 100%;
  margin-bottom: 0.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
  line-height: 1.3;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
  }
`;

export const CardPrice = styled.h2`
  font-weight: var(--fontWeight-bold);
  color: var(--12-gray);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
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
  height: 100%;
  position: absolute;
  display: flex;
  opacity: 90%;
  background-color: var(--2-gray);
  border-radius: 0.6rem;
`
export const SoldOut = styled.div`
  background-color: var(--opc-90);
  width: 50%;
  max-height: 5rem;
  border-radius: 0.5rem;
  margin: auto;
  text-align: center;
  line-height: 2.5;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    width: 40%;
    line-height: 2.5;
  }
`