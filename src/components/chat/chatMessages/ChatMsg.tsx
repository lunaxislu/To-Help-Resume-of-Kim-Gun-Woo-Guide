import React from 'react';
import {
  StChatFirstMsg,
  StChatballoon,
  StImageballoon,
  StMessageBox
} from '../ChatCompStyles';
import { MessageProps } from '../types';

export default function ChatMsg({
  msg,
  findChatRoom,
  handleShowImage
}: MessageProps) {
  return (
    <>
      <StMessageBox key={msg.id}>
        {msg.isFirst ? (
          <div id={msg.chat_room_id} onClick={(e) => findChatRoom(e)}>
            <StChatballoon key={msg.id}>
              <StChatFirstMsg>
                {msg.content === null ? null : msg.content}
              </StChatFirstMsg>
            </StChatballoon>
          </div>
        ) : (
          <StMessageBox key={msg.id}>
            {msg.image_url &&
              msg.image_url?.map((img: string) => {
                return (
                  <StImageballoon
                    onClick={handleShowImage}
                    $url={img}
                    src={img}
                  />
                );
              })}
            {msg.content === null && null}
            {msg.content !== null && (
              <StChatballoon key={msg.id}>
                {msg.content === null ? null : msg.content}
              </StChatballoon>
            )}
          </StMessageBox>
        )}
      </StMessageBox>
    </>
  );
}
