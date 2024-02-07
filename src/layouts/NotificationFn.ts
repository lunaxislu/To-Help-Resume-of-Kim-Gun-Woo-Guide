import { SetStateAction } from 'react';
import { supabase } from '../api/supabase/supabaseClient';
import { CustomUser } from '../pages/productsDetail/types';

// 알림 울리기
export const playAlert = () => {
  const ring = new Audio('/assets/Twitter Notification_sound_effect.mp3');
  setTimeout(() => {
    ring.currentTime = 0.5;
    ring.play();
  }, 1000);
};

// 로컬스토리지에 알림 저장
export const saveNotiToLocal = (notification: any[]) => {
  localStorage.setItem('notification', JSON.stringify(notification));
};

// 로컬 스토리지에서 알림 데이터를 불러오는 함수
export const getNotificationsFromLocal = (
  setNotification: React.Dispatch<SetStateAction<any[]>>
) => {
  const notifications = localStorage.getItem('notification');
  setNotification(notifications ? JSON.parse(notifications) : []);
};

export const getUserData = async (
  userId: string,
  setCurUser: React.Dispatch<SetStateAction<CustomUser | null>>
) => {
  const { data: currentUser, error } = await supabase
    .from('user')
    .select('*')
    .eq('uid', userId);

  // 현재 로그인 유저의 데이터가 있다면
  if (currentUser && currentUser.length > 0) {
    setCurUser(currentUser[0]);
  }
  // 로그이 유저 없음 에러
  if (error) console.log('logined user not exists');
};
