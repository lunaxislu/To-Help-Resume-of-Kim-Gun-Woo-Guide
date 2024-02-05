// 모든 채팅방은 2개
// 메세지는 map으로 훑기 너무 많다 index가 안 닿음
// 각 방에 맞게 필터 된 배열을 시간순으로 정렬하고
// 그 중 가장 오래 된 메세지를 출력

import { User } from '@supabase/supabase-js';
import { MessageType, RoomType } from '../types';
import { supabase } from '../../../api/supabase/supabaseClient';
import { SetStateAction } from 'react';
import { Product } from '../../../api/supabase/products';

// 모든 메세지를 가져와 해당 방의 아이디와 일치하는 값을 가지고 있다면 보여주기
export const findMatchMessage = (
  room: string,
  allMessage: MessageType[] | null
): any => {
  if (allMessage !== null) {
    const Matched = allMessage
      .map((msg) => {
        return msg.chat_room_id === room && msg;
      })
      .sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .filter((msg) => msg !== false);

    return Matched[Matched.length - 1];
  }
};

export const unreadCount = async (
  room_id: string,
  curUser: User | null | undefined
) => {
  let { data: chat_messages, error } = await supabase
    .from('chat_messages')
    .select()
    .eq('chat_room_id', room_id)
    .eq('isNew', true);

  if (error) console.log('count error', error);

  return chat_messages?.filter(
    (msg: MessageType) => msg.sender_id !== curUser?.id
  ).length;
};

export const handleRealtime = (
  setNewMsg: React.Dispatch<SetStateAction<any | null>>
) => {
  // 채팅방 테이블 구독
  const chatRooms = supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'chat_room' },
      (payload) => {}
    )
    .subscribe();

  const chatMessages = supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'chat_messages' },
      (payload) => {
        setNewMsg(payload.new);
      }
    )
    .subscribe();
};

export const getSortedRooms = (rooms: RoomType[] | null | undefined) => {
  return rooms
    ?.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    })
    .sort((a, b) => {
      return (
        new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
      );
    });
};

// product(게시물)의 id가 chatRoom의 about의 값이 되기 때문에
// 채팅과 연결 된 게시물의 가져오려면 각 room의 about값과 같은 product를 찾아서 => isSell이나, 존재 여부에 따라 조건부 렌더
export const checkProductsStatus = (room_id: string, products: Product[]) => {
  const matchedProduct = products.filter(
    (item: Product) => item.id === room_id
  );

  if (matchedProduct && matchedProduct[0]?.isSell === true) {
    return true;
  } else {
    return false;
  }
};
