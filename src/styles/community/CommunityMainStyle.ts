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
  width: 80%;
  margin-bottom: 5rem;
`;

export const FeatureBar = styled.div`
  display: flex;
  margin: 1rem 0 3rem 0;
  & input {
    border: 0.1rem solid #bdbdbd;
    border-radius: 1.9rem;
    height: 3.6rem;
    width: 3.8rem;
    padding-left: 1.6rem;
  }
`;
export const Categorys = styled.div`
  display: flex;
  width: 100%;
  gap: 0.6rem;
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
  cursor: pointer;
`;
export const WriteIcon = styled(BiEdit)`
  color: var(--opc-100);
  width: 1.5rem;
  height: 1.5rem;
`;
export const Title = styled.h2`
  color: white;
  font-size: var(--fontSize-H3);
  margin-bottom: 2.4rem;
  margin: 2.4rem 0rem;
`;
export const CategoryBtn = styled.button<{ $selectCategory: string }>`
  border: none;
  height: 3rem;
  width: 5.6rem;
  border-radius: 5.6rem;
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
    `;
  }}
`;
