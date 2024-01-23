import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 144rem;
  height: 14.8rem;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  margin: 0 auto;
  background-color: {
    color: var(--bgColor);
  }
  /* border: 3px solid #d9d9d9; */
`;

export const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10rem;
  margin-top: 3.4rem;
`;
export const Logo = styled.img`
  width: 10.1rem;
  height: 2.6rem;
  cursor: pointer;
  user-select: none;
  margin: auto 0;
`;
export const ButtonContainer = styled.div`
  display: flex;
  width: 24rem;
  height: 3.5rem;
  align-items: center;
  gap: 1rem;
  user-select: none;
  margin: auto 0;
`;
export const Sell = styled.button`
  align-items: center;
  display: flex;
  width: 7.3rem;
  height: 2.7rem;
  border: 0;
  background: transparent;
  cursor: pointer;
  gap: 0.6rem;

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

export const Likes = styled.button`
  align-items: center;
  display: flex;
  width: 3.8rem;
  height: 2.7rem;
  border: 0;
  background: transparent;
  cursor: pointer;
  gap: 0.6rem;

  p {
    color: var(--11-gray);
    font-weight: var(--fontWeight-medium);
    font-size: var(--fontSize-H5);
    line-height: 2.6768rem;
  }
  .mylikes {
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
  cursor: pointer;
  gap: 0.6rem;
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
`;

export const NavSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0 10rem;
  margin-top: 2.3rem;
`;
export const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.6rem;
`;
export const NavButton = styled(Link)`
  text-decoration: none;
  align-items: center;
  cursor: pointer;
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
  color: var(--11-gray);
  font-weight: var(--fontWeight-medium);
  font-size: var(--fontSize-H5);
  line-height: 2.6768rem;
  cursor: pointer;
`;
