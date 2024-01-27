import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 100vw;
  height: 23.8rem;
  font-size: var(--fontSize-body);
  font-weight: var(--fontWeight-regular);
  color: var(--9-gray);
  background-color: var(--2-gray);
  line-height: 2.24rem;
  margin: 0 auto;
  padding: 3rem 0rem;
  margin-top: 15rem;
`;

export const FooterWrapper = styled.div`
  display: flex;
  margin-left: 38rem;
  padding: 5rem 0;
  @media screen and (max-width: 768px) {
    margin-left: 3rem;
  }
`;
export const FooterArea = styled.div`
<<<<<<< HEAD
  max-width: 1116px;
  display: flex;
  flex-direction: column;
=======
  width: 1116px;
  max-width: 100%;
  margin: auto;
>>>>>>> 0ae9ccef78bc5fa28bfb7604d970b4e96e33561e
`;

export const Logo = styled.div`
  img {
    max-width: 100%;
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
