import { AiFillAlert } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { IoTrashOutline } from 'react-icons/io5';
import { RiBallPenLine } from 'react-icons/ri';
import styled from 'styled-components';
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;
  line-height: 3rem;
  min-height: 60rem;
  color: var(--10-gray);
  font-size: var(--fontSize-body);
  font-weight: var(--fontWeight-medium);
  & img {
    max-width: 100%;
  }
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
    line-height: 2rem;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--12-gray);
  /* margin-bottom: 5rem; */
  & strong {
    font-weight: bold;
  }
  & em {
    font-style: italic;
  }
  & p {
    display: flex;
  }
`;
export const FeatureArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const ContentsContainer = styled.div`
  width: 90%;
  max-width: 111.6rem;
  min-height: 60rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const WriteWrap = styled.div`
  width: 90%;
  max-width: 100.6rem;
`;
export const BtnStyle = styled.button`
  border: none;
  background-color: transparent;
  font-size: var(--fontSize-H6);
  color: var(--8-gray);
  font-weight: var(--fontWeight-semiBold);
  margin: 0.5rem;
`;
export const Topper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 111.6rem;
  margin-bottom: 1rem;
`;
export const DetailBody = styled.div`
  border-bottom: 0.1rem solid var(--5-gray);
  margin-bottom: 2rem;
`;
export const IconContainer = styled.div`
  display: flex;
  justify-content: end;
  font-size: var(--fontSize-H5);
  align-items: center;
`;
export const Category = styled.p`
  /* margin-left: 1.5rem; */
  width: fit-content;
  padding: 0 0.6rem;
  height: 2.3rem;
  font-size: var(--fontSize-H6);
  color: var(--10-gray);
  background-color: var(--3-gray);
  border-radius: 5.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const MainTopper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
export const SubTopper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;
export const TitleCategory = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  & h1 {
    font-size: var(--fontSize-H3);
    font-weight: var(--fontWeight-semiBold);
    color: var(--12-gray);
  }
  & button {
    font-size: var(--fontSize-H1);
    background-color: transparent;
    border: none;
    color: var(--opc-100);
  }
  @media screen and (max-width: 768px) {
    & h1 {
      font-size: var(--fontSize-H5);
    }
    & button {
      font-size: var(--fontSize-H1);
      background-color: transparent;
      border: none;
      color: var(--opc-100);
    }
  }
`;
export const AlertIcon = styled(AiFillAlert)`
  color: var(--opc-50);
  margin-left: 1rem;
  font-size: 1.5rem;
`;
export const ReportArea = styled.div`
  display: flex;
  align-items: start;
  & p {
    font-size: var(--fontSize-H6);
    color: var(--6-gray);
    border-radius: 5.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const TrachIcon = styled(IoTrashOutline)`
  color: var(--opc-50);
  margin-left: 1rem;
  font-size: 1.5rem;
`;
export const PenIcon = styled(RiBallPenLine)`
  color: var(--opc-50);
  margin-left: 1rem;
  font-size: 1.5rem;
`;
export const NameP = styled.p`
  font-size: var(--fontSize-H5);
  font-weight: var(--fontWeight-medium);
  color: var(--10-gray);
`;
export const TimeP = styled.p`
  font-size: var(--fontSize-H5);
  font-weight: var(--fontWeight-medium);
  color: var(--6-gray);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
  }
`;

export const NoticeLike = styled.p`
  font-size: var(--fontSize-H5);
  font-weight: var(--fontWeight-medium);
  color: var(--10-gray);
  background-color: var(--opc-10);
  width: 24.6rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8rem;
  margin-bottom: 1rem;
`;
export const TitleTopper = styled.div`
  display: flex;
  margin-top: 50px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--4-gray);
  margin-bottom: 2rem;
  gap: 1rem;
  & button {
    font-size: var(--fontSize-H1);
    background-color: transparent;
    border: none;
    color: var(--opc-100);
  }
  & p {
    font-size: var(--fontSize-H6);
    color: var(--opc-100);
  }

  & h1 {
    font-size: var(--fontSize-H1);
  }
  @media screen and (max-width: 768px) {
    & h1 {
      font-size: var(--fontSize-H5);
    }
    & p {
      font-size: 1rem;
    }
  }
`;
export const Dots = styled(BsThreeDots)`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    color: var(--9-gray);
  }
`;
export const EditDropdown = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    background-color: var(--5-gray);
    border: 1px solid var(--opc-100);
    z-index: 1000;
    border-radius: 1rem;
    top: 13rem;
    right: 5%;
  }
`;

export const DropdownItem = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    padding: 12px 12px;
    font-size: var(--fontSize-H6);
    cursor: pointer;
  }
`;
