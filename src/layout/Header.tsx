import React from 'react';
import * as St from '../styles/headerStyle/HeaderStyle';
import { useNavigate } from 'react-router';
import SearchBar from '../components/layout/header/SearchBar';

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };
  const handleSellbuttonClick = () => {
    navigate('/productsposts');
  };
  return (
    <St.HeaderContainer>
      <St.HeaderSection>
        <St.Logo onClick={handleLogoClick}>작업자들</St.Logo>
        <St.ButtonContainer>
          <St.Button onClick={handleSellbuttonClick}>판매하기</St.Button>
          <St.Button>찜</St.Button>
          <St.Button>알림</St.Button>
          <St.UserIcon>User</St.UserIcon>
        </St.ButtonContainer>
      </St.HeaderSection>
      <St.NavSection>
        <St.NavBar>
          <St.NavButton to="/introduce">서비스 소개</St.NavButton>
          <St.NavButton to="/products">중고거래</St.NavButton>
          <St.NavButton to="/community">커뮤니티</St.NavButton>
        </St.NavBar>
        <St.SearchBar>
          <SearchBar />
        </St.SearchBar>
      </St.NavSection>
    </St.HeaderContainer>
  );
};

export default Header;
