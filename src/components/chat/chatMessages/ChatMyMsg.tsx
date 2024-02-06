import React from 'react';
import { MessageType } from '../types';
import {
  StChatFirstMsg,
  StMessageBox,
  StMyChatballoon,
  StMyImageballoon
} from '../ChatCompStyles';
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
      <StMessageBox key={msg.created_at}>
        {msg.isFirst && (
          <div
            id={msg.chat_room_id}
            onClick={(e) => findChatRoom(e)}
            key={msg.created_at}
          >
            <StMyChatballoon key={msg.id}>
              <StChatFirstMsg>
                {msg.content === null ? null : msg.content}
              </StChatFirstMsg>
            </StMyChatballoon>
          </div>
        )}
        {!msg.isFirst && (
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
      </StMessageBox>
    </>
  );
}
