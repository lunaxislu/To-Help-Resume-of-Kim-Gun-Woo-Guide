import { SetStateAction } from 'react';
import { supabase } from '../../api/supabase/supabaseClient';

type ShowNotiProps = {
  setShowNoti: React.Dispatch<React.SetStateAction<boolean>>;
  setNewNotiExists: React.Dispatch<React.SetStateAction<boolean>>;
};

export const showNotiToggle = ({
  setShowNoti,
  setNewNotiExists
}: ShowNotiProps) => {
  setShowNoti((prev) => !prev);
  setNewNotiExists(false);
};

export type DeleteAllNotiProps = {
  setNotification: React.Dispatch<React.SetStateAction<any[]>>;
};

export const deleteAllNotification = ({
  setNotification
}: DeleteAllNotiProps) => {
  setNotification([]);
  localStorage.removeItem('notifications');
};

type FilterPrevNotiProps = {
  noti_id: string;
  notification: any[];
  setNotification: React.Dispatch<React.SetStateAction<any[]>>;
  setNewNotiExists: React.Dispatch<React.SetStateAction<boolean>>;
};

export const filterPrevNoti = ({
  noti_id,
  notification,
  setNotification,
  setNewNotiExists
}: FilterPrevNotiProps) => {
  const filtered = notification.filter((noti) => {
    return noti.id !== noti_id;
  });
  setNotification(filtered);
  setNewNotiExists(false);
};

export const getUserName = async (senderId: string) => {
  const { data: senderInfo, error: fetchFailUser } = await supabase
    .from('user')
    .select('*')
    .eq('uid', senderId);

  if (fetchFailUser) console.log('발신자 정보를 찾을 수 없음');
  if (senderInfo) return senderInfo;
};

type MenuToggleProps = {
  setIsShow: React.Dispatch<SetStateAction<boolean>>;
  setShowNoti: React.Dispatch<SetStateAction<boolean>>;
};

export const setMenuToggle = ({ setIsShow, setShowNoti }: MenuToggleProps) => {
  setIsShow((prev) => !prev);
  setShowNoti(false);
};
