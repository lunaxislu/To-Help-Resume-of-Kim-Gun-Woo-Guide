import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

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

export const StMobileBack = styled(IoIosArrowBack)`
  cursor: pointer;
`;
