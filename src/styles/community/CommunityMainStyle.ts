import { BiEdit } from 'react-icons/bi';
import styled, { css } from 'styled-components';
export const Container = styled.div`
  /* margin-top: 30px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
`;
export const Post_container = styled.div`
  max-width: 111.6rem;
  width: 90%;
  margin-bottom: 5rem;
`;

export const FeatureBar = styled.div`
  display: flex;
  margin: 1.8rem 0;
  justify-content: space-between;

  & input {
    border: 0.1rem solid #bdbdbd;
    border-radius: 1.9rem;
    height: 3.6rem;
    width: 3.8rem;
    padding-left: 1.6rem;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const Categorys = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.8rem;
  white-space: nowrap;
`;
export const WriteBtn = styled.button`
  width: 9rem;
  height: 3.1rem;
  color: var(--12-gray);
  background-color: var(--opc-10);
  border: none;
  font-size: var(--fontSize-H5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.4rem;
  font-family: 'Pretendard-Medium';
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
    background-color: transparent;
    width: 5rem; // 검색 추가하면 없애기
  }
`;
export const WriteIcon = styled(BiEdit)`
  color: var(--opc-100);
  width: 1.5rem;
  height: 1.5rem;
`;
export const Title = styled.h2`
  color: var(--12-gray);
  font-size: var(--fontSize-body);
  margin-bottom: 2.4rem;
  margin: 2.4rem 0rem;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
  }
`;
export const CategoryBtn = styled.button<{ $selectCategory: string }>`
  border: none;
  height: 3rem;
  width: fit-content;
  padding: 0 0.8rem;
  border-radius: 5.6rem;
  font-family: 'Pretendard-Medium';
  cursor: pointer;
  ${(props) => {
    if (props.$selectCategory === props.children) {
      return css`
        background-color: var(--opc-100);
        font-weight: var(--fontWeight-bold);
      `;
    }
    if (props.children === '전체') {
      return css`
        background-color: var(--opc-10);
        border: 0.1rem solid #dbff00;
        color: var(--12-gray);
      `;
    }

    return css`
      background-color: var(--opc-10);
      color: var(--6-gray);
      font-weight: var(--fontWeight-medium);
    `;
  }}
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    height: 2rem;
  }
`;
