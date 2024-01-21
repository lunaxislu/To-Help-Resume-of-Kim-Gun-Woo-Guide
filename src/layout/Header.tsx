import { useEffect, useState } from 'react';
import * as St from '../styles/headerStyle/HeaderStyle';
import { useLocation, useNavigate } from 'react-router';
import SearchBar from '../components/layout/header/SearchBar';
import { supabase } from '../api/supabase/supabaseClient';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks/reduxBase';
import { setSuccessLogin, setSuccessLogout } from '../redux/modules/authSlice';
import { setSearchQuery, setSearchResults } from '../redux/modules/searchSlice';

interface User {
  username: string;
}

const Header = () => {
  const [user, setUser] = useState<User | boolean>(false);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const { isLogin } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();
  // 페이지 이동 시 검색어 초기화 함수
  const handlePageChange = () => {
    dispatch(setSearchQuery('')); // 검색어 초기화
    dispatch(setSearchResults({ usedItemResults: [], communityResults: [] })); // 검색 결과 초기화
  };

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    handlePageChange();
  };

  const handleSellbuttonClick = () => {
    if (isLogin) {
      navigate('/productsposts');
    } else {
      navigate('/login');
    }
  };

  const handleMyPageButtonClick = () => {
    navigate('/mypage');
    handlePageChange();
  };
  const handleNavigateToLogin = () => {
    navigate('/login');
  };
  // 로그아웃 버튼
  const handleLogOutButtonClick = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      // 로그아웃이 성공 시 로그아웃 상태로 업데이트하기
      dispatch(setSuccessLogout());
      // 사용자 정보 초기화
      setUser(false);
      setAvatarUrl(undefined);
    }
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
          <St.Sell onClick={handleSellbuttonClick}>
            <img src="/assets/sell.png" alt="sellIcon" />
            <p>판매하기</p>
          </St.Sell>
          {isLogin ? (
            <St.Likes>
              <img src="/assets/headerlikes.png" alt="likeIcon" />
              <p>찜</p>
            </St.Likes>
          ) : (
            ''
          )}
          {isLogin ? (
            <St.Alert>
              <img src="assets/alert.png" alt="alertIcon" />
              <p>알림</p>
            </St.Alert>
          ) : (
            ''
          )}
          {isLogin ? (
            <St.UserIcon
              src={`${avatarUrl}`}
              onClick={handleMyPageButtonClick}
            />
          ) : (
            <St.Button onClick={handleNavigateToLogin}>
              로그인/회원가입
            </St.Button>
          )}
        </St.ButtonContainer>
      </St.HeaderSection>
      <St.NavSection>
        <St.NavBar>
          {/* <St.NavButton to="/introduce">서비스 소개</St.NavButton> */}
          <St.NavButton to="/products" onClick={handlePageChange}>
            중고거래
          </St.NavButton>
          <St.NavButton to="/community" onClick={handlePageChange}>
            커뮤니티
          </St.NavButton>
          {isLogin ? (
            <St.LogOut onClick={handleLogOutButtonClick}>로그아웃</St.LogOut>
          ) : (
            ''
          )}
        </St.NavBar>

        <SearchBar />
      </St.NavSection>
    </St.HeaderContainer>
  );
};

export default Header;
