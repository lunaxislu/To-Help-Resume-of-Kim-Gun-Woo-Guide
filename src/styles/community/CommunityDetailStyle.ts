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
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--12-gray);
  margin-bottom: 5rem;
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
`;
export const ContentsContainer = styled.div`
  width: 80%;
  max-width: 111.6rem;
  min-height: 60rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const WriteWrap = styled.div`
  width: 80%;
  max-width: 100.6rem;

  & h1 {
    font-size: 3rem;
    margin-top: 5rem;
    padding-bottom: 2rem;
    border-bottom: 0.1rem solid var(--4-gray);
    margin-bottom: 2rem;
  }
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
  width: 3.7rem;
  height: 2.3rem;
  font-size: var(--fontSize-H6);
  color: var(--10-gray);
  background-color: var(--3-gray);
  border-radius: 5.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Report = styled.p`
  /* margin-left: 1.5rem;
  width: 3.7rem;
  height: 2.3rem; */
  font-size: var(--fontSize-H6);
  color: var(--6-gray);
  border-radius: 5.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
`;
export const MainTopper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  & h1 {
    font-size: var(--fontSize-H3);
    font-weight: var(--fontWeight-semiBold);
    color: var(--12-gray);
  }
`;
export const SubTopper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;
export const TitleCategory = styled.div`
  display: flex;
  gap: 1.5rem;
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
  font-weight: var(--fontWeight-semiBold);
  color: var(--6-gray);
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
