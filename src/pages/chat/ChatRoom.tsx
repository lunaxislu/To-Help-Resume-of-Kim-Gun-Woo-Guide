import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useState
} from 'react';
import styled, { css, keyframes } from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
import { User } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';

// sender_read, receiver_read : boolean
// create_chat_room - receiver_name

const ImageInput = styled.input.attrs({ type: 'file' })`
  width: fit-content;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
`;

type RoomProps = {
  $current: string | undefined;
  children: ReactNode;
};

// 로그인 기능 연결

// 채팅 시작 시
// 내가 채팅하기 누른 게시물의 아이디 조회해서 데이터 가져오고
// 자동으로 첫 채팅에 보내지도록

export default function ChatRoom() {
  const [curUser, setCurUser] = useState<User | null>();
  const [chatInput, setChatInput] = useState<string>('');
  const [rooms, setRooms] = useState<any[] | null>();
  const [clicked, setClicked] = useState<string | undefined>('');
  const [messages, setMessages] = useState<any>(null);
  const [unread, setUnread] = useState<any[] | null>(null);
  const [images, setImages] = useState<string>('');

  const handleUserInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name === 'chat' && setChatInput(value);
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (curUser) {
      const { data, error } = await supabase.from('chat_messages').insert([
        {
          id: uuid(),
          sender_id: curUser?.id,
          chat_room_id: clicked,
          content: chatInput,
          image_url: images
        }
      ]);
      setChatInput('');
      setImages('');

      if (error) console.log('전송 실패', error);
    }
  };

  const getMessages = async (room_id: string | undefined) => {
    let { data: chat_messages, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('chat_room_id', room_id);

    if (chat_messages) {
      setMessages((prev: any) => [...prev, ...(chat_messages as any)]);
    }
  };

  const updateToRead = async (room_id: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .update({ isNew: true })
      .eq('chat_room_id', room_id)
      .select();
  };

  const unreadCount = async (room_id: string) => {
    let { data: chat_messages, error } = await supabase
      .from('chat_messages')
      .select()
      .eq('chat_room_id', room_id)
      .eq('isNew', false);

    return chat_messages?.length;
  };

  // 채팅방 목록을 생성할 때
  // 채팅방과 연결된 메세지 테이블에 isRead가 false인 데이터를 가져와
  // 그 length를 취합하여 각각의 채팅방에 표기..
  // 채팅방을 누르면 각각의 채팅방에 isRead를 true로 전부 update

  const handleCurClicked = (e: MouseEvent<HTMLDivElement>) => {
    setClicked(e.currentTarget.id);
  };

  const getRoomsforUser = async () => {
    const { data: chat_room, error } = await supabase
      .from('chat_room')
      .select('*');

    if (error) {
      console.error('Error fetching chat rooms:', error);
      return;
    }

    if (chat_room && curUser) {
      const filtered = chat_room.filter((room: any) => {
        // curUser.id와 일치하는 participant를 포함한 방만 필터링
        return room.participants.some(
          (participant: any) => participant.user_id === curUser.id
        );
      });
      setRooms(filtered);
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      // handleImageUpload로 넘겨줍니다
      handleImageUpload(file[0]);
    } else {
      return;
    }
  };

  const handleImageUpload = async (file: File) => {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`messages/${file.name}`, file, {
        contentType: file.type
      });

    if (error) {
      console.error('파일 업로드 실패:', error);
      return;
    }
    // 에러가 아니라면 스토리지에서 방금 올린 이미지의 publicURL을 받아와서
    const res = supabase.storage.from('images').getPublicUrl(data.path);
    // image 경로를 저장하는 state에 set 해주고
    setImages(res.data.publicUrl);
  };

  useEffect(() => {
    const chatMessages = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        (payload) => {
          if (rooms) {
            Promise.all(rooms.map((room) => unreadCount(room.id))).then(
              (counts) => {
                setUnread(counts);
              }
            );
            setMessages((prev: any) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      chatMessages.unsubscribe();
    };
  }, []);

  useEffect(() => {
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
    return () => {
      chatRooms.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        setCurUser(data.user);
        if (data.user) {
          getRoomsforUser();
        } else {
          console.log('user data is empty');
        }
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (curUser) {
      getRoomsforUser();
    }
  }, [curUser]);

  useEffect(() => {
    if (clicked) {
      setMessages([]);
      getMessages(clicked);
    }
  }, [clicked]);

  useEffect(() => {
    // 각 채팅방 목록이 업데이트될 때마다 안 읽은 메세지 수를 가져오고 상태에 저장
    if (rooms) {
      Promise.all(rooms.map((room) => unreadCount(room.id))).then((counts) => {
        setUnread(counts);
      });
    }
  }, [rooms]);

  return (
    <>
      <StChatContainer>
        <StChatList>
          {rooms?.map((room, i) => {
            return (
              <StListRoom
                onClick={handleCurClicked}
                $current={clicked}
                id={room.id}
                key={room.id}
              >
                <div
                  onClick={() => {
                    updateToRead(room.id);
                  }}
                  style={{ padding: '1rem' }}
                >
                  <p>{room.id}</p>
                  <p style={{ display: 'flex' }}>
                    새 메세지: &nbsp; {unread && unread[i]}
                  </p>
                </div>
              </StListRoom>
            );
          })}
        </StChatList>
        <StChatBoard>
          <StChatBoardHeader>
            <StChatBoardHeaderName>사용자 이름</StChatBoardHeaderName>
            점점점
          </StChatBoardHeader>
          <StChatGround>
            {messages
              ?.sort((a: any, b: any) => b.created_at - a.created_at)
              .map((msg: any) => {
                return msg.sender_id === curUser?.id ? (
                  <>
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
                    <StMyChatballoon key={msg.id}>
                      {msg.content}
                    </StMyChatballoon>
                  </>
                ) : (
                  <>
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
                  </>
                );
              })}
          </StChatGround>

          <StChatForm onSubmit={sendMessage}>
            <ImageInput onChange={handleImage} placeholder="이미지 보내기" />
            <StChatInput
              onChange={handleUserInput}
              type="text"
              name="chat"
              value={chatInput}
            />
          </StChatForm>
        </StChatBoard>
      </StChatContainer>
    </>
  );
}

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
  padding: 1rem 0 5rem 0;
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

const StChatForm = styled.form`
  width: 100%;
  position: sticky;
  bottom: 0;
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

const StListRoom = styled.div<RoomProps>`
  width: 100%;
  ${(props) => {
    if (props.$current === props.children) {
      return css`
        background-color: #eee;
      `;
    }
  }}
`;
