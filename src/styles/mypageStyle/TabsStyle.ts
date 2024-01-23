import styled from 'styled-components';

export const TabsContainer = styled.ul`
  width: 111.6rem;
  display: flex;
  cursor: pointer;
  border-radius: 0.8rem;
  margin: 5rem auto;
  gap: 2.5rem;
`;

export const Tab = styled.li<{ active: number }>`
  font-weight: ${(props) =>
    props.active === props.tabIndex ? 'bold' : 'normal'};
  color: ${(props) =>
    props.active === props.tabIndex ? 'var(--opc-100)' : 'var(--10-gray)'};
`;
