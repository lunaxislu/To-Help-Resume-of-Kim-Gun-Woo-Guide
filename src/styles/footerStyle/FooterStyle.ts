import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 144rem;
  height: 23.8rem;
  font-size: var(--fontSize-body);
  font-weight: var(--fontWeight-regular);
  color: var(--9-gray);
  background-color: var(--2-gray);
  line-height: 2.24rem;
`;
export const FooterArea = styled.div`
  margin-left: 16.2rem;
  margin-top: 5rem;
  gap: 2.3rem;
`;
export const Logo = styled.div`
  /* margin-bottom: 2.3rem; */
`;
export const TextArea = styled.div`
  margin-top: 2.3rem;
  span {
    cursor: pointer;
    user-select: none;
    &:hover {
      color: #047d86;
    }
  }
`;
