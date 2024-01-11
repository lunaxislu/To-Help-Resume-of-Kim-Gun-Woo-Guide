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

const FadeAni = keyframes`
  from{
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  border: 1px solid black;
  height: fit-content;
  max-height: 700px;
  margin: auto;
  animation: ${FadeAni} 1s forwards;
`;
const ChatList = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  overflow-y: scroll;
`;

const ChatBoard = styled.div`
  width: 70%;
  border: 1px solid black;
  overflow-y: scroll;
  position: relative;
  animation: ${FadeAni} 1s forwards;
`;

const ChatBoardHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  padding: 1rem;
  background-color: #eee;
`;

const Chatballoon = styled.div`
  width: fit-content;
  background-color: #eee;
  margin-right: auto;
  margin-left: 1rem;
  margin-block: 1rem;
  padding: 1rem;
  border-radius: 40px;
  font-weight: 600;
`;

const MyChatballoon = styled.div`
  width: fit-content;
  background-color: yellow;
  margin-left: auto;
  margin-right: 1rem;
  margin-block: 1rem;
  padding: 1rem;
  border-radius: 60px;
  font-weight: 600;
`;

const ChatForm = styled.form`
  width: 100%;
  position: sticky;
  bottom: 0;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 1rem;
  position: sticky;
  bottom: 0;
  border: none;
  outline: none;
  background-color: #eee;
`;

type RoomProps = {
  $current: string | undefined;
  children: ReactNode;
};

const ListRoom = styled.div<RoomProps>`
  width: 100%;
  ${(props) => {
    if (props.$current === props.children) {
      return css`
        background-color: #eee;
      `;
    }
  }}
`;

export default function ChatRoom() {
  const [curUser, setCurUser] = useState<User | null>();
  const [chatInput, setChatInput] = useState<string>('');
  const [rooms, setRooms] = useState<any[] | null>();
  const [clicked, setClicked] = useState<string | undefined>('');
  const [messages, setMessages] = useState<any>(null);
  const [unread, setUnread] = useState<any[] | null>(null);

  const handleUserInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name === 'chat' && setChatInput(value);
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (curUser) {
        const { data, error } = await supabase.from('chat_messages').insert([
          {
            id: uuid(),
            sender_id: curUser?.id,
            chat_room_id: clicked,
            content: chatInput
          }
        ]);
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

        let { data: chat_room } = await supabase.from('chat_room').select('*');
        console.log(chat_room);
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
    return <p>{chat_messages?.length}</p>;
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
          console.log('업뎃!');
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
    console.log(1);
  }, [rooms]);

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
      <ChatContainer>
        <ChatList>
          {rooms?.map((room, i) => {
            return (
              <ListRoom
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
              </ListRoom>
            );
          })}
        </ChatList>
        <ChatBoard>
          <ChatBoardHeader>사용자 이름</ChatBoardHeader>
          {messages?.map((msg: any) => {
            return msg.sender_id === curUser?.id ? (
              <MyChatballoon key={msg.id}>{msg.content}</MyChatballoon>
            ) : (
              <Chatballoon style={{ textAlign: 'left' }} key={msg.id}>
                {msg.content}
              </Chatballoon>
            );
          })}
          <ChatForm onSubmit={sendMessage}>
            <ChatInput
              onChange={handleUserInput}
              type="text"
              name="chat"
              value={chatInput}
            />
          </ChatForm>
        </ChatBoard>
      </ChatContainer>
    </>
  );
}
