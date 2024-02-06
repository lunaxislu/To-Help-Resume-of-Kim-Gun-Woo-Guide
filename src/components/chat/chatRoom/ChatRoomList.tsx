import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../../api/supabase/supabaseClient';
import { Product } from '../../../api/supabase/products';
import { StOverayText, StRoomName, StStatusOveray } from '../ChatCompStyles';
import { checkDevice } from './CheckDvice';
import {
  checkProductsStatus,
  findMatchMessage,
  handleRealtime,
  unreadCount
} from './ChatRoomFn';
import type { MessageType, RoomProps, RoomType } from '../types';
import parseDate from '../../../util/getDate';
import * as St from '../../../pages/chat/style';

const ChatRoomList: React.FC<RoomProps> = ({
  rooms,
  handleCurClicked,
  clicked,
  handleBoardPosition,
  curUser
}: RoomProps) => {
  const [newMsg, setNewMsg] = useState<any | null>(null);
  const [allMessage, setAllMessage] = useState<MessageType[] | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [unread, setUnread] = useState<(number | undefined)[]>([]);

  const updateToRead = useCallback(async (room_id: string) => {
    await supabase
      .from('chat_messages')
      .update({ isNew: false })
      .eq('chat_room_id', room_id)
      .eq('isNew', true);

    await supabase.from('chat_room').update({ unread: 0 }).eq('id', room_id);
  }, []);

  // 메세지를 다 가져오고, 현재 로그인 된 유저가 속한 채팅방의 메세지라면
  // allMessage에 set 하고 밑에서 map을 돌면서
  // 이 div의 id와 같은 채팅방 메세지만 출력
  const getAllMessage = async () => {
    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('*');

    if (error) console.log('fetch All Messages Failed');

    setAllMessage(messages);
  };

  const getProductsforRoom = async () => {
    const { data: product, error } = await supabase
      .from('products')
      .select('*');

    if (error) console.log('fetch products error');

    if (product && product.length > 0) {
      setProducts(product);
    }
  };

  // participants에서 상대방 정보를 가져오는 함수
  const chatTarget = (room: RoomType) => {
    const targetInfo = room.participants.filter((info) => {
      return info.user_id !== curUser?.id;
    });
    return targetInfo[0];
  };

  useEffect(() => {
    handleRealtime(setNewMsg);
    getAllMessage();
    getProductsforRoom();

    if (checkDevice(window.navigator.userAgent)) setIsMobile(true);
    if (checkDevice(window.navigator.userAgent)) setIsMobile(false);
  }, []);

  // 각 채팅방 목록이 업데이트될 때마다 안 읽은 메세지 수를 가져오고 상태에 저장
  useEffect(() => {
    if (rooms) {
      try {
        Promise.all(rooms.map((room) => unreadCount(room.id, curUser))).then(
          (counts) => {
            setUnread(counts);
          }
        );
      } catch (err) {
        console.log('안 읽은 메세지 set 오류');
      }
    }
  }, [rooms, clicked]);

  return (
    <St.StChatListItem>
      {rooms?.map((room, i) => {
        return (
          <St.StListRoom
            id={room.id}
            key={room.id}
            $current={clicked}
            onClick={(e) => {
              updateToRead(room.id);
              handleCurClicked(e);
              handleBoardPosition();
            }}
          >
            {/* onClick={handleBoardPosition} 완료 상품 관련 채팅을 띄워줘야할지,,, 고민즁... */}
            {checkProductsStatus(room.about, products) === true && (
              <StStatusOveray onClick={handleBoardPosition}>
                <StOverayText>판매 완료 상품입니다</StOverayText>
              </StStatusOveray>
            )}
            <St.StListUpper>
              <St.StUserInfoBox>
                <St.StListUserProfile
                  $url={
                    chatTarget(room).avatar_url === null
                      ? ''
                      : chatTarget(room).avatar_url
                  }
                ></St.StListUserProfile>
                <div>
                  <p>{`${chatTarget(room).user_name}`}</p>
                  <StRoomName>
                    {room.room_name.length >= 20
                      ? `${room.room_name.substring(0, 20)}...`
                      : room.room_name}
                  </StRoomName>
                </div>
              </St.StUserInfoBox>
              <St.StUnreadCount>{unread && unread[i]}</St.StUnreadCount>
            </St.StListUpper>
            <St.StListLower>
              <p>
                {findMatchMessage(room.id, allMessage)?.content
                  ? findMatchMessage(room.id, allMessage)?.content
                  : ''}
              </p>
              <span>
                {findMatchMessage(room.id, allMessage)
                  ? parseDate(findMatchMessage(room.id, allMessage)?.created_at)
                  : '신규 생성 채팅방'}
              </span>
            </St.StListLower>
          </St.StListRoom>
        );
      })}
    </St.StChatListItem>
  );
};

export default ChatRoomList;
