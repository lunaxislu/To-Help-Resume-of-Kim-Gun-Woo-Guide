import { v4 as uuid } from 'uuid';
import { supabase } from '../../../api/supabase/supabaseClient';
import { RoomType } from '../../../components/chat/types';
import { CustomUser, Product } from '../types';
import { NavigateFunction } from 'react-router';
import { SetStateAction } from 'react';

// product를 가져오자 url 주소에 있는 것이 제품 ID니까 그것과 같은 것으로
export const getProductInfo = async (productId: string | undefined) => {
  const { data: productInfo, error: getProductError } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId);

  if (getProductError) {
    console.log('제품 정보 fetch 실패');
    return;
  }

  if (productInfo) {
    return productInfo;
  }
};

type RoomParticipant = {
  about: string; // 채팅방이 어떤 제품과 관련이 있는지 제품 id를 넣음
  isSeller: boolean; // 구매자와 판매자를 나누는 기준
  user_id: string | undefined; // 사용자 id 또는 undefined
  user_name: string | undefined; // 사용자 이름 또는 undefined
  avatar_url: string | undefined; // 사용자 아바타 URL 또는 undefined
};

type RoomFormType = {
  id: string; // 고유 채팅방 id
  room_name: string; // 채팅방 이름
  about: string; // 채팅방이 어떤 제품과 관련이 있는지 제품 id를 넣음
  participants: RoomParticipant[]; // 참여자 정보와 제품 정보를 넣어 참여자와 제품이 모두 같은 방의 중복 생성을 방지
};

// 방 생성 - 방의 정보(참여자, 관련 제품, 방 id)를 insert 하여 새로운 방을 생성
export const createRoom = async (roomInfo: RoomFormType[]) => {
  const { data: chatRoom, error: roomCreateError } = await supabase
    .from('chat_room')
    .insert(roomInfo)
    .select();

  // 에러 처리
  if (roomCreateError) {
    console.log('생성 실패', roomCreateError);
    return false;
  }

  if (chatRoom) {
    return chatRoom;
  }
};

// 첫 게시 메세지 보내기
export const sendInitMessage = async (
  product: Product[] | null,
  chatRoom: RoomType[],
  currentUser: CustomUser | null,
  navi: NavigateFunction
) => {
  // 현재 게시물에 대한 채팅방이면서, 내가 속한 채팅방

  if (product && chatRoom) {
    const InitMessage = [
      {
        id: uuid(),
        sender_id: currentUser?.uid,
        content: `제목: ${product[0].title}`,
        chat_room_id: chatRoom[0]?.id,
        isFirst: true
      },
      {
        id: uuid(),
        sender_id: currentUser?.uid,
        content: `${product[0].price.toLocaleString('kr-KO')}원`,
        chat_room_id: chatRoom[0]?.id
      },
      {
        id: uuid(),
        sender_id: currentUser?.uid,
        content: '상품에 관심 있어요!',
        chat_room_id: chatRoom[0]?.id
      }
    ];

    // 메세지를 전송
    const { data, error } = await supabase
      .from('chat_messages')
      .insert(InitMessage);

    // 메세지 전송 실패
    if (error) console.log('Send Messages Failed', error);
    // 성공
    else navi('/chat');
  }
};

/**
 * 유저의 chat_room 필드값에 room_id 추가
 * @param user : user의 정보
 * @param chatRoom : 채팅방 정보
 * @returns
 */
export const handleAddRoomIntoUsers = async (
  user: CustomUser | null,
  chatRoom: RoomType[]
) => {
  // 각 유저의 chat_rooms 필드값 가져옴
  const { data: userRoom, error: noUserRoom } = await supabase
    .from('user')
    .select('chat_rooms')
    .eq('id', user?.uid);

  // 에러 처리
  if (noUserRoom) {
    console.log('사용자의 채팅방 정보 fetch 실패', noUserRoom.message);
  }

  // 현재 사용자의 정보 채팅방 정보가 있다면
  if (userRoom) {
    // 방이 null 이라면 빈 배열로 초기화 후 진행
    if (userRoom[0].chat_rooms === null) {
      userRoom[0].chat_rooms = [];
    }
    // 현재 방 아이디를 기존 필드값에 추가
    const newRoom_id = chatRoom[0]?.id;
    const updatedData = [...userRoom[0].chat_rooms, newRoom_id];

    const { error: FaildUpdataCurrentUserRoom } = await supabase
      .from('user')
      .update({ chat_rooms: updatedData })
      .eq('uid', user?.uid)
      .select();

    // 방 추가 업데이트 에러처리
    if (FaildUpdataCurrentUserRoom) {
      console.error(
        'Error adding chat room id to user:',
        FaildUpdataCurrentUserRoom.message
      );
      return false;
    }

    return true;
  }
};

type checkSoldOutProps = {
  id: string | undefined;
  setIsSoldOut: React.Dispatch<SetStateAction<boolean>>;
};

export const handleCheckIsSoldOut = async ({
  id,
  setIsSoldOut
}: checkSoldOutProps) => {
  const { data: checkRes, error: checkErr } = await supabase
    .from('products')
    .select('isSell')
    .eq('id', id);

  if (checkRes && checkRes[0].isSell === true) setIsSoldOut(true);
  if (checkErr) console.log('sold out check err');
};

type checkLikedProps = {
  curUser: CustomUser | null;
  id: string | undefined;
  setIsLiked: React.Dispatch<SetStateAction<boolean>>;
};
// 내가 좋아한 게시물인가 판단 (마운트 시)
export const isLikedProduct = async ({
  curUser,
  id,
  setIsLiked
}: checkLikedProps) => {
  const { data: likeProduct, error } = await supabase
    .from('user')
    .select('likes')
    .eq('uid', curUser?.uid);

  if (error) console.log('like Product fetch Failed');

  if (
    likeProduct &&
    likeProduct[0].likes?.length > 0 &&
    likeProduct[0].likes.includes(id)
  ) {
    setIsLiked(true);
  } else {
    setIsLiked(false);
  }
};
