import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import { User } from '@supabase/supabase-js';
import ChatRoomList from '../../components/chat/ChatRoomList';
import ChatMessages from '../../components/chat/ChatMessages';
import type { MessageType, RoomType } from '../../components/chat/types';
import * as St from './style';
import styled, { css } from 'styled-components';
import { FaImage } from 'react-icons/fa';
import {
  getMessages,
  getRoomsforUser,
  getUserData,
  getUserName,
  handleImage,
  handleRealtime,
  handleTargetUser,
  sendMessage,
  unreadCount
} from './HelperFunctions';

export default function ChatRoom() {
  const [curUser, setCurUser] = useState<User | null>();
  const [chatInput, setChatInput] = useState<string>('');
  const [rooms, setRooms] = useState<RoomType[] | null>();
  const [clicked, setClicked] = useState<string | undefined>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [unread, setUnread] = useState<number[] | null>(null);
  const [images, setImages] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const FormRef = useRef<HTMLFormElement>(null);
  const [targetUser, setTargetUser] = useState<any[]>();
  const [showFileInput, setShowFileInput] = useState<boolean>(false);

  // 채팅 인풋을 받아 state에 업뎃
  const handleUserInput = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    name === 'chat' && setChatInput(value);
  };

  // 클릭 된 채팅방의 아이디를 state에 저장
  const handleCurClicked = (e: MouseEvent<HTMLDivElement>) => {
    setClicked(e.currentTarget.id);
  };

  // 줄바꿈인지 제출인지 판단하는 함수
  const isPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      } else {
        // 폼 제출
        const formElement = FormRef.current;
        if (formElement) {
          sendMessage(
            e,
            curUser,
            clicked,
            chatInput,
            images,
            setChatInput,
            setImages
          );
        }
      }
    }
  };

  // // unmount 시 구독 해제
  useEffect(() => {
    const { chatRooms } = handleRealtime(clicked, setMessages);
    handleRealtime(clicked, setMessages);
    // unmount 시 구독 해제하기
    return () => {
      chatRooms.unsubscribe();
    };
  }, []);

  // mount시 로그인한 유저의 데이터를 가져와 state에 set
  useEffect(() => {
    getUserData(setCurUser);
  }, []);

  // 클릭 된 채팅방 id, 현재 로그인 유저에 따라서
  useEffect(() => {
    // 유저가 소속된 채팅방을 가져오는 부분
    if (curUser) {
      getRoomsforUser(curUser, setRooms);
      handleRealtime(clicked, setMessages);
    }
    // 해당 채팅방에 해당하는 메세지를 가져오고
    if (clicked) {
      setMessages([]);
      getMessages(clicked, setMessages);
      handleTargetUser(rooms, clicked, setTargetUser);
    }
  }, [clicked, curUser]);

  useEffect(() => {
    getMessages(clicked, setMessages);
  }, []);

  // 각 채팅방이 업데이트 시 안 읽은 메세지 수를 가져오고 상태에 저장
  useEffect(() => {
    if (rooms) {
      Promise.all(rooms.map((room) => unreadCount(room.id))).then((counts) => {
        setUnread(counts as number[]);
      });
    }
  }, [rooms]);

  // 채팅방 로드 시 스크롤 최하단으로
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <St.StChatContainer>
        <St.StChatList onClick={() => setShowFileInput(false)}>
          <ChatRoomList
            clicked={clicked}
            rooms={rooms}
            handleCurClicked={handleCurClicked}
            unread={unread}
          />
        </St.StChatList>
        <St.StChatBoard>
          {clicked && (
            <St.StChatBoardHeader>
              <St.StChatBoardHeaderName>
                <StUserProfile
                  $url={targetUser && targetUser[0]?.avatar_url}
                ></StUserProfile>
                <p>
                  {getUserName(rooms, clicked) !== undefined &&
                    String(rooms && getUserName(rooms, clicked))}
                </p>
              </St.StChatBoardHeaderName>
              점점점
            </St.StChatBoardHeader>
          )}

          <St.StChatGround ref={scrollRef}>
            <ChatMessages messages={messages} curUser={curUser} />
          </St.StChatGround>
          <St.StChatForm
            onSubmit={(e) =>
              sendMessage(
                e,
                curUser,
                clicked,
                chatInput,
                images,
                setChatInput,
                setImages
              )
            }
            ref={FormRef}
          >
            {showFileInput && (
              <St.ImageInput
                onChange={(e) => handleImage(e, setImages)}
                placeholder="이미지 보내기"
              />
            )}
            <div style={{ display: 'flex' }}>
              <St.StChatInput
                onChange={handleUserInput}
                onKeyDown={isPressEnter}
                name="chat"
                value={chatInput}
              />
              <div style={{ position: 'relative' }}>
                <FaImage
                  onClick={() => setShowFileInput((prev: boolean) => !prev)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translate(0%,-50%)',
                    background: '#ececec',
                    color: `var(--primary-color)`,
                    padding: '.2rem',
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
          </St.StChatForm>
        </St.StChatBoard>
      </St.StChatContainer>
    </>
  );
}

type ChatProfileType = {
  $url: string;
};

const StUserProfile = styled.div<ChatProfileType>`
  width: 28px;
  height: 28px;
  border-radius: 50px;
  background: ${(props) => (props.$url ? css`url(${props.$url})` : '#d9d9d9')};
  background-size: cover;
`;
