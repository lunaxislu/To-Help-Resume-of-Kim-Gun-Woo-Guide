import React from 'react';
import { MessageType } from './types';
import { StMyChatballoon, StMyImageballoon } from './messageStyle';
import { User } from '@supabase/supabase-js';

type MessageProps = {
  msg: MessageType;
  curUser: User | null | undefined;
  findChatRoom: any;
  handleShowImage: any;
};

export default function ChatMyMsg({
  msg,
  findChatRoom,
  handleShowImage
}: MessageProps) {
  return (
    <>
      <div key={msg.id}>
        {msg.isFirst ? (
          <div id={msg.chat_room_id} onClick={(e) => findChatRoom(e)}>
            <StMyChatballoon style={{ cursor: 'pointer' }} key={msg.id}>
              <p style={{ textDecoration: 'underline', color: 'blue' }}>
                {msg.content === null ? null : msg.content}
              </p>
            </StMyChatballoon>
          </div>
        ) : (
          <div key={msg.id}>
            {msg.image_url &&
              msg.image_url?.map((img: string) => {
                return (
                  <StMyImageballoon
                    onClick={handleShowImage}
                    $url={img}
                    src={img}
                  />
                );
              })}
            {msg.content === null && null}
            {msg.content !== null && (
              <StMyChatballoon key={msg.id}>
                {msg.content === null ? null : msg.content}
              </StMyChatballoon>
            )}
          </div>
        )}
      </div>
    </>
  );
}
