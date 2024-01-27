import styled from 'styled-components';

export const StTabsContainer = styled.ul`
  width: 111.6rem;
  display: flex;
  cursor: pointer;
  border-radius: 0.8rem;
  margin: 5rem auto;
  gap: 3.5rem;
  white-space: nowrap;

  @media screen and (max-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

export const StTab = styled.li<{ active: boolean }>`
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? 'var(--opc-100)' : 'var(--10-gray)')};
`;
