import React, { useEffect, useState } from 'react';
import * as St from '../styles/headerStyle/HeaderStyle';
import { useNavigate } from 'react-router';
import SearchBar from '../components/layout/header/SearchBar';
import { supabase } from '../api/supabase/supabaseClient';
import { error } from 'console';

interface User {
  username: string;
}

const getOut = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) console.log(error);
};

const Header = () => {
  const [user, setUser] = useState<User | boolean>(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const { data: userData, error: userError } =
  //         await supabase.auth.getUser();
  //       if (userError) {
  //         console.error('유저아이디 정보를 불러오지 못했습니다.', userError);
  //       }
  //       setUser(userData);
  //     } catch (error) {
  //       console.error(
  //         '수파베이스에서 로그인 정보를 불러오지 못했습니다.',
  //         error
  //       );
  //     }
  //   };
  // }, []);

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

        {user ? (
          <St.ButtonContainer>
            <St.Button onClick={handleSellbuttonClick}>판매하기</St.Button>
            <St.Button>찜</St.Button>
            <St.Button>알림</St.Button>
            <St.UserIcon>User</St.UserIcon>
          </St.ButtonContainer>
        ) : (
          <St.ButtonContainer>
            <St.Button>로그인/회원가입</St.Button>
          </St.ButtonContainer>
        )}
      </St.HeaderSection>
      <St.NavSection>
        <St.NavBar>
          {/* <St.NavButton to="/introduce">서비스 소개</St.NavButton> */}
          <St.NavButton to="/products">중고거래</St.NavButton>
          <St.NavButton to="/community">커뮤니티</St.NavButton>
          <button onClick={getOut}>로그아웃</button>
        </St.NavBar>
        <St.SearchBar>
          <SearchBar />
        </St.SearchBar>
      </St.NavSection>
    </St.HeaderContainer>
  );
};

export default Header;
