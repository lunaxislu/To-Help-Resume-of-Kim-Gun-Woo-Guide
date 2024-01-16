import styled, { css, keyframes } from 'styled-components';
import { RoomStyledProps } from '../../components/chat/types';

export const StFadeAni = keyframes`
  from{
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StChatContainer = styled.div`
  width: 100%;
  max-width: 1114px;
  max-height: 597px;
  display: flex;
  border: 1px solid black;
  height: fit-content;
  margin: auto;
  animation: ${StFadeAni} 1s forwards;
  font-family: 'Pretendard-Regular';
`;

const StChatList = styled.div`
  width: 724.9px;
  height: 597px;
  max-width: 384px;
  max-height: 597px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  overflow-y: scroll;
`;

const StChatBoard = styled.div`
  width: 70%;
  height: 597px;
  border: 1px solid black;
  overflow-y: hidden;
  position: relative;
  animation: ${StFadeAni} 1s forwards;
`;

const StChatGround = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 1rem 0 7rem 0;
`;

const StChatBoardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  padding: 1.375rem 1.25rem;
  background-color: #eee;
`;

const StChatBoardHeaderName = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
`;

const StChatForm = styled.form`
  width: 100%;
  position: sticky;
  bottom: 0;
`;

const ImageInput = styled.input.attrs({ type: 'file' })`
  width: fit-content;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
`;

const StChatInput = styled.input`
  width: 100%;
  padding: 1rem;
  position: sticky;
  bottom: 0;
  border: none;
  outline: none;
  background-color: #eee;
`;

const StListRoom = styled.div<RoomStyledProps>`
  width: 100%;
  ${(props) => {
    if (props.$current === props.children) {
      return css`
        background-color: #eee;
      `;
    }
  }}
`;

export {
  StChatContainer,
  StChatList,
  StListRoom,
  StChatBoard,
  StChatGround,
  StChatBoardHeader,
  StChatBoardHeaderName,
  StChatForm,
  ImageInput,
  StChatInput
};
