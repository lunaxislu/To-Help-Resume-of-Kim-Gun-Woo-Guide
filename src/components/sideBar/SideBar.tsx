import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  StMainButton,
  StMenuButtons,
  StSideBtnContainer
} from './SideBarStyles';
import styled from 'styled-components';
import SearchBar from '../layout/header/SearchBar';

const StSearchBarContainer = styled.div`
  position: absolute;
  top: 120%;
  right: 10rem;
`;

const SideBar = () => {
  const isLogined = localStorage.getItem('userId');

  const [isShow, setIsShow] = useState<boolean>(false);
  const [showSearchComp, setShowSearchComp] = useState<boolean>(false);

  const arr = [
    '검색',
    '중고거래',
    '커뮤니티',
    '판매하기',
    '소통하기',
    '채팅',
    '프로필'
  ];
  const NoLogined = ['검색', '중고거래', '커뮤니티', '로그인'];

  const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);

  const navi = useNavigate();

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev);
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
    innerText === '소통하기' && navi('/community_write');
    if (innerText === '검색') {
      toggleSearchBar();
      setIsShow(true);
      return;
    }
    setIsShow(false);
  };

  useEffect(() => {
    return () => {
      setShowSearchComp(false);
    };
  }, []);

  return (
    <StSideBtnContainer>
      {isShow && isSearchBarVisible && (
        <StSearchBarContainer>
          <SearchBar
            showSearchComp={isSearchBarVisible}
            setShowSearchComp={setIsSearchBarVisible}
          />
        </StSearchBarContainer>
      )}
      <StMainButton
        onClick={() => {
          setMenuToggle();
          setShowSearchComp(false);
          if (isShow && isSearchBarVisible) {
            toggleSearchBar();
          }
        }}
      >
        Menu
      </StMainButton>
      {isLogined &&
        arr.map((menu, i) => {
          return (
            isShow && (
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
            )
          );
        })}
      {!isLogined &&
        NoLogined.map((menu, i) => {
          return (
            isShow && (
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
            )
          );
        })}
    </StSideBtnContainer>
  );
};

export default SideBar;
