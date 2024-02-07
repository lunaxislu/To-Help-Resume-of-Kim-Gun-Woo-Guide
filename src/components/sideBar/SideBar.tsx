import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as St from '../../styles/headerStyle/HeaderStyle';
import {} from './SideBarStyles';
import { SideBarProps } from './SideBarTypes';
import {
  deleteAllNotification,
  filterPrevNoti,
  getUserName,
  setMenuToggle
} from './SideBarFn';
import NotiRender from './noti/NotiRender';
import SideBarRender from './sideBarRender/SideBarRender';

const SideBar = ({
  notification,
  setNewNotiExists,
  setNotification,
  newNotiExists
}: SideBarProps) => {
  const [showNoti, setShowNoti] = useState<boolean>(false);
  const [sender, setSender] = useState<any[]>([]);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [showSearchComp, setShowSearchComp] = useState<boolean>(false);

  const navi = useNavigate();

  const clickNoti = (e: MouseEvent<HTMLDivElement>) => {
    const clickedItem = e.currentTarget.id;
    filterPrevNoti({
      noti_id: clickedItem,
      notification,
      setNewNotiExists,
      setNotification
    });
    setShowNoti(false);
    setNewNotiExists(false);
    setMenuToggle({ setIsShow, setShowNoti });
    navi('/chat');
  };

  useEffect(() => {
    return () => {
      setShowSearchComp(false);
    };
  }, []);

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
    <div style={{ position: 'relative' }}>
      <SideBarRender
        isShow={isShow}
        newNotiExists={newNotiExists}
        setIsShow={setIsShow}
        setNewNotiExists={setNewNotiExists}
        setShowNoti={setShowNoti}
        setShowSearchComp={setShowSearchComp}
      />
      <NotiRender
        clickNoti={clickNoti}
        deleteAllNotification={deleteAllNotification}
        notification={notification}
        sender={sender}
        setIsShow={setIsShow}
        setNotification={setNotification}
        setShowNoti={setShowNoti}
        showNoti={showNoti}
        setNewNotiExists={setNewNotiExists}
      />
    </div>
  );
};

export default SideBar;
