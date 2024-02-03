import React, { SetStateAction, useEffect, useState } from 'react';
import * as St from '../style';
import { SupabaseAPI } from '../supabaseChat/supabase_chat';
import { User } from '@supabase/supabase-js';
import {
  MessageType,
  Participants,
  RoomType
} from '../../../components/chat/types';
import { BsThreeDots } from 'react-icons/bs';
import { supabase } from '../../../api/supabase/supabaseClient';

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
  setShowMenu,
  handleHideBoardPosition
}: ChatHeaderPropsType) => {
  const supaService = new SupabaseAPI();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentRoomsUser, setCurrentRoomsUser] = useState<any>();

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

  const getRoomInfo = async (room_id: string) => {
    const { data: room, error } = await supabase
      .from('chat_room')
      .select('*')
      .eq('id', clicked);

    if (room) {
      const currentRoomTargetUser = room[0].participants.filter(
        (part: Partial<Participants>) => {
          return part.user_id !== curUser?.id;
        }
      );

      setCurrentRoomsUser(currentRoomTargetUser);
    }
  };

  useEffect(() => {
    if (checkDevice(window.navigator.userAgent)) setIsMobile(true);
    if (checkDevice(window.navigator.userAgent)) setIsMobile(false);
    getRoomInfo(clicked);
  }, [clicked]);

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
          $url={currentRoomsUser && currentRoomsUser[0]?.avatar_url}
        ></St.StListUserProfile>
        <p>{currentRoomsUser && currentRoomsUser[0]?.user_name}</p>
      </St.StChatBoardHeaderName>
      <BsThreeDots
        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
        onClick={handleShowMenuToggle}
      />
    </St.StChatBoardHeader>
  );
};

export default ChatHeader;
