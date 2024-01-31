import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { User } from '@supabase/supabase-js';
import ChatRoomList from '../../components/chat/ChatRoomList';
import ChatMessages from '../../components/chat/ChatMessages';
import type {
  MessageType,
  Participants,
  RoomType
} from '../../components/chat/types';
import * as St from './style';
import ChatHeader from './chatHeader/ChatHeader';
import ChatForm from './chatForm/ChatForm';
import { UtilForChat } from './chat_utils/functions';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { supabase } from '../../api/supabase/supabaseClient';

const StChatRoomBar = styled.div`
  width: 100%;
  max-width: 768px;
  padding: 1rem 0.4rem;
  gap: 1rem;
  display: none;
  align-items: center;
  border-bottom: 0.1rem solid var(--3-gray);

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const StHeaderArrow = styled(IoIosArrowBack)`
  font-size: 2rem;
  height: max-content;
  color: var(--opc-100);
  cursor: pointer;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export default function ChatRoom() {
  const [showImage, setShowImage] = useState<boolean>(false);
  const [showMene, setShowMenu] = useState<boolean>(false);
  const [clickedImage, setClickedImages] = useState<string>('');
  const [curUser, setCurUser] = useState<User | null | undefined>();
  const [rooms, setRooms] = useState<RoomType[] | null>();
  const [clicked, setClicked] = useState<string | undefined>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [unread, setUnread] = useState<number[] | null>(null);
  const [targetUser, setTargetUser] = useState<any[]>();
  const [showFileInput, setShowFileInput] = useState<boolean>(false);
  const [myRooms, setMyRooms] = useState<RoomType[] | null>();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [boardPosition, setboardPosition] = useState<number>(100);

  const scrollRef = useRef<HTMLDivElement>(null);
  const navi = useNavigate();

  const utilFunctions = new UtilForChat();

  // 채팅 페이지에 들어오면
  // 현재 본인이 속한 채팅방을 모두 가져와 리스트에 그린다
  const getChatRooms = async () => {
    const { data: allRooms, error: AllRoomFetchError } = await supabase
      .from('chat_room')
      .select('*');

    if (allRooms) {
      const myRoom = allRooms.filter((room: RoomType) => {
        return room.participants.some(
          (participant: Participants) => participant.user_id === curUser?.id
        );
      });
      setRooms(myRoom);
    }
  };

  useEffect(() => {
    if (curUser) {
      getChatRooms();
    }
  }, [curUser]);

  // 우측에서 채팅방 등장(모바일 대응)
  const handleBoardPosition = () => {
    if (isMobile) {
      window.history.pushState(null, '', '');
      setboardPosition(0);
    } else {
      setboardPosition(0);
    }
  };

  // 우측으로 채팅방 퇴장(모바일 대응)
  const handleHideBoardPosition = (): void => {
    setboardPosition(100);
  };

  // 이미지 크게 보기 토글
  const handleHideImage = (e: MouseEvent<HTMLElement>) => {
    setShowImage(false);
    e.stopPropagation();
  };

  // 클릭 된 채팅방의 아이디를 state에 저장
  const handleCurClicked = (e: MouseEvent<HTMLDivElement>) => {
    setClicked(e.currentTarget.id);
  };

  // 클릭 된 채팅방 id, 현재 로그인 유저에 따라서
  useEffect(() => {
    // 유저가 소속된 채팅방을 가져오는 부분
    if (curUser) {
      utilFunctions.handleRealtime(
        clicked,
        setMessages,
        curUser,
        setRooms,
        messages
      );
    }

    // 해당 채팅방에 해당하는 메세지를 가져오고
    if (clicked) {
      setMessages([]);
      utilFunctions.getMessages(clicked, setMessages, messages);
      utilFunctions.handleTargetUser(rooms, clicked, setTargetUser);
    }
  }, [clicked, curUser]);

  // mount시 로그인한 유저의 데이터를 가져와 state에 set
  useEffect(() => {
    const { chatRooms } = utilFunctions.handleRealtime(
      clicked,
      setMessages,
      curUser,
      setRooms,
      messages
    );
    utilFunctions.handleRealtime(
      clicked,
      setMessages,
      curUser,
      setRooms,
      messages
    );

    utilFunctions.getMessages(clicked, setMessages, messages);
    utilFunctions.getUserData(setCurUser);

    // unmount 시 구독 해제하기
    return () => {
      chatRooms.unsubscribe();
    };
  }, []);

  // 채팅방 로드 시 스크롤 최하단으로
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const checkDevice = (agent: string) => {
    const mobileRegex = [
      /Android/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return mobileRegex.some((mobile) => agent.match(mobile));
  };

  useEffect(() => {
    if (checkDevice(window.navigator.userAgent)) setIsMobile(true);
    if (!checkDevice(window.navigator.userAgent)) setIsMobile(false);
  }, []);

  useEffect(() => {
    const handleClickBrowserBackBtn = () => {
      // 뒤로가기 누르면 쌓였던 스택이 하나씩 빠진다
      if (boardPosition === 0) {
        handleHideBoardPosition();
      } else {
        navi(-1);
      }
    };

    window.addEventListener('popstate', handleClickBrowserBackBtn);

    return () => {
      window.removeEventListener('popstate', handleClickBrowserBackBtn);
    };
  }, [boardPosition]);

  /////////////////////////////// 본체 ///////////////////////////////
  return (
    <St.StChatWrapper>
      {showImage && (
        <St.StImageViewerBg onClick={handleHideImage}>
          <St.StImageViewer>
            <St.StViewerImg src={clickedImage} />
          </St.StImageViewer>
        </St.StImageViewerBg>
      )}

      <St.StChatContainer>
        <StChatRoomBar>
          <StHeaderArrow onClick={() => navi(-1)} />
          채팅목록
        </StChatRoomBar>
        <St.StChatList onClick={() => setShowFileInput(false)}>
          <ChatRoomList
            handleBoardPosition={handleBoardPosition}
            clicked={clicked}
            rooms={rooms}
            handleCurClicked={handleCurClicked}
            unread={unread}
            curUser={curUser}
          />
        </St.StChatList>
        <St.StChatBoard $position={boardPosition}>
          {clicked && (
            <ChatHeader
              handleHideBoardPosition={handleHideBoardPosition}
              showMene={showMene}
              clicked={clicked}
              curUser={curUser}
              targetUser={targetUser}
              setRooms={setRooms}
              setMessages={setMessages}
              setClicked={setClicked}
              rooms={rooms}
              setShowMenu={setShowMenu}
            />
          )}

          <St.StChatGround ref={scrollRef}>
            <ChatMessages
              messages={messages}
              curUser={curUser}
              setShowImage={setShowImage}
              setClickedImages={setClickedImages}
            />
          </St.StChatGround>
          <ChatForm
            clicked={clicked}
            curUser={curUser}
            setShowFileInput={setShowFileInput}
            showFileInput={showFileInput}
          />
        </St.StChatBoard>
      </St.StChatContainer>
    </St.StChatWrapper>
  );
}
