import styled from 'styled-components';
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;
  line-height: 3rem;
  min-height: 60rem;
  color: var(--8-gray);
  font-size: var(--fontSize-H4);
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
  height: 3rem;
  width: 4rem;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--5-gray);
  margin-right: 1rem;
  font-weight: var(--fontWeight-semiBold);
`;
export const Topper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 111.6rem;
  margin-bottom: 1rem;
`;
export const TopperRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: var(--fontSize-H5);
  color: var(--8-gray);
`;
export const TopperLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & h1 {
    font-size: var(--fontSize-H3);
    font-weight: var(--fontWeight-semiBold);
  }
  & p {
    font-size: var(--fontSize-H5);
    color: var(--4-gray);
  }
`;
export const IconContainer = styled.div`
  display: flex;
  justify-content: end;
  font-size: var(--fontSize-H5);
  align-items: center;
`;
export const Category = styled.p`
  background-color: var(--4-gray);
  color: var(--12-gray);
  width: fit-content;
  padding: 1.2rem;
  border-radius: 0.6rem;
  font-size: var(--fontSize-H5);
`;
