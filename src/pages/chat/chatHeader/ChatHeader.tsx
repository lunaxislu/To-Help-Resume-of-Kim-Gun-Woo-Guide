import React, { SetStateAction, useEffect, useState } from 'react';
import * as St from '../style';
import { SupabaseAPI } from '../supabaseChat/supabase_chat';
import { User } from '@supabase/supabase-js';
import { MessageType, RoomType } from '../../../components/chat/types';
import { BsThreeDots } from 'react-icons/bs';
import { UtilForChat } from '../chat_utils/functions';
import { useNavigate } from 'react-router';

interface ChatHeaderPropsType {
  showMene: boolean;
  clicked: string;
  curUser: User | null | undefined;
  targetUser: any[] | undefined;
  setRooms: React.Dispatch<SetStateAction<RoomType[] | null | undefined>>;
  setMessages: React.Dispatch<SetStateAction<MessageType[]>>;
  setClicked: React.Dispatch<SetStateAction<string | undefined>>;
  rooms: RoomType[] | null | undefined;
  setShowMenu: React.Dispatch<SetStateAction<boolean>>;
  handleHideBoardPosition: any;
}

const ChatHeader = ({
  showMene,
  clicked,
  curUser,
  targetUser,
  setRooms,
  setMessages,
  setClicked,
  rooms,
  setShowMenu,
  handleHideBoardPosition
}: ChatHeaderPropsType) => {
  const supaService = new SupabaseAPI();
  const utilFunctions = new UtilForChat();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const navi = useNavigate();

  const handleShowMenuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  const checkDevice = (agent: string) => {
    const mobileRegex = [
      /Android/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return mobileRegex.some((mobile) => agent.match(mobile));
  };

  useEffect(() => {
    if (checkDevice(window.navigator.userAgent)) setIsMobile(true);
    if (checkDevice(window.navigator.userAgent)) setIsMobile(false);
  }, []);

  return (
    <St.StChatBoardHeader>
      {showMene && (
        <St.StMenuBox>
          <St.StMenu
            onClick={() => {
              supaService.handleOutChatRoom(
                clicked,
                curUser,
                targetUser,
                setRooms,
                setMessages,
                setClicked,
                handleHideBoardPosition
              );
              setShowMenu(false);
            }}
          >
            채팅방 나가기
          </St.StMenu>
          <St.StMenu>신고하기</St.StMenu>
        </St.StMenuBox>
      )}
      <St.StChatBoardHeaderName>
        <St.StHeaderArrow onClick={() => handleHideBoardPosition()} />

        <St.StListUserProfile
          $url={targetUser && targetUser[0]?.avatar_url}
        ></St.StListUserProfile>
        <p>
          {utilFunctions.getUserName(rooms, clicked) !== undefined &&
            String(rooms && utilFunctions.getUserName(rooms, clicked))}
        </p>
      </St.StChatBoardHeaderName>
      <BsThreeDots
        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
        onClick={handleShowMenuToggle}
      />
    </St.StChatBoardHeader>
  );
};

export default ChatHeader;
