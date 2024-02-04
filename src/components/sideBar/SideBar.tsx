import React, { MouseEvent, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as St from '../../styles/headerStyle/HeaderStyle';
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

type SideBarProps = {
  notification: any[];
  newNotiExists: boolean;
  setNewNotiExists: React.Dispatch<SetStateAction<boolean>>;
  setNotification: React.Dispatch<SetStateAction<any[]>>;
};

const SideBar = ({
  notification,
  newNotiExists,
  setNewNotiExists,
  setNotification
}: SideBarProps) => {
  const isLogined = localStorage.getItem('userId');

  const [showNoti, setShowNoti] = useState<boolean>(false);

  const showNotiToggle = () => {
    setShowNoti((prev) => !prev);
    setNewNotiExists(false);
  };

  const deleteAllNotification = () => {
    setNotification([]);
    localStorage.removeItem('notifications');
  };
  const filterPrevNoti = (noti_id: string) => {
    const filtered = notification.filter((noti) => {
      return noti.id !== noti_id;
    });
    setNotification(filtered);
  };

  const clickNoti = (e: MouseEvent<HTMLDivElement>) => {
    const clickedItem = e.currentTarget.id;
    filterPrevNoti(clickedItem);
    setShowNoti(false);
    navi('/chat');
  };

  const [isShow, setIsShow] = useState<boolean>(false);
  const [showSearchComp, setShowSearchComp] = useState<boolean>(false);

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

  const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);

  const navi = useNavigate();

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev);
  };

  const setMenuToggle = () => {
    setIsShow((prev) => !prev);
    setShowNoti(false);
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
    if (innerText === '알림') {
      showNotiToggle();
      return;
    }
    if (innerText === '검색') {
      toggleSearchBar();
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
    <>
      {notification.length > 0 && showNoti && (
        <>
          <St.StNotiContainer>
            {notification.map((noti) => {
              return (
                <St.StNotiItem id={noti.id} onClick={clickNoti} key={noti.id}>
                  새로운 메세지가 있습니다.
                </St.StNotiItem>
              );
            })}
            <St.StNoticeButtonContainer>
              <St.StNoticeDeleteBtn onClick={deleteAllNotification}>
                알림 지우기
              </St.StNoticeDeleteBtn>
            </St.StNoticeButtonContainer>
          </St.StNotiContainer>
        </>
      )}
      {notification.length === 0 && showNoti && (
        <St.StNotiContainer>
          <St.StNotiItem onClick={() => setShowNoti(false)}>
            알림이 없습니다
          </St.StNotiItem>
          <St.StNoticeButtonContainer>
            <St.StNoticeDeleteBtn onClick={deleteAllNotification}>
              알림 지우기
            </St.StNoticeDeleteBtn>
          </St.StNoticeButtonContainer>
        </St.StNotiContainer>
      )}
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
          {notification && newNotiExists && <St.StNotiDot></St.StNotiDot>}
          Menu
        </StMainButton>
        {isLogined &&
          arr.map((menu, i) => {
            if (isShow && menu === '알림') {
              return (
                <>
                  <StMenuButtons
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(e);
                    }}
                    $isShow
                    $index={i + 1}
                    key={i}
                  >
                    {notification && newNotiExists && (
                      <St.StNotiDot></St.StNotiDot>
                    )}
                    {menu}
                  </StMenuButtons>
                </>
              );
            }
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
    </>
  );
};

export default SideBar;
