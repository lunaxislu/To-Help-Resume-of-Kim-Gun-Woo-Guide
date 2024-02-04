import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  StMainButton,
  StMenuButtons,
  StSideBtnContainer
} from './SideBarStyles';
import SideSearchBar from './SiedSearchBar';

const SideBar = () => {
  const isLogined = localStorage.getItem('userId');

  const [isShow, setIsShow] = useState<boolean>(false);
  const [showSearchComp, setShowSearchComp] = useState<boolean>(false);
  const navi = useNavigate();

  const arr = ['판매하기', '중고거래', '커뮤니티', '검색', '채팅', '프로필'];
  const NoLogined = ['중고거래', '커뮤니티', '검색', '로그인'];

  const searchInputToggle = () => {
    setShowSearchComp((prev) => !prev);
  };

  const setMenuToggle = () => {
    setIsShow((prev) => !prev);
  };

  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    const { innerText } = e.currentTarget;
    innerText === '판매하기' && navi('/productsposts');
    innerText === '중고거래' && navi('/products');
    innerText === '커뮤니티' && navi('/community');
    innerText === '채팅' && navi('/chat');
    innerText === '프로필' && navi('/mypage');
    innerText === '로그인' && navi('/login');
    setIsShow(false);
  };

  useEffect(() => {
    return () => {
      setShowSearchComp(false);
    };
  }, []);

  return (
    <StSideBtnContainer>
      <StMainButton
        onClick={() => {
          setMenuToggle();
          setShowSearchComp(false);
        }}
      >
        Menu
      </StMainButton>
      {isLogined &&
        arr.map((menu, i) => {
          return (
            isShow &&
            (menu === '검색' ? (
              <div key={i}>
                <StMenuButtons
                  $isShow={isShow}
                  $index={i + 1}
                  onClick={searchInputToggle}
                >
                  {menu}
                </StMenuButtons>
                {showSearchComp && (
                  <SideSearchBar
                    showSearchComp={showSearchComp}
                    setShowSearchComp={setShowSearchComp}
                  />
                )}
              </div>
            ) : (
              <StMenuButtons
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(e);
                }}
                $isShow
                $index={i + 1}
                key={i}
              >
                {menu}
              </StMenuButtons>
            ))
          );
        })}
      {!isLogined &&
        NoLogined.map((menu, i) => {
          return (
            isShow &&
            (menu === '검색' ? (
              <div key={i}>
                <StMenuButtons
                  $isShow={isShow}
                  $index={i + 1}
                  onClick={searchInputToggle}
                >
                  {menu}
                </StMenuButtons>
                {showSearchComp && (
                  <SideSearchBar
                    showSearchComp={showSearchComp}
                    setShowSearchComp={setShowSearchComp}
                  />
                )}
              </div>
            ) : (
              <StMenuButtons
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(e);
                }}
                $isShow
                $index={i + 1}
                key={i}
              >
                {menu}
              </StMenuButtons>
            ))
          );
        })}
    </StSideBtnContainer>
  );
};

export default SideBar;
