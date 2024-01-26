import { BiEdit } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
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
  margin: 3rem 0;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin: 1.6rem 0 2rem 0;
  }
`;
export const Categorys = styled.div`
  display: flex;
  gap: 0.6rem;
  /* margin-bottom: 1.8rem; */
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
    /* display: none; */ //검색창 잇을떄
    margin-top: 1.5rem;
    font-size: var(--fontSize-H6);
    background-color: transparent;
    width: 5rem;
  }
`;
export const WriteIcon = styled(BiEdit)`
  color: var(--opc-100);
  width: 1.5rem;
  height: 1.5rem;
`;
export const WriteBtn2 = styled.button`
  display: none;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
    background-color: transparent;
    height: 3.1rem;
    color: var(--12-gray);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2.4rem;
    font-family: 'Pretendard-Medium';
    cursor: pointer;
  }
`;
export const Title = styled.h2`
  color: var(--12-gray);
  font-size: var(--fontSize-H3);
  font-weight: var(--fontWeight-regular);
  margin-top: 4rem;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
  }
`;
export const CategoryBtn = styled.button<{ $selectCategory: string }>`
  border: none;
  height: 3rem;
  width: fit-content;
  padding: 0 1.5rem;
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
    padding: 0 0.8rem;
    font-size: 1rem;
    height: 2rem;
  }
`;
export const EditDropdown = styled.div`
  display: block;
  position: absolute;
  background-color: #1f1f1f;
  border: 1px solid var(--opc-100);
  z-index: 1000;
  border-radius: 1rem;
  top: 32rem;
  right: 5%;
  @media screen and (max-width: 768px) {
    top: 26rem;
    right: 5%;
  }
`;

export const DropdownItem = styled.div`
  display: block;
  padding: 12px 12px;
  font-size: var(--fontSize-H6);
  cursor: pointer;
`;
export const DropIcon = styled(IoIosArrowDown)`
  color: var(--opc-100);
  font-size: var(--fontSize-H4);
`;
export const SearchBar = styled.input`
  border: none;
  border-radius: 1.9rem;
  height: 3.6rem;
  font-family: 'Pretendard-Medium';
  padding-left: 1.6rem;
  background-color: var(--3-gray);
  width: 31.6rem;
  margin-right: 1.2rem;

  @media screen and (max-width: 768px) {
    height: 2.8rem;
    width: 16.4rem;
  }
`;
export const Topper2 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.4rem;
  font-size: var(--fontSize-H5);
  color: var(--7-gray);
  font-family: 'Pretendard-Medium';
  justify-content: space-between;
  white-space: nowrap;
  & div {
    display: flex;
  }
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
  }
`;
export const SortBar = styled.div`
  display: flex;
  align-items: center;
`;
