import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { supabase } from '../api/supabase/supabaseClient';
import SearchBar from '../components/layout/header/SearchBar';
import { setSuccessLogin, setSuccessLogout } from '../redux/modules/authSlice';
import { setSearchQuery, setSearchResults } from '../redux/modules/searchSlice';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks/reduxBase';
import * as St from '../styles/headerStyle/HeaderStyle';
import { BiWon } from 'react-icons/bi';
import { BiSolidHeart } from 'react-icons/bi';
import { BiSolidBell } from 'react-icons/bi';
import Hamburger from '../components/layout/header/Hamburger';
import { BsChatDotsFill } from 'react-icons/bs';

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

  const [showSearchComp, setShowSearchComp] = useState<boolean>(false);
  const [showHamburger, setShowHamburger] = useState<boolean>(false);
  // 반응형 대응 서치 컴포넌트 두두둥장
  const handleShowSearchComp = () => {
    setShowSearchComp((prev) => !prev);
  };
  // 반응형 대응 햄버거 버튼
  const handlShowSearchBurger = () => {
    setShowHamburger((prev) => !prev);
  };
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
      navigate('/login/login');
    }
    if (isLogin) {
      navigate('/productsposts');
    } else {
      navigate('/login/login');
    }
  };

  const handleMyPageButtonClick = () => {
    navigate('/mypage');
    handlePageChange();
  };
  const handleNavigateToLogin = () => {
    navigate('/login/login');
  };
  const handleNavigateToChat = () => {
    navigate('/chat');
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
      // 이락균이 추가함 //
      navigate('/');
    }
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
    <St.HeaderTopContainer>
      <St.HeaderContainer>
        <St.HeaderWrapper>
          <St.HeaderSection>
            <St.Logo
              src="/assets/logo2.png"
              alt="작업자들"
              onClick={handleLogoClick}
            />
            <St.ButtonContainer>
              <St.Sell onClick={handleSellbuttonClick}>
                <BiWon
                  style={{
                    width: '1.6rem',
                    height: '1.6rem',
                    color: 'var(--opc-100)'
                  }}
                />
                <p>판매하기</p>
              </St.Sell>
              {isLogin ? (
                <St.Chat onClick={handleNavigateToChat}>
                  <BsChatDotsFill
                    style={{
                      width: '1.4rem',
                      height: '1.4rem',
                      color: 'var(--opc-100)',
                      transform: 'scaleX(-1)'
                    }}
                  />
                  <p>채팅</p>
                </St.Chat>
              ) : (
                ''
              )}
              {isLogin ? (
                <St.Alert>
                  <BiSolidBell
                    style={{
                      width: '1.6rem',
                      height: '1.6rem',
                      color: 'var(--opc-100)'
                    }}
                  />
                  <p>알림</p>
                </St.Alert>
              ) : (
                ''
              )}
              {isLogin ? (
                <>
                  <St.UserIcon
                    src={`${avatarUrl}`}
                    onClick={handleMyPageButtonClick}
                  />
                  <St.MobileSearchIcon
                    src="/assets/mobile_search.svg"
                    onClick={handleShowSearchComp}
                  />
                  <St.HamburgerMenu
                    src="/assets/hamburger.svg"
                    onClick={handlShowSearchBurger}
                  />
                  <Hamburger
                    isOpen={showHamburger}
                    onClose={() => setShowHamburger(false)}
                    onLogout={handleLogOutButtonClick}
                    user={user}
                    setUser={() => setUser(false)}
                    avatarUrl={avatarUrl}
                  />
                </>
              ) : (
                <St.Button onClick={handleNavigateToLogin}>
                  로그인/회원가입
                </St.Button>
              )}
            </St.ButtonContainer>
          </St.HeaderSection>
          <St.NavSection>
            <St.NavBar>
              <St.NavButton to="/products" onClick={handlePageChange}>
                중고거래
              </St.NavButton>
              <St.NavButton to="/community" onClick={handlePageChange}>
                커뮤니티
              </St.NavButton>
              {isLogin ? (
                <St.LogOut onClick={handleLogOutButtonClick}>
                  로그아웃
                </St.LogOut>
              ) : (
                ''
              )}
            </St.NavBar>

            <SearchBar
              showSearchComp={showSearchComp}
              setShowSearchComp={setShowSearchComp}
            />
          </St.NavSection>
          <div style={{ position: 'relative' }}></div>
        </St.HeaderWrapper>
      </St.HeaderContainer>
    </St.HeaderTopContainer>
  );
};

export default Header;
