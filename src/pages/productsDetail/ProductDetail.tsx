import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { supabase } from '../../api/supabase/supabaseClient';
import ProductDetailInfo from '../../components/productDetailInfoBody/ProductDetailInfo';
import * as St from './style';
import type { CustomUser, Product } from './types';
import { RoomType } from '../../components/chat/types';
import parseDate from '../../util/getDate';

// DB의 채팅방 테이블 조회 후 같은 게시물에 대한 정보를 가진 채팅방이 존재하면
// 채팅 보내고 구매하기 버튼 대신 이어서 채팅하기로 전환

const ProductDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();
  const [curUser, setCurUser] = useState<CustomUser | null>(null);
  const [target, setTarget] = useState<CustomUser | null>(null);
  const [product, setProduct] = useState<Product[] | null>(null);
  const [isExist, setIsExist] = useState<boolean>(false);

  const getUserData = async () => {
    const { data: user, error } = await supabase.auth.getUser();

    // DB에 유저 정보 없음 에러
    if (error) console.log('cannot get User Info');

    // DB에 유저 정보가 있다면 DB에 업로드
    if (user.user) {
      const { data: currentLogined, error } = await supabase
        .from('user')
        .select('*')
        .eq('uid', user.user.id);

      // 현재 로그인 유저의 데이터가 있다면
      if (currentLogined && currentLogined.length > 0) {
        setCurUser(currentLogined[0]);
      }
      // 로그이 유저 없음 에러
      if (error) console.log('logined user not exists');

      await findRoom();
    }
  };

  const getProduct = async (id: string) => {
    let { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id);
    if (error) {
      console.log(error);
    } else {
      setProduct(products);
    }
  };

  const makeChatRoom = async (e: MouseEvent<HTMLDivElement>) => {
    const targetId = e.currentTarget.id;

    // user 테이블에서 채팅 상대 정보 가져오기
    const { data: targetUser, error: noUser } = await supabase
      .from('user')
      .select('*')
      .eq('uid', targetId);

    if (targetUser && targetUser.length > 0) {
      setTarget(targetUser[0]);
    }

    if (noUser) console.log('user is not exists', noUser);
  };

  // 생성된 채팅방 row에 참여자 정보, 채팅방 이름 삽입
  const insertUserIntoChatRoom = async (
    curUser: CustomUser,
    target: CustomUser
  ) => {
    const roomForm = [
      {
        room_name: `${target.username}`,
        about: `${id}`,
        participants: [
          { user_id: target.uid, user_name: target.username },
          {
            user_id: curUser.uid,
            user2_name: curUser.username
          }
        ]
      }
    ];

    const { data: chatRoom, error } = await supabase
      .from('chat_room')
      .insert(roomForm);

    if (error) {
      console.log('생성 실패');
      return false;
    }

    await sendFirstMessage();
  };

  // 유저가 속한 채팅방 찾기
  const findRoom = async () => {
    const { data: foundRoom, error } = await supabase
      .from('chat_room')
      .select('*');

    if (error) {
      console.error('Error fetching chat rooms:', error);
      return;
    }

    if (foundRoom && curUser && target) {
      const filtered = foundRoom.filter((room: any) => {
        // curUser.id와 일치하는 participant를 포함한 방만 필터링
        return room.participants.some(
          (participant: any) => participant.user_id === target.uid
        );
      });
      return filtered;
    }
  };

  // 각 유저에게 채팅방을 추가하자
  const findUser = async (User: CustomUser) => {
    const { data: userInfo, error } = await supabase
      .from('user')
      .select('*')
      .eq('uid', User?.uid);

    if (userInfo) {
      await insertRoomintoUser(userInfo as any);
    }
  };

  // findUser 함수와 이어지는 함수
  // 유저의 chat_rooms 필드값에 방을 업뎃해주자
  const insertRoomintoUser = async (userInfo: CustomUser[]) => {
    const room = (await findRoom()) as RoomType[];

    // DB 초기값이 null 이라서 값이 있어도 배열 메서드가 안 통한 것.. 컬럼 확인 잘하자
    if (room && userInfo) {
      if (userInfo[0].chat_rooms === null) {
        userInfo[0].chat_rooms = [];
      }
      const room_id = room[0]?.id;
      const updatedData = [...userInfo[0].chat_rooms, room_id];
      const { data, error } = await supabase
        .from('user')
        .update({ chat_rooms: updatedData })
        .eq('uid', userInfo[0].uid)
        .select();

      if (error) {
        console.error('Error adding chat room id to user:', error.message);
        return false;
      }

      return true;
    }
  };

  // 게시물 관련 데이터를 첫 메세지로 보낸당
  const sendFirstMessage = async () => {
    const foundRoom = await findRoom();

    if (product && curUser) {
      if (foundRoom) {
        const InitMessage = [
          {
            sender_id: curUser.uid,
            content: `제목: ${product[0].title}`,
            chat_room_id: foundRoom[0]?.id
          },
          {
            sender_id: curUser.uid,
            content: `${product[0].price}원`,
            chat_room_id: foundRoom[0]?.id
          },
          {
            sender_id: curUser.uid,
            content: '상품에 관심 있어요!',
            chat_room_id: foundRoom[0]?.id
          }
        ];
        const { data, error } = await supabase
          .from('chat_messages')
          .insert(InitMessage)
          .eq('uid', product[0].uid);

        if (error) console.log('Send Messages Failed', error);

        navi('/chat');
      }
    } else console.log('Failed, no data');
  };

  const isExistsRoom = async () => {
    const { data: chat_rooms, error } = await supabase
      .from('chat_room')
      .select('about')
      .eq('about', id);
    if (chat_rooms && chat_rooms.length > 0) {
      setIsExist(true);
      console.log('exists!');
    }
  };

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
    getUserData();
    isExistsRoom();
  }, []);

  useEffect(() => {
    if (curUser && target) {
      insertUserIntoChatRoom(curUser, target);
      findUser(curUser);
      findUser(target);
    }
  }, [target]);

  if (product === null) return <div>로딩 중</div>;

  const labels = ['수량', '상태', '거래 방식', '직거래 장소', '교환', '배송비'];

  const data = product[0];
  const productInfo = [
    data.count,
    data.quality,
    data.dealType,
    data.location,
    data.exchange_product,
    data.shipping_cost
  ];
  console.log(product);

  return (
    <St.StDetailContainer>
      <St.StDetailInfoSection>
        <St.StImageWrapper>
          <St.StCarouselBox>
            <St.StImageList>
              <div>a</div>
              <div style={{ backgroundColor: 'gray' }}>a</div>
              <div style={{ backgroundColor: 'black' }}>a</div>
            </St.StImageList>
          </St.StCarouselBox>
        </St.StImageWrapper>
        <St.StProductInfo>
          <St.StProductInfoHeader>
            <St.StUserTitlebox>
              <St.StUserImage>
                <St.StProfileImages></St.StProfileImages>
              </St.StUserImage>
              <St.StUserNickname>{data.nickname}</St.StUserNickname>
            </St.StUserTitlebox>
            <St.StAlertButton>신고하기</St.StAlertButton>
          </St.StProductInfoHeader>
          <St.StHeaderTitle>{data.title}</St.StHeaderTitle>
          <St.StHeaderPriceWrapper>
            <St.StPrice>{data.price.toLocaleString('kr-KO')}원</St.StPrice>
            <St.StTimeLeft>{parseDate(data.created_at)}</St.StTimeLeft>
          </St.StHeaderPriceWrapper>
          <St.StProductInfoBody>
            <ProductDetailInfo
              labels={labels}
              productInfo={productInfo}
              data={data}
            />
          </St.StProductInfoBody>
          <St.ButtonWrapper>
            <St.Button $role="like">찜하기</St.Button>
            {/* 작성자 ID 가져오기 */}
            {isExist ? (
              <St.Button $role="chat" onClick={() => navi('/chat')}>
                채팅으로 이동하기
              </St.Button>
            ) : (
              <St.Button
                $role="chat"
                id={product[0].uid}
                data-about={product[0].uid}
                onClick={makeChatRoom}
              >
                채팅 보내고 구매하기
              </St.Button>
            )}
          </St.ButtonWrapper>
        </St.StProductInfo>
      </St.StDetailInfoSection>
      <St.StProductIntroSection>
        <St.StProductIntroTitle>상품 설명</St.StProductIntroTitle>
        <St.StProductContent>{data.contents}</St.StProductContent>
        <St.StProductCategory>
          {data.tags?.map((tag: string, i: number) => {
            return <St.StCategoryTag key={i}># {tag}</St.StCategoryTag>;
          })}
        </St.StProductCategory>
      </St.StProductIntroSection>
    </St.StDetailContainer>
  );
};

export default ProductDetail;
