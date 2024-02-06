import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 23.8rem;
  margin-top: 15rem;
  align-items: center;
  padding: 3rem auto;
  background-color: rgba(160, 224, 214, 0.3);
  @media screen and (max-width: 768px) {
    height: 15rem;
    margin-top: 5rem;
    padding: 1rem auto;
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
    width: fit-content;
    height: 5.4rem;
    cursor: pointer;
    user-select: none;

    @media screen and (max-width: 768px) {
      width: 25rem;
    }
    @media screen and (max-width: 440px) {
      width: 23rem;
    }
  }
`;

export const TextArea = styled.div`
  margin-top: 2.3rem;
  line-height: 1.5;
  padding-left: 3rem;
  font-size: var(--fontSize-H4);
  @media screen and (max-width: 768px) {
    margin: 0.5rem;
    padding-left: 3rem;
    font-size: 1.4rem;
    & span {
      cursor: pointer;
      user-select: none;
      &:hover {
        color: #047d86;
      }
    }
  }
  @media screen and (max-width: 440px) {
    font-size: 1.2rem;
    padding-left: 1rem;
  }
`;
