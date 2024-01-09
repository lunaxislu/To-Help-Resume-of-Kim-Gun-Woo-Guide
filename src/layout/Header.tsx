import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <StHeaderContainer>
      <StHeaderSection>
        <StLogo>logo</StLogo>
        <StButtonContainer>
          <StButton>판매하기</StButton>
          <StButton>찜</StButton>
          <StButton>알림</StButton>
          <StUserIcon>user</StUserIcon>
        </StButtonContainer>
      </StHeaderSection>
      <StNavSection>
        <StNavBar>
          <StNavButton to="/">중고거래</StNavButton>
          <StNavButton to="/">커뮤니티</StNavButton>
        </StNavBar>
        <StSearchBar placeholder="찾는 내용을 검색해보세요."></StSearchBar>
      </StNavSection>
    </StHeaderContainer>
  );
};

export default Header;
const StHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  background-color: #f2f2f2;
`;

const StHeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
`;
const StLogo = styled.div`
  font-size: 30px;
`;
const StButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 100px;
`;
const StButton = styled.button`
  border-radius: 5px;
`;
const StUserIcon = styled.button`
  border-radius: 5px;
`;

const StNavSection = styled.section`
  display: flex;
  justify-content: space-between;
`;
const StNavBar = styled.nav``;
const StNavButton = styled(Link)`
  margin-right: 10px;
`;
const StSearchBar = styled.input`
  width: 300px;
  margin-right: 100px;
`;
