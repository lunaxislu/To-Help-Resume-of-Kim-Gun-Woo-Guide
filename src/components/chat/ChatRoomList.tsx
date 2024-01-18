import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabase/supabaseClient';
import * as St from '../../pages/chat/style';
import { MessageType, RoomType } from './types';
import parseDate from '../../util/getDate';

type Props = {
  rooms: RoomType[] | null | undefined;
  handleCurClicked: React.MouseEventHandler<HTMLDivElement>;
  clicked: string | undefined;
  unread: any[] | null;
};

const ChatRoomList: React.FC<Props> = ({
  rooms,
  handleCurClicked,
  clicked,
  unread
}: Props) => {
  const [newMsg, setNewMsg] = useState<any | null>(null);

  const updateToRead = async (room_id: string) => {
    await supabase
      .from('chat_messages')
      .update({ isNew: true })
      .eq('chat_room_id', room_id)
      .select();
  };

  const handleRealtime = () => {
    // 채팅방 테이블 구독
    const chatRooms = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_room' },
        (payload) => {}
      )
      .subscribe();

    const chatMessages = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        (payload) => {
          setNewMsg(payload.new);
        }
      )
      .subscribe();
  };

  const [allMessage, setAllMessage] = useState<MessageType[] | null>(null);

  // 메세지를 다 가져오고, 현재 로그인 된 유저가 속한 채팅방의 메세지라면 allMessage에 set 하고 밑에서 map을 돌면서
  // 이 div의 id와 같은 채팅방 메세지만 출력
  const getAllMessage = async () => {
    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('*');

    setAllMessage(messages);
  };

  useEffect(() => {
    handleRealtime();
    getAllMessage();
  }, []);

  // 모든 채팅방은 2개
  // 메세지는 map으로 훑기 너무 많다 index가 안 닿음
  // 각 방에 맞게 필터 된 배열을 시간순으로 정렬하고
  // 그 중 가장 오래 된 메세지를 출력

  const findMatchMessage = (room: string): any => {
    if (allMessage !== null) {
      const Matched = allMessage
        .map((msg) => {
          return msg.chat_room_id === room && msg;
        })
        .sort((a: any, b: any) => a.created_at - b.created_at)
        .filter((msg) => msg !== false);

      return Matched[Matched.length - 1];
    }
  };

  return (
    <>
      {rooms?.map((room, i) => {
        return (
          <St.StListRoom
            onClick={handleCurClicked}
            $current={clicked}
            id={room.id}
            key={room.id}
          >
            <St.StListUpper
              onClick={() => {
                updateToRead(room.id);
              }}
            >
              <St.StUserInfoBox>
                <St.StListUserProfile
                  $url={
                    room?.participants[0].avatar_url === null
                      ? ''
                      : room?.participants[0].avatar_url
                  }
                ></St.StListUserProfile>
                <p>{room.room_name}</p>
              </St.StUserInfoBox>
              <St.StUnreadCount>{unread && unread[i]}</St.StUnreadCount>
            </St.StListUpper>

            <St.StListLower>
              <p>{findMatchMessage(room.id).content}</p>
              <span>{parseDate(findMatchMessage(room.id).created_at)}</span>
            </St.StListLower>
          </St.StListRoom>
        );
      })}
    </>
  );
};

export default ChatRoomList;
