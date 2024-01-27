import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderTopContainer = styled.div`
  max-width: 144rem;
  width: 111.6rem;
  height: 15rem;
  display: flex;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    max-width: 76.8rem;
  }
`;
export const HeaderContainer = styled.div`
  width: 95%;
  margin: auto;
  @media screen and (max-width: 768px) {
    max-width: 93%;
  }
`;
export const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  flex-shrink: 0;
  padding: 3rem 0;
  flex-direction: column;
  margin: 0 auto;

  @media screen and (max-width: 1200px) {
    max-width: 110rem;
  }
  @media screen and (max-width: 1000px) {
    max-width: 100rem;
    width: 100%;
  }
  @media screen and (max-width: 900px) {
    max-width: 90rem;
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    align-items: center;
    max-width: 76.8rem;
    width: 100%;
    padding: 3rem 2rem;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
  }
  @media screen and (max-width: 349px) {
    width: 100%;
  }
`;

export const HeaderSection = styled.section`
  width: 100%;
  display: flex;

  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
    @media screen and (max-width: 530px) {
      width: 100%;
    }
  }
`;

export const Logo = styled.img`
  width: 10.1rem;
  height: 2.6rem;
  cursor: pointer;
  user-select: none;
  margin: auto 0;

  @media screen and (max-width: 768px) {
    width: 8rem;
    height: 2rem;
  }
  @media screen and (max-width: 530px) {
    width: 7rem;
    height: 2rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  /* width: 24rem; */
  height: 3.5rem;
  align-items: center;
  gap: 2rem;
  user-select: none;
  margin: auto 0;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const Sell = styled.button`
  align-items: center;
  display: flex;
  width: 8rem;
  height: 2.7rem;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: 'Pretendard-Medium';
  gap: 0.6rem;

  @media screen and (max-width: 768px) {
    display: none;
  }

  p {
    color: var(--11-gray);
    font-weight: var(--fontWeight-medium);
    font-size: var(--fontSize-H5);
    line-height: 2.6768rem;
  }
  .sellbtn {
    color: var(--opc-100);
    width: 1.4rem;
    height: 1.4rem;
  }
`;

export const Chat = styled.button`
  align-items: center;
  display: flex;
  width: 6rem;
  height: 2.7rem;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: 'Pretendard-Medium';

  gap: 0.6rem;

  @media screen and (max-width: 768px) {
    display: none;
  }

  p {
    color: var(--11-gray);
    font-weight: var(--fontWeight-medium);
    font-size: var(--fontSize-H5);
    line-height: 2.6768rem;
  }
  .myChat {
    color: var(--opc-100);
    width: 1.4rem;
    height: 1.4rem;
  }
`;

export const Alert = styled.button`
  align-items: center;
  display: flex;
  width: 6rem;
  height: 2.7rem;
  border: 0;
  background: transparent;
  font-family: 'Pretendard-Medium';

  cursor: pointer;
  gap: 0.6rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
  .myAlarm {
    color: var(--opc-100);
    width: 1.4rem;
    height: 1.4rem;
  }
  p {
    color: var(--11-gray);
    font-weight: var(--fontWeight-medium);
    font-size: var(--fontSize-H5);
    line-height: 2.6768rem;
  }
`;

export const Button = styled.button`
  align-items: center;
  display: flex;
  width: 9rem;
  height: 2.7rem;
  border: 0;
  background: transparent;
  font-family: 'Pretendard-Medium';
  cursor: pointer;
  color: var(--11-gray);
  font-weight: var(--fontWeight-medium);
  font-size: var(--fontSize-H5);
  line-height: 2.6768rem;
  margin-left: 2rem;
`;

export const UserIcon = styled.img`
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 2.3rem;
`;

export const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.6rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavButton = styled(Link)`
  text-decoration: none;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  color: var(--11-gray);
  font-size: var(--fontSize-H4);
  font-weight: var(--fontWeight-semiBold);
`;

export const LogOut = styled.button`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 8rem;
  height: 2.7rem;
  border: none;
  margin-top: 0.3rem;
  background: transparent;
  font-family: 'Pretendard-Medium';

  color: var(--11-gray);
  font-weight: var(--fontWeight-medium);
  font-size: var(--fontSize-H5);
  line-height: 2.6768rem;
  cursor: pointer;
`;

export const HamburgerMenu = styled.img`
  cursor: pointer;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const MobileSearchIcon = styled.img`
  cursor: pointer;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    margin-right: 1.5rem;
  }
`;
