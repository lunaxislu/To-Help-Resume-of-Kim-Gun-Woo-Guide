import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router';
import ScrollTopButton from './ScrollTopButton';
import { supabase } from '../api/supabase/supabaseClient';
import styled from 'styled-components';
import { CustomUser } from '../pages/productsDetail/types';
import { Participants } from '../components/chat/types';
import SideBar from '../components/sideBar/SideBar';
import {
  getNotificationsFromLocal,
  getUserData,
  saveNotiToLocal
} from './NotificationFn';

const Layout = () => {
  const location = useLocation();
  const [showTopbutton, setShowTopButton] = useState(false);
  const [curUser, setCurUser] = useState<CustomUser | null>(null);

  // 실시간 알림
  const [notification, setNotification] = useState<any[]>([]);
  const [newNotiExists, setNewNotiExists] = useState<boolean>(false);
  const userID = localStorage.getItem('userId');

  // 유저 데이터를 가져오고 실시간 구독이 실행되도록
  useEffect(() => {
    const getLocalUser = async () => {
      const userId = await localStorage.getItem('userId');
      if (userId) {
        await getUserData(userId, setCurUser);
      }
    };
    getLocalUser();
  }, []);

  useEffect(() => {
    // 유저 데이터가 있을 때 실시간 구독이 실행되도록 - 안 그러면 첫 알림이 전역으로 알림이 간다
    if (curUser) {
      // 캐싱된 알림 가져오기
      getNotificationsFromLocal(setNotification);

      // 메세지 테이블 실시간 알림 구독
      const chatMessages = supabase
        .channel('custom-insert-channel')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'chat_messages' },
          async (payload: any) => {
            const { data: chatRooms, error } = await supabase
              .from('chat_room')
              .select('participants')
              .eq('id', payload.new.chat_room_id);

            // 소속 된 채팅방의 업데이트인지 확인
            if (chatRooms && chatRooms.length > 0) {
              const exists = chatRooms.map((room) => {
                return room.participants.some(
                  (part: Participants) => part.user_id === curUser?.uid
                );
              });

              // 내가 보낸 메세지가 아닐 때 알림 작동
              if (
                exists &&
                exists.length > 0 &&
                payload.new.sender_id !== userID
              ) {
                setNotification((prev) => [payload.new, ...prev]);
                setNewNotiExists(true);
                // playAlert();
              }
            }
            // 유저가 속한 채팅방의 알림만 filter해서 state에 set
          }
        )
        .subscribe();

      return () => {
        chatMessages.unsubscribe();
      };
    }
  }, [curUser]);

  useEffect(() => {
    saveNotiToLocal(notification);
  }, [notification]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage =
        (scrollY / (documentHeight - windowHeight)) * 100;

      if (
        (['/', '/community_write', '/productsposts'].includes(
          location.pathname
        ) &&
          scrollPercentage >= 50) ||
        (['/mypage', '/products', '/community', '/search-results'].includes(
          location.pathname
        ) &&
          scrollY >= 300)
      ) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <Wrapper>
      <SideBar
        notification={notification}
        newNotiExists={newNotiExists}
        setNewNotiExists={setNewNotiExists}
        setNotification={setNotification}
      />
      <Header
        notification={notification}
        newNotiExists={newNotiExists}
        setNewNotiExists={setNewNotiExists}
        setNotification={setNotification}
      />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      {showTopbutton && <ScrollTopButton />}
      <Footer />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: auto;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;
