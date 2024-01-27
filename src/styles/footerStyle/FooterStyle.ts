import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 23.8rem;
  position: relative;
  font-size: var(--fontSize-body);
  font-weight: var(--fontWeight-regular);
  color: var(--9-gray);
  background-color: var(--2-gray);
  line-height: 2.24rem;
  margin: 0 auto;
  padding: 3rem 15rem;

  @media screen and (max-width: 768px) {
    max-width: 76.8rem;
    width: 100%;
    padding: 3rem 2rem;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
    padding: 3rem 2rem;
  }
  @media screen and (max-width: 349px) {
    width: 100%;
    padding: 3rem 1rem;
  }
`;
export const FooterArea = styled.div`
  width: 1116px;
  margin: auto;
`;

export const Logo = styled.div`
  img {
    width: 10.1rem;
    height: 2.6rem;
    cursor: pointer;
    user-select: none;

    @media screen and (max-width: 768px) {
      width: 8rem;
      height: 2rem;
    }
    @media screen and (max-width: 530px) {
      width: 7rem;
      height: 2rem;
    }
  }
`;

export const TextArea = styled.div`
  margin-top: 2.3rem;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
  }
  @media screen and (max-width: 530px) {
    font-size: var(--fontSize-H6);
  }

  span {
    cursor: pointer;
    user-select: none;
    &:hover {
      color: #047d86;
    }
  }
`;
