import { BiEdit } from "react-icons/bi";
import styled from "styled-components";

export const EntireContainer = styled.div`
  width: 144rem;
  display: flex;
  margin: auto;
  margin-bottom: 15rem;
`
export const ContentsContainer = styled.div`
  width: 111.6rem;
  margin: auto;
`

export const Title = styled.h1`
  font-size: var(--fontSize-H3);
  margin: 4rem 0 2.6rem 0;
`

export const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3rem;
`
export const WriteBtn = styled.div`
  width: 8.5rem;
  height: 3.1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 7rem;
  gap: 0.8rem;
  background-color: var(--opc-10);
  &:hover {
    cursor: pointer;
  }
`

export const WriteIcon = styled(BiEdit)`
  color: #dbff00;
  width: 1.5rem;
  height: 1.5rem;
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 0.9rem;
`

export const Tags = styled.li`
  width: fit-content;
  padding: 0 1.5rem;
  text-align: center;
  line-height: 2;
  border-radius: 5.6rem;
  background-color: var(--opc-10);
  &:hover {
    cursor: pointer;
  }
  // 배경색 조건부 렌더링
`

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`

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
`

// 목록 정렬바 스타일링

export const ProductsListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 1.9rem;
  row-gap: 4rem;
`

export const ProductsCardContainer = styled.div`
  width: 20.8rem;
  height: 31.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  border-radius: 0.6rem;
  &:hover {
    cursor: pointer;
  }
`

export const CardImageWrapper = styled.div`
  width: 20.8rem;
  height: 20.8rem;
  margin-bottom: 2rem;
  border-radius: 0.6rem;
`

export const CardImage = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  border-radius: 0.6rem;
`

export const CardQuality = styled.li`
  width: fit-content;
  padding: 0 0.7rem;
  text-align: center;
  line-height: 2;
  border-radius: 0.4rem;
  background-color: var(--opc-20);
  color: var(--10-gray);
  margin-bottom: 0.6rem;
`
export const CardTitle = styled.h2`
  margin-bottom: 0.4rem;
`

export const CardPrice = styled.h2`
  font-weight: var(--fontWeight-bold);
  columns: var(--12-gray);
`