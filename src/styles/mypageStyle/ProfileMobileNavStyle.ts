import styled from 'styled-components';

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

export const StProfileButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
