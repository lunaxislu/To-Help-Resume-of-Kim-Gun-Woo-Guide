import { useEffect, useState } from 'react';
import * as St from '../styles/headerStyle/HeaderStyle';
import { useNavigate } from 'react-router';
import SearchBar from '../components/layout/header/SearchBar';
import { supabase } from '../api/supabase/supabaseClient';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks/reduxBase';
import { setSuccessLogin, setSuccessLogout } from '../redux/modules/authSlice';

interface User {
  username: string;
}

const Header = () => {
  const [user, setUser] = useState<User | boolean>(false);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const loginStatus = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  console.log(loginStatus);
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

  const handleMyPageButtonClick = () => {
    navigate('/mypage');
  };

  // 로그아웃 버튼
  const handleLogOutButtonClick = async () => {
    let { error } = await supabase.auth.signOut();
    navigate('/login');
    if (error) console.log(error);
  };

  // 로그인 상태여부 확인
  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      dispatch(setSuccessLogin());
    } else {
      dispatch(setSuccessLogout());
    }
  };

  // 현재 사용자 정보 가져오기
  const getAuth = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data.user) {
      setAvatarUrl(data.user.user_metadata.avatar_url);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <St.HeaderContainer>
      <St.HeaderSection>
        <St.Logo
          src="/assets/logo.png"
          alt="작업자들"
          onClick={handleLogoClick}
        />
        <St.ButtonContainer>
          <St.Button onClick={handleSellbuttonClick}>판매하기</St.Button>
          <St.Button>찜</St.Button>
          <St.Button>알림</St.Button>
          <St.UserIcon src={`${avatarUrl}`} onClick={handleMyPageButtonClick} />
        </St.ButtonContainer>
      </St.HeaderSection>
      <St.NavSection>
        <St.NavBar>
          {/* <St.NavButton to="/introduce">서비스 소개</St.NavButton> */}
          <St.NavButton to="/products">중고거래</St.NavButton>
          <St.NavButton to="/community">커뮤니티</St.NavButton>
          <button onClick={handleLogOutButtonClick}>로그아웃</button>
        </St.NavBar>
        <St.SearchBar>
          <SearchBar />
        </St.SearchBar>
      </St.NavSection>
    </St.HeaderContainer>
  );
};

export default Header;
