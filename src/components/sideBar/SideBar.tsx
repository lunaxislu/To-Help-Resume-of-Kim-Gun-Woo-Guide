import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as St from '../../styles/headerStyle/HeaderStyle';
import {
  StMainButton,
  StMenuButtons,
  StSearchBarContainer,
  StSideBtnContainer
} from './SideBarStyles';
import SearchBar from '../layout/header/SearchBar';
import { SideBarProps } from './SideBarTypes';
import { supabase } from '../../api/supabase/supabaseClient';
// 아이콘
import { FaBell } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoPeopleSharp } from 'react-icons/io5';
import { IoPersonSharp } from 'react-icons/io5';
import { BiWon } from 'react-icons/bi';
import { LuPalette } from 'react-icons/lu';
import { TbLogin, TbLogout } from 'react-icons/tb';
import { BsChatDotsFill } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';

const SideBar = ({
  notification,
  newNotiExists,
  setNewNotiExists,
  setNotification
}: SideBarProps) => {
  const isLogined = localStorage.getItem('userId');

  const [showNoti, setShowNoti] = useState<boolean>(false);
  const [sender, setSender] = useState<any[]>([]);

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
    setNewNotiExists(false);
  };

  const clickNoti = (e: MouseEvent<HTMLDivElement>) => {
    const clickedItem = e.currentTarget.id;
    filterPrevNoti(clickedItem);
    setShowNoti(false);
    setNewNotiExists(false);
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

  const getUserName = async (senderId: string) => {
    const { data: senderInfo, error: fetchFailUser } = await supabase
      .from('user')
      .select('*')
      .eq('uid', senderId);

    if (fetchFailUser) console.log('발신자 정보를 찾을 수 없음');
    if (senderInfo) return senderInfo;
  };

  useEffect(() => {
    // 각 채팅방 목록이 업데이트될 때마다 안 읽은 메세지 수를 가져오고 상태에 저장
    if (notification) {
      Promise.all(notification.map((noti) => getUserName(noti.sender_id))).then(
        (userInfo) => {
          setSender(userInfo);
        }
      );
    }
  }, [notification]);

  return (
    <>
      <StSideBtnContainer>
        {notification.length > 0 && showNoti && (
          <>
            <St.StNotiContainer>
              {notification?.reverse().map((noti, i) => {
                return (
                  <St.StNotiItem id={noti.id} onClick={clickNoti} key={noti.id}>
                    {sender[i] &&
                      `${
                        sender[i][0]?.nickname
                          ? sender[i][0]?.nickname
                          : sender[i][0]?.username
                      }님의 메세지가 왔습니다`}
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
            setMenuToggle();
            setShowSearchComp(false);
            if (isShow && isSearchBarVisible) {
              toggleSearchBar();
            }
          }}
        >
          {newNotiExists && <St.StNotiDot></St.StNotiDot>}
          Menu
        </StMainButton>
        {isLogined &&
          arr.reverse().map((menu, i) => {
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
                    {newNotiExists && <St.StNotiDot></St.StNotiDot>}
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
