import React, { MouseEvent } from 'react';
import type { MessageCompProps, MessageType } from './types';
import { useNavigate } from 'react-router';
import { supabase } from '../../api/supabase/supabaseClient';
import ChatMyMsg from './ChatMyMsg';
import ChatMsg from './ChatMsg';

const ChatMessages = ({
  messages,
  curUser,
  setShowImage,
  setClickedImages
}: MessageCompProps) => {
  const handleShowImage = (e: MouseEvent<HTMLImageElement>) => {
    setShowImage(true);
    setClickedImages(e.currentTarget.src);
  };
  const navi = useNavigate();

  const findChatRoom = async (e: MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;

    const { data: room, error } = await supabase
      .from('chat_room')
      .select('about')
      .eq('id', id);

    if (error) console.log('not founded', error);

    if (room) {
      handleNaviToProduct(room[0].about);
    }
  };

  const handleNaviToProduct = (id: string) => {
    navi(`/products/detail/${id}`);
  };

  return (
    <>
      {messages
        .sort(
          (a: MessageType, b: MessageType) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        .map((msg: MessageType, i: number) => {
          return msg.sender_id === curUser?.id ? (
            <ChatMyMsg
              msg={msg}
              curUser={curUser}
              findChatRoom={findChatRoom}
              handleShowImage={handleShowImage}
            />
          ) : (
            <ChatMsg
              msg={msg}
              findChatRoom={findChatRoom}
              handleShowImage={handleShowImage}
            />
          );
        })}
    </>
  );
};

export default ChatMessages;
