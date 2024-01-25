import styled from 'styled-components';

export const StProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 5rem;
`;

export const StMobileNav = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StProfileContentContainer = styled.div`
  display: flex;
  gap: 3rem;
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
  gap: 2rem;
`;

export const StNicknameAndButton = styled.div`
  display: flex;
  justify-content: space-between;

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
  }

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    color: var(--8-gray);
    cursor: pointer;

    &:hover {
      color: var(--opc-90);
    }
  }
`;

export const StProfileContent = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  gap: 2rem;
`;

// 버튼 스타일
export const StProfileButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const StProfileSaveButton = styled.a`
  color: var(--opc-100);
  cursor: pointer;

  &:hover {
    color: var(--opc-90);
  }
`;
