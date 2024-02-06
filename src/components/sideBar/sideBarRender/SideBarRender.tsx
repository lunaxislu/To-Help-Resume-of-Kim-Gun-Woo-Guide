import React, { MouseEvent, useState } from 'react';
import {
  StMainButton,
  StMenuButtons,
  StSearchBarContainer,
  StSideBtnContainer
} from '../SideBarStyles';
import SearchBar from '../../layout/header/SearchBar';
import { setMenuToggle, showNotiToggle } from '../SideBarFn';
import { StNotiDot } from '../../../styles/headerStyle/HeaderStyle';
import { useNavigate } from 'react-router';

type SideBarRenderType = {
  setShowNoti: React.Dispatch<React.SetStateAction<boolean>>;
  newNotiExists: boolean;
  setNewNotiExists: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
  setShowSearchComp: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBarRender = ({
  setShowNoti,
  newNotiExists,
  setNewNotiExists,
  setIsShow,
  isShow,
  setShowSearchComp
}: SideBarRenderType) => {
  const isLogined = localStorage.getItem('userId');

  const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);

  const navi = useNavigate();

  const arr = [
    '검색',
    '중고거래',
    '커뮤니티',
    '판매하기',
    '소통하기',
    '채팅',
    '알림',
    '프로필'
  ];
  const NoLogined = ['검색', '중고거래', '커뮤니티', '로그인'];

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev);
  };

  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    id === '판매하기' && navi('/productsposts');
    id === '중고거래' && navi('/products');
    id === '커뮤니티' && navi('/community');
    id === '채팅' && navi('/chat');
    id === '프로필' && navi('/mypage');
    id === '로그인' && navi('/login');
    id === '소통하기' && navi('/community_write');
    if (id === '알림') {
      showNotiToggle({ setShowNoti, setNewNotiExists });
      return;
    }
    if (id === '검색') {
      toggleSearchBar();
      return;
    }
    setIsShow(false);
  };

  return (
    <StSideBtnContainer>
      {isShow && isSearchBarVisible && (
        <StSearchBarContainer $status={isLogined}>
          <SearchBar
            showSearchComp={isSearchBarVisible}
            setShowSearchComp={setIsSearchBarVisible}
          />
        </StSearchBarContainer>
      )}
      <StMainButton
        onClick={() => {
          setMenuToggle({ setIsShow, setShowNoti });
          setShowSearchComp(false);
          if (isShow && isSearchBarVisible) {
            toggleSearchBar();
          }
        }}
      >
        {newNotiExists && <StNotiDot></StNotiDot>}
        Menu
      </StMainButton>
      {isLogined &&
        arr.map((menu, i) => {
          if (isShow && menu === '알림') {
            return (
              <div key={i}>
                <StMenuButtons
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(e);
                  }}
                  id={menu}
                  $isShow
                  $index={i + 1}
                  key={i}
                >
                  {newNotiExists && <StNotiDot></StNotiDot>}
                  {menu}
                </StMenuButtons>
              </div>
            );
          }
          return (
            isShow && (
              <StMenuButtons
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(e);
                }}
                id={menu}
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
                id={menu}
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

export default SideBarRender;
