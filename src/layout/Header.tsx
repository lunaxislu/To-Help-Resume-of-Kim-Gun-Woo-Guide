import React from 'react';
import * as St from '../styles/headerStyle/HeaderStyle';

const Header = () => {
  return (
    <St.HeaderContainer>
      <St.HeaderSection>
        <St.Logo>logo</St.Logo>
        <St.ButtonContainer>
          <St.Button>판매하기</St.Button>
          <St.Button>찜</St.Button>
          <St.Button>알림</St.Button>
          <St.UserIcon>User</St.UserIcon>
        </St.ButtonContainer>
      </St.HeaderSection>
      <St.NavSection>
        <St.NavBar>
          <St.NavButton to="/introduce">서비스 소개</St.NavButton>
          <St.NavButton to="/secondhand">중고거래</St.NavButton>
          <St.NavButton to="/community">커뮤니티</St.NavButton>
        </St.NavBar>
        <St.SearchBar placeholder="찾는 내용을 검색해보세요."></St.SearchBar>
      </St.NavSection>
    </St.HeaderContainer>
  );
};

export default Header;
