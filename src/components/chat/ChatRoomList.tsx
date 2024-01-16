import React from 'react';
import { supabase } from '../../api/supabase/supabaseClient';
import * as St from '../../pages/chat/style';
import { RoomType } from './types';

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
  const updateToRead = async (room_id: string) => {
    await supabase
      .from('chat_messages')
      .update({ isNew: true })
      .eq('chat_room_id', room_id)
      .select();
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
            <div
              onClick={() => {
                updateToRead(room.id);
              }}
              style={{ padding: '1rem' }}
            >
              <p>{room.id}</p>
              <p style={{ display: 'flex' }}>
                새 메세지: &nbsp; {unread && unread[i]}
              </p>
            </div>
          </St.StListRoom>
        );
      })}
    </>
  );
};

export default ChatRoomList;
