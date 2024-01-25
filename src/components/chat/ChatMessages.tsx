import React, { MouseEvent, useEffect } from 'react';
import styled from 'styled-components';
import type { MessageCompProps, MessageType } from './types';
import { useNavigate } from 'react-router';

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

  if (messages.length === 0) return <div>로딩중</div>;

  return (
    <>
      {messages
        .sort(
          (a: MessageType, b: MessageType) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        .map((msg: any) => {
          return msg.sender_id === curUser?.id ? (
            <div key={msg.id}>
              {msg.image_url && (
                <StMyImageballoon
                  onClick={handleShowImage}
                  src={msg.image_url}
                  alt=""
                />
              )}
              {msg.content === null && null}
              {msg.content !== null && (
                <StMyChatballoon key={msg.id}>
                  {msg.content === null ? null : msg.content}
                </StMyChatballoon>
              )}
            </div>
          ) : (
            <div key={msg.id} style={{ cursor: 'pointer' }}>
              {msg.image_url && <StImageballoon src={msg.image_url} alt="" />}
              {msg.content === null && null}
              <StChatballoon style={{ textAlign: 'left' }} key={msg.id}>
                {msg.content}
              </StChatballoon>
            </div>
          );
        })}
    </>
  );
};

const StMyImageballoon = styled.img`
  width: 200px;
  display: block;
  margin-right: 2.5rem;
  margin-left: auto;
  padding: 1rem;
  background: #eee;
  border-radius: 12px;
  cursor: pointer;
  margin-block: 2rem;

  @media screen and (max-width: 768px) {
    width: 130px;
    margin-right: 2rem;
    padding: 0.5rem;
  }
`;

const StImageballoon = styled.img`
  width: 200px;
  display: block;
  margin-right: auto;
  margin-left: 2.5rem;
  padding: 1rem;
  background: #eee;
  border-radius: 12px;
  cursor: pointer;
  margin-block: 2rem;

  @media screen and (max-width: 768px) {
    width: 130px;
    margin-left: 2rem;
    padding: 0.5rem;
  }
`;

const StChatballoon = styled.div`
  width: fit-content;
  color: var(--11-gray);
  background-color: var(--3-gray);
  margin-right: auto;
  margin-left: 2.7rem;
  margin-block: 1rem;
  padding: 1.2rem 2.7rem;
  border-radius: 40px;
  font-weight: 600;
  line-height: 1.2;
  font-size: 1.4rem;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }
`;

const StMyChatballoon = styled.div`
  width: fit-content;
  color: var(--2-gray);
  background-color: var(--opc-100);
  margin-left: auto;
  margin-right: 2.7rem;
  margin-block: 1.6rem;
  padding: 0.9rem 3.1rem;
  border-radius: 60px;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: break-spaces;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }
`;

export default ChatMessages;
