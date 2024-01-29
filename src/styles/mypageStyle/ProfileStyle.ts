import styled from 'styled-components';
import { RiBallPenLine } from 'react-icons/ri';

export const StProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 5rem;

  @media screen and (max-width: 1024px) {
    padding: 1.5rem;
  }
`;

export const StMobileNav = styled.div`
  display: none;

  & button {
    background: transparent;
    font-size: var(--fontSize-H5);
    color: var(--10-gray);
    border: none;
    cursor: pointer;
    &:hover {
      color: var(--opc-90);
    }
  }

  & div {
    display: flex;
    gap: 1rem;
    align-items: center;
    white-space: nowrap;

    & img {
      cursor: pointer;
    }
  }

  & p {
    font-size: var(--fontSize-H5);
  }

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;
  }
`;

export const StMobileCancelButton = styled.button`
  background: transparent;
  border: none;
`;

export const StMobileSaveButton = styled.button`
  background: transparent;
  border: none;
`;

export const StMobileEditButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1rem;
  color: var(--9-gray);
`;

export const StProfileContentContainer = styled.div`
  display: flex;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const StProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  & img {
    width: 18rem;
    height: 18rem;
    border-radius: 50%;
  }

  & input {
    display: none;
  }

  & button {
    position: absolute;
    background: var(--opc-100);
    border: none;
    padding: 0.7rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: var(--fontWeight-semiBold);
  }

  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
`;

export const StProfileContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

export const StProfileButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const StButtonCotainer = styled.div`
  display: flex;
  justify-content: space-between;

  & button {
    background: transparent;
    font-size: var(--fontSize-H5);
    color: var(--10-gray);
    border: none;
    cursor: pointer;
    &:hover {
      color: var(--opc-90);
    }
  }
  @media screen and (max-width: 768px) {
    justify-content: center;
    & button {
      display: none;
    }
  }
`;

export const StNicknameAndButton = styled.div`
  display: flex;
  align-items: center;

  & input {
    background: var(--4-gray);
    outline: none;
    border: none;
    border-radius: 8px;
    padding: 0.8rem 1.6rem;
    color: var(--11-gray);

    &:focus {
      border: 1px solid var(--opc-90);
    }
  }

  & h2 {
    font-size: var(--fontSize-H2);
    font-weight: var(--fontWeight-semiBold);
    text-align: center;

    @media screen and (max-width: 768px) {
      text-align: center;
      font-size: var(--fontSize-H5);
    }
  }

  & button {
    background: transparent;
    font-size: var(--fontSize-H5);
    color: var(--10-gray);
    border: none;
    cursor: pointer;
    &:hover {
      color: var(--opc-90);
    }
  }

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

export const StProfileEditButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const StSaveButton = styled.button`
  color: var(--opc-100);
`;

export const StProfileContent = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  gap: 2rem;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Pen = styled(RiBallPenLine)`
  color: #dbff00;
  text-align: center;
`;
