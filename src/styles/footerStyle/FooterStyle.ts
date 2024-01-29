import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 23.8rem;
  margin-top: 15rem;
  align-items: center;
  font-size: var(--fontSize-body);
  font-weight: var(--fontWeight-regular);
  color: var(--9-gray);
  background-color: var(--3-gray);
  @media screen and (max-width: 768px) {
    height: 15rem;
    margin-top: 8rem;
  }
`;

export const FooterWrapper = styled.div`
  width: 65%;
  margin: auto 0;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
export const FooterArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  img {
    max-width: 100%;
    width: 10.1rem;
    height: 2.6rem;
    cursor: pointer;
    user-select: none;

    @media screen and (max-width: 768px) {
      width: 4.7rem;
      height: 1.1rem;
    }
  }
`;

export const TextArea = styled.div`
  margin-top: 2.3rem;
  line-height: 1.5;
  @media screen and (max-width: 768px) {
    margin-top: 1rem;
    font-size: 0.9rem;
    font-weight: var(--fontWeight-regular);
  }

  span {
    cursor: pointer;
    user-select: none;
    &:hover {
      color: #047d86;
    }
  }
`;
