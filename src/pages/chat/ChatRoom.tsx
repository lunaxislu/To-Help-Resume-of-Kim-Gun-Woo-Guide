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

const ImageInput = styled.input.attrs({ type: 'file' })`
  width: 100%;
  padding: 1rem;
`;

type RoomProps = {
  $current: string | undefined;
  children: ReactNode;
};

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

  // 작동순서 3번
  // 메세지를 전송하면
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (curUser) {
        const { data, error } = await supabase.from('chat_messages').insert([
          {
            id: uuid(),
            sender_id: curUser?.id,
            chat_room_id: clicked,
            content: chatInput,
            // image_url 필드값으로 publick_url이 저장된 state를 메세지와 함께 저장합니다
            image_url: images
          }
        ]);
        setChatInput('');
        setImages('');
      }
    } catch (err) {
      console.log('전송 실패', err);
    }
  };

  const getMessages = async (room_id: string | undefined) => {
    let { data: chat_messages, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('chat_room_id', room_id);
    setMessages((prev: any) => [...prev, chat_messages]);
  };

  const makeChatRoom = async (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    try {
      if (curUser && curUser.identities !== undefined) {
        const { data, error } = await supabase.from('chat_room').insert([
          {
            participants: [
              { user_id: id, user_name: 'test1' },
              {
                user_id: curUser.id,
                user2_name: 'test2'
              }
            ]
          }
        ]);
      }
    } catch (err) {
      console.log('failed', err);
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
    try {
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
    } catch (error) {
      console.error('Error in getRoomsforUser:', error);
    }
  };

  useEffect(() => {
    const chatMessages = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        (payload) => {
          setMessages((prev: any) => [...prev, payload.new]);
          if (rooms) {
            Promise.all(rooms.map((room) => unreadCount(room.id))).then(
              (counts) => {
                setUnread(counts);
              }
            );
          }
        }
      )
      .subscribe();

    return () => {
      chatMessages.unsubscribe();
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

  // 작동순서 1번
  // file type 인풋에 change event 발생 시 파일을 받아서
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      // handleImageUpload로 넘겨줍니다
      handleImageUpload(file[0]);
    } else {
      return;
    }
  };

  // 작동순저 2번
  // file을 받은 이 함수는
  const handleImageUpload = async (file: File) => {
    // storage에 이미지를 업로드 하고
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`messages/${file.name}`, file, {
        contentType: file.type
      });

    // 에러나면 에러 주고
    if (error) {
      console.error('파일 업로드 실패:', error);
      return;
    }
    // 에러가 아니라면 스토리지에서 방금 올린 이미지의 publicURL을 받아와서
    const res = supabase.storage.from('images').getPublicUrl(data.path);
    // image 경로를 저장하는 state에 set 해주고
    setImages(res.data.publicUrl);
  };

  return (
    <>
      <div>
        <button
          onClick={makeChatRoom}
          id="a5664ecd-c9f2-475f-8308-3d4db8be0489"
        >
          유저 1과 채팅하기
        </button>
        <button
          onClick={makeChatRoom}
          id="5f59cf0d-4787-4d25-bd8d-dcc8004d233d"
        >
          유저 2와 채팅하기
        </button>
      </div>
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
                  key={room.id}
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
          <StChatBoardHeader>사용자 이름</StChatBoardHeader>
          {messages?.map((msg: any) => {
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
                <StMyChatballoon key={msg.id}>{msg.content}</StMyChatballoon>
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

const StFadeAni = keyframes`
  from{
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StChatContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  border: 1px solid black;
  height: fit-content;
  max-height: 700px;
  margin: auto;
  animation: ${StFadeAni} 1s forwards;
`;
const StChatList = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  overflow-y: scroll;
`;

const StChatBoard = styled.div`
  width: 70%;
  border: 1px solid black;
  overflow-y: scroll;
  position: relative;
  animation: ${StFadeAni} 1s forwards;
`;

const StChatBoardHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  padding: 1rem;
  background-color: #eee;
`;

const StChatballoon = styled.div`
  width: fit-content;
  background-color: #eee;
  margin-right: auto;
  margin-left: 1rem;
  margin-block: 1rem;
  padding: 1rem;
  border-radius: 40px;
  font-weight: 600;
`;

const StMyChatballoon = styled.div`
  width: fit-content;
  background-color: yellow;
  margin-left: auto;
  margin-right: 1rem;
  margin-block: 1rem;
  padding: 1rem;
  border-radius: 60px;
  font-weight: 600;
`;

const StMyImgChatballoon = styled.div`
  width: 500px;
  background-color: yellow;
  margin-left: auto;
  margin-right: 1rem;
  margin-block: 1rem;
  padding: 1rem;
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
