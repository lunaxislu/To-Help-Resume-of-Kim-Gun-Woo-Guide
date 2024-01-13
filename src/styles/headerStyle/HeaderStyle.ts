import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  height: 200px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;

  background-color: #f2f2f2;
`;

export const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 50px 100px;
`;
export const Logo = styled.div`
  font-size: 30px;
  cursor: pointer;
  user-select: none;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const Button = styled.button`
  border-radius: 5px;
`;
export const UserIcon = styled.button`
  border-radius: 5px;
`;

export const NavSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0px 100px;
`;
export const NavBar = styled.nav``;
export const NavButton = styled(Link)`
  margin-right: 10px;
`;
export const SearchBar = styled.input`
  width: 300px;
  /* margin-right: 100px; */
`;
