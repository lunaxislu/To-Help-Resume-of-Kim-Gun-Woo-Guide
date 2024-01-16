import React from 'react';
import styled from 'styled-components';
import type { MessageCompProps } from './types';

const ChatMessages = ({ messages, curUser }: MessageCompProps) => {
  return (
    <>
      {messages
        ?.sort((a: any, b: any) => b.created_at - a.created_at)
        .map((msg: any) => {
          return msg.sender_id === curUser?.id ? (
            <div key={msg.id}>
              {msg.image_url && (
                <img
                  style={{
                    width: '200px',
                    display: 'block',
                    marginLeft: 'auto'
                  }}
                  src={msg.image_url}
                  alt=""
                ></img>
              )}
              <StMyChatballoon key={msg.id}>{msg.content}</StMyChatballoon>
            </div>
          ) : (
            <div key={msg.id}>
              {msg.image_url && (
                <img
                  style={{
                    width: '200px',
                    display: 'block',
                    marginRight: 'auto'
                  }}
                  src={msg.image_url}
                  alt=""
                />
              )}
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
  background-color: #eee;
  margin-right: auto;
  margin-left: 1rem;
  margin-block: 1rem;
  padding: 0.75rem 1.688rem;
  border-radius: 40px;
  font-weight: 600;
`;

const StMyChatballoon = styled.div`
  width: fit-content;
  background-color: yellow;
  margin-left: auto;
  margin-right: 1rem;
  margin-block: 1rem;
  padding: 0.75rem 1.688rem;
  border-radius: 60px;
  font-weight: 600;
`;

export default ChatMessages;
