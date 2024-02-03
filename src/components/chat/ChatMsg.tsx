import React from 'react';
import { MessageType } from './types';
import { StChatballoon, StImageballoon } from './messageStyle';

type MessageProps = {
  msg: MessageType;
  findChatRoom: any;
  handleShowImage: any;
};

export default function ChatMsg({
  msg,
  findChatRoom,
  handleShowImage
}: MessageProps) {
  return (
    <>
      <div key={msg.id} style={{ cursor: 'pointer' }}>
        {msg.isFirst ? (
          <div id={msg.chat_room_id} onClick={(e) => findChatRoom(e)}>
            <StChatballoon style={{ cursor: 'pointer' }} key={msg.id}>
              <p style={{ textDecoration: 'underline', color: 'blue' }}>
                {msg.content === null ? null : msg.content}
              </p>
            </StChatballoon>
          </div>
        ) : (
          <div key={msg.id}>
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
          </div>
        )}
      </div>
    </>
  );
}
