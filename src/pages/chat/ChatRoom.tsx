import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState
} from 'react';
import { supabase } from '../../api/supabase/supabaseClient';
import { User } from '@supabase/supabase-js';
import ChatRoomList from '../../components/chat/ChatRoomList';
import ChatMessages from '../../components/chat/ChatMessages';
import { v4 as uuid, v4 } from 'uuid';

import type {
  MessageType,
  Participants,
  RoomType
} from '../../components/chat/types';
import * as St from './style';

export default function ChatRoom() {
  const [curUser, setCurUser] = useState<User | null>();
  const [chatInput, setChatInput] = useState<string>('');
  const [rooms, setRooms] = useState<RoomType[] | null>();
  const [clicked, setClicked] = useState<string | undefined>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [unread, setUnread] = useState<number[] | null>(null);
  const [images, setImages] = useState<string>('');

  // 채팅 인풋을 받아 state에 업뎃
  const handleUserInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name === 'chat' && setChatInput(value);
  };

  // 클릭 된 채팅방의 아이디를 state에 저장
  const handleCurClicked = (e: MouseEvent<HTMLDivElement>) => {
    setClicked(e.currentTarget.id);
  };

  // submit 발생 시 인풋 초기화
  const resetInput = () => {
    setChatInput('');
    setImages('');
  };

  // 메세지 전송 - 메세지 테이블에 insert
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (!curUser) return;

    const messageTemp = {
      id: uuid(),
      sender_id: curUser?.id,
      chat_room_id: clicked,
      content: chatInput,
      image_url: images
    };

    if (curUser) {
      const { error } = await supabase
        .from('chat_messages')
        .insert([messageTemp]);

      resetInput();

      if (error) console.log('전송 실패', error);
    }
  };
  // 어느 채팅방을 클릭 시 해당 채팅방과 연결 된 메세지 가져오는 함수
  const getMessages = async (room_id: string | undefined) => {
    let { data: chat_messages, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('chat_room_id', room_id);

    if (chat_messages) {
      // 기존 메시지를 완전히 대체하는 방식으로 수정
      setMessages(chat_messages as MessageType[]);
    }

    if (error) console.log('failed set message', error);
  };

  // 안 읽은 메세지를 count 해주는 함수
  const unreadCount = async (room_id: string) => {
    let { data: chat_messages, error } = await supabase
      .from('chat_messages')
      .select()
      .eq('chat_room_id', room_id)
      .eq('isNew', false);

    if (error) console.log('count error', error);

    return chat_messages?.length;
  };

  // mount 시 유저 정보를 확인하여 유저가 속한 채팅방 가져오는 함수
  const getRoomsforUser = async () => {
    const { data: chat_room, error } = await supabase
      .from('chat_room')
      .select('*');

    // curUser.id와 일치하는 participant를 포함한 방만 필터링
    if (chat_room && curUser) {
      const filtered = chat_room.filter((room: RoomType) => {
        return room.participants.some(
          (participant: Participants) => participant.user_id === curUser.id
        );
      });
      setRooms(filtered);
    }

    if (error) {
      console.error('채팅방 가져오기 오류', error);
      return;
    }
  };

  // 이미지 인풋의 파일을 받아 storage에 올리는 함수에 전달
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      handleImageUpload(file[0]);
    }
    if (!file) console.log('다시 시도');
  };

  // 이미지 정보 받아서 storage에 올리는 함수
  const handleImageUpload = async (file: File) => {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`messages/${uuid()}`, file, {
        contentType: file.type
      });

    if (error) {
      console.error('파일 업로드 실패:', error);
      return;
    }

    // 에러가 아니라면 스토리지에서 방금 올린 이미지의 publicURL을 받아와서 image state에 set
    const res = supabase.storage.from('images').getPublicUrl(data.path);
    setImages(res.data.publicUrl);
  };

  // 실시간으로 구독 중인 DB 관리하는 함수
  const handleRealtime = () => {
    // 채팅방 테이블 구독
    const chatRooms = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_room' },
        (payload) => {
          getRoomsforUser();
        }
      )
      .subscribe();
    const chatMessages = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        (payload) => {
          // 변경사항이 발생하면 해당 채팅방의 메시지를 다시 불러옴
          if (clicked) {
            getMessages(clicked);
          }
        }
      )
      .subscribe();

    // unmount 시 구독 해제 하기 위해서 반환
    return { chatRooms };
  };

  // // unmount 시 구독 해제
  useEffect(() => {
    const { chatRooms } = handleRealtime();
    handleRealtime();
    // unmount 시 구독 해제하기
    return () => {
      chatRooms.unsubscribe();
    };
  }, []);

  // mount시 로그인한 유저의 데이터를 가져와 state에 set
  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data) setCurUser(data.user);
      if (error) console.log('user data fetch failed', error);
    };

    getUserData();
  }, []);

  // 클릭 된 채팅방 id, 현재 로그인 유저에 따라서
  useEffect(() => {
    // 유저가 소속된 채팅방을 가져오는 부분
    if (curUser) {
      getRoomsforUser();
      handleRealtime();
    }
    // 해당 채팅방에 해당하는 메세지를 가져오고
    if (clicked) {
      setMessages([]);
      getMessages(clicked);
    }
  }, [clicked, curUser]);

  useEffect(() => {
    getRoomsforUser();
  }, []);

  // 각 채팅방이 업데이트 시 안 읽은 메세지 수를 가져오고 상태에 저장
  useEffect(() => {
    if (rooms) {
      Promise.all(rooms.map((room) => unreadCount(room.id))).then((counts) => {
        setUnread(counts as number[]);
      });
    }
  }, [rooms]);

  const getUserName = (rooms: RoomType[] | undefined | null) => {
    if (rooms && clicked) {
      const room = rooms.find((room: RoomType) => room.id === clicked);
      return room?.room_name;
    }
    return undefined; // 또는 다른 기본값
  };

  return (
    <>
      <St.StChatContainer>
        <St.StChatList>
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
                <p>
                  {getUserName(rooms) !== undefined &&
                    String(rooms && getUserName(rooms))}
                </p>
              </St.StChatBoardHeaderName>
              점점점
            </St.StChatBoardHeader>
          )}

          <St.StChatGround>
            <ChatMessages messages={messages} curUser={curUser} />
          </St.StChatGround>
          <St.StChatForm onSubmit={sendMessage}>
            <St.ImageInput onChange={handleImage} placeholder="이미지 보내기" />
            <St.StChatInput
              onChange={handleUserInput}
              type="text"
              name="chat"
              value={chatInput}
            />
          </St.StChatForm>
        </St.StChatBoard>
      </St.StChatContainer>
    </>
  );
}
