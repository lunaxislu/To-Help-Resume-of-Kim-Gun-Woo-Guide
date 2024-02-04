import { SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const Hr = styled.hr`
  width: 100%;
  height: 0.1rem;
  border: none;
  background-color: var(--7-gray);
  margin-bottom: 2rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const HeaderTopContainer = styled.div`
  max-width: 144rem;
  width: 111.6rem;
  height: 12rem;
  display: flex;
  margin: auto;
  background: #fffefa;
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

export const VisibleSearchBar = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const Logo = styled.img`
  width: 23.4rem;
  height: 5.4rem;
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
  /* svg {
    color: var(--opc-100);
    width: 1.4rem;
    height: 1.4rem;
  } */
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
  /* svg {
    transform: scaleX(-1);
    color: var(--opc-100);
    width: 1.4rem;
    height: 1.4rem;
  } */
`;

export const Alert = styled.button`
  align-items: center;
  display: flex;
  width: 6rem;
  height: 2.7rem;
  border: 0;
  background: transparent;
  font-family: 'Pretendard-Medium';
  position: relative;

  cursor: pointer;
  gap: 0.6rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
  /* svg {  
    color: var(--opc-100);
    width: 1.4rem;
    height: 1.4rem;
  } */
  p {
    color: var(--11-gray);
    font-weight: var(--fontWeight-medium);
    font-size: var(--fontSize-H5);
    line-height: 2.6768rem;
  }
`;

export const Button = styled.button`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 13.7rem;
  height: 3.4rem;
  border: 0;
  border-radius: 3rem;
  background: #a0e0d6;
  font-family: 'BM-JUA';
  cursor: pointer;
  color: #ffffff;
  font-weight: var(--fontWeight-medium);
  font-size: var(--fontSize-H6);
  line-height: 2.6768rem;
  margin-left: 2rem;
  &:hover {
    background: #18b3bc;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.66rem;
  border: none;
  background-color: transparent;
  width: 8.5rem;
  height: 3rem;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LogoutImage = styled.img`
  width: 1.84rem;
  height: 1.57rem;
`;
export const LogoutWord = styled.div`
  font-size: var(--fontSize-body);
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

// notification

export const NotiAni = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StNotiContainer = styled.div`
  width: 200px;
  max-height: 150px;
  overflow-y: scroll;
  border: 0.1rem solid var(--opc-100);
  border-radius: 3px;
  background-color: var(--bgColor);
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  position: absolute;
  padding-top: 2rem;
  top: 7%;
  right: 18%;
  z-index: 3;
  transition: all 0.3s ease;
  animation: ${NotiAni} 0.3s ease;

  @media screen and (max-width: 768px) {
    width: 150px;
  }
`;

export const StNoticeButtonContainer = styled.div`
  width: 100%;
  padding: 0.3rem;
  background-color: var(--2-gray);
  position: absolute;
  top: 0;
`;

export const StNoticeDeleteBtn = styled.button`
  background: var(--2-gray);
  outline: none;
  border: none;
  color: var(--opc-100);
  cursor: pointer;
`;

export const StNotiItem = styled.div`
  width: 100%;
  padding: 1.2rem 0.8rem;
  border-bottom: 0.1rem solid var(--opc-20);
  cursor: pointer;
  &:hover {
    background-color: var(--opc-100);
    color: var(--3-gray);
  }
`;

export const StNotiDot = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0.5rem;
`;
