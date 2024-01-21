import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import type { MessageCompProps } from './types';

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

  return (
    <>
      {messages
        ?.sort((a: any, b: any) => a.created_at - b.created_at)
        .map((msg: any) => {
          return msg.sender_id === curUser?.id ? (
            <div key={msg.id}>
              {msg.image_url && (
                <img
                  onClick={handleShowImage}
                  style={{
                    width: '200px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: '2.7rem',
                    padding: '1rem',
                    background: '#eee',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    marginBlock: '2rem'
                  }}
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
              {msg.image_url && (
                <img
                  style={{
                    width: '200px',
                    display: 'block',
                    marginRight: 'auto',
                    marginLeft: '1rem',
                    padding: '1rem',
                    background: '#eee',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    marginBlock: '2rem'
                  }}
                  src={msg.image_url}
                  alt=""
                />
              )}
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
`;

export default ChatMessages;
