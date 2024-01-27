import styled from 'styled-components';

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
  height: 50vh;

  & p {
    font-size: var(--fontSize-H1);
    font-weight: var(--fontWeight-bold);
    text-align: center;
    line-height: 1.5;
    white-space: pre-line;

    @media screen and (max-width: 768px) {
      font-size: var(--fontSize-H4);
    }
  }

  & button {
    display: flex;
    align-items: center;
    background: var(--opc-10);
    border: none;
    color: var(--11-gray);
    padding: 0.7rem 1.4rem;
    font-size: var(--fontSize-H3);
    gap: 0.8rem;
    border-radius: 7rem;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      font-size: var(--fontSize-H5);
    }
  }

  & img {
  }
`;
