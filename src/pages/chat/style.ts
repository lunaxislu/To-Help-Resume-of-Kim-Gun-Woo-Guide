import styled, { css, keyframes } from 'styled-components';
import { RoomStyledProps } from '../../components/chat/types';

export const StFadeAni = keyframes`
  from{
    opacity: 0;
    transform: translateX(5%);
  }

  to {
    opacity: 1;
    transform: translateX(0%);
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
  animation: ${StFadeAni} 0.6s forwards;
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
`;

const StChatGround = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 1rem 0 9rem 0;
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
  display: flex;
  align-items: center;
  gap: 0.6rem;
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

const StChatInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  position: sticky;
  bottom: 0;
  border: none;
  outline: none;
  background-color: #eee;
  resize: none;
`;

const StListRoom = styled.div<RoomStyledProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 1.25rem;
  cursor: pointer;
  ${(props) => {
    if (props.$current === props.children) {
      return css`
        background-color: #eee;
      `;
    }
  }}
  &:hover {
    background-color: #eee;
  }
`;

const StListUpper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StListLower = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;

  p {
    flex: 1;
  }
  span {
    color: #1d1d1d70;
  }
`;

type ChatProfileType = {
  $url: string;
};

const StListUserProfile = styled.div<ChatProfileType>`
  width: 28px;
  height: 28px;
  border-radius: 50px;
  background: ${(props) => (props.$url ? css`url(${props.$url})` : '#d9d9d9')};
  background-size: cover;
`;

const StUserInfoBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StUnreadCount = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 0.3rem 0.6rem;
  text-align: center;
  border-radius: 50px;
  line-height: 1;
  color: white;
  background-color: var(--primary-color);
`;

const StListBody = styled.div`
  display: 'flex';
  flex-direction: 'column';
  gap: '0.6rem';
  height: 'fit-content';
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
  StChatInput,
  StListUserProfile,
  StUserInfoBox,
  StUnreadCount,
  StListBody,
  StListUpper,
  StListLower
};
