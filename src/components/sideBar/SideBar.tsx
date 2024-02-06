import React, {
  Component,
  JSXElementConstructor,
  MouseEvent,
  useEffect,
  useRef,
  useState
} from 'react';
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
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoPeopleSharp, IoPersonSharp } from 'react-icons/io5';
import { BiEdit, BiWon } from 'react-icons/bi';
import { BsChatDotsFill } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { LuPalette } from 'react-icons/lu';

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
    { default: <FaMagnifyingGlass />, hover: '검색' },
    { default: <LuPalette />, hover: '중고거래' },
    { default: <IoPeopleSharp />, hover: '커뮤니티' },
    { default: <BiWon />, hover: '판매하기' },
    { default: <BiEdit />, hover: '소통하기' },
    { default: <BsChatDotsFill />, hover: '채팅' },
    { default: <FaBell />, hover: '알림' },
    { default: <IoPersonSharp />, hover: '프로필' }
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
    const { id } = e.currentTarget;
    id === '판매하기' && navi('/productsposts');
    id === '중고거래' && navi('/products');
    id === '커뮤니티' && navi('/community');
    id === '채팅' && navi('/chat');
    id === '프로필' && navi('/mypage');
    id === '로그인' && navi('/login');
    id === '소통하기' && navi('/community_write');
    if (id === '알림') {
      showNotiToggle();
      return;
    }
    if (id === '검색') {
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
            if (isShow && menu.hover === '알림') {
              return (
                <>
                  <StMenuButtons
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(e);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.innerHTML = menu.hover;
                    }}
                    id={menu.hover}
                    $isShow
                    $index={i + 1}
                    key={i}
                  >
                    {newNotiExists && <St.StNotiDot></St.StNotiDot>}
                    {menu.default}
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
                  onMouseEnter={(e) => {
                    e.currentTarget.innerHTML = menu.hover;
                  }}
                  id={menu.hover}
                  $isShow
                  $index={i + 1}
                  key={i}
                >
                  {menu.default}
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
