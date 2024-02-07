import styled, { css } from 'styled-components';

export const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
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
  height: 3rem;
  padding: 0 1.5rem;
  text-align: center;
  vertical-align: middle;
  line-height: 1.7;
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
    if (props.$selectCategory.length === 1 && 
      props.$selectCategory.includes(props.children as string)) {
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
  @media screen and (max-width: 768px) {
    height: 2.5rem;
    font-size: var(--fontSize-H5);
    line-height: 1.5;
    padding: 0 1.5rem;
  }
`;