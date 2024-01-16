import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
import ProductDetailInfo from '../../components/productDetailInfoBody/ProductDetailInfo';
import { CustomUser, Product } from './types';

const StDetailContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: auto;
  font-family: 'Pretendard-Regular';
`;

const StDetailInfoSection = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 1rem;
  align-items: start;
  border-bottom: 6px solid #eee;
  padding: 2rem 0 0 0;
`;

const StImageWrapper = styled.div`
  width: 65%;
  height: 550px;
  border-radius: 12px;
  overflow: hidden;
  background-color: aliceblue;
`;

const StCarouselBox = styled.div`
  width: 300vw;
  height: 100%;
  overflow: hidden;
`;
const StImageList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 1.2s ease;
  transform: translateX(0vw);

  div {
    width: 100%;
    height: 100%;
    background-color: blue;
  }
`;

const StProductInfo = styled.div`
  width: 100%;
  padding: 0 1rem 0 1rem;
`;

const StProductInfoHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StUserTitlebox = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const StUserImage = styled.div`
  width: fit-content;
`;
const StProfileImages = styled.div`
  width: 28px;
  height: 28px;
  background-color: #eee;
  border-radius: 50%;
`;
const StUserNickname = styled.h4`
  width: 100%;
  font-size: 0.875rem;
`;
const StAlertButton = styled.button`
  width: fit-content;
`;

const StHeaderTitle = styled.div`
  width: 100%;
  font-family: 'Pretendard-Medium';
  font-size: 1.375rem;
  margin-block: 2rem;
`;
const StHeaderPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 2rem;
`;
const StPrice = styled.h3`
  font-family: 'Pretendard-Bold';
  font-size: 1.375rem;
`;
const StTimeLeft = styled.div`
  max-width: 20%;
`;

const StProductInfoBody = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #eeeeee70;
  border-radius: 9px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  margin-block: 2rem;
`;

type ButtonProps = {
  $role: string;
};

const Button = styled.div<ButtonProps>`
  width: ${(props) => (props.$role === 'like' ? '40%' : '60%')};
  padding: ${(props) =>
    props.$role === 'like' ? '1.063rem 7.188rem' : '1.063rem 5.813rem'};
  font-size: 1.125rem;
  border-radius: 5px;
  background-color: #eee;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

// 상품 설명 섹션
const StProductIntroSection = styled.section`
  width: 100%;
`;
const StProductIntroTitle = styled.h4`
  width: 100%;
  font-weight: 600;
  font-size: 1.4rem;
  margin-block: 2rem;
`;
const StProductContent = styled.div`
  width: 100%;
  margin-block: 2rem;
  white-space: break-spaces;
`;
const StProductCategory = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const StCategoryTag = styled.li`
  width: fit-content;
  padding: 0.3rem;
  font-weight: 600;
  color: #4f4f4f;
  list-style: none;
  background-color: #eee;
  border-radius: 6px;
  cursor: pointer;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const [curUser, setCurUser] = useState<CustomUser | null>(null);
  const [target, setTarget] = useState<CustomUser | null>(null);
  const [product, setProduct] = useState<Product[] | null>(null);

  const getUserData = async () => {
    const { data: user, error } = await supabase.auth.getUser();
    if (user.user) {
      const { data: currentLogined, error } = await supabase
        .from('user')
        .select('*')
        .eq('uid', user.user.id);

      // 현재 로그인 유저의 데이터가 있다면
      if (currentLogined && currentLogined.length > 0) {
        setCurUser(currentLogined[0]);
      }

      await findRoom();
    }
    if (error) console.log('cannot get User Info');
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

  const makeChatRoom = async (e: MouseEvent) => {
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

  // 생성된 채팅방 row에 현재 로그인 유저와 타겟 유저 정보 삽입
  const insertUserIntoChatRoom = async (
    curUser: CustomUser,
    target: CustomUser
  ) => {
    const participants = [
      {
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
      .insert(participants);

    await findRoom();

    if (error) console.log('생성 실패');
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

    if (foundRoom && curUser) {
      const filtered = foundRoom.filter((room: any) => {
        // curUser.id와 일치하는 participant를 포함한 방만 필터링
        return room.participants.some(
          (participant: any) => participant.user_id === curUser.uid
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

  // 유저의 chat_rooms 필드값에 방을 업뎃해주자
  const insertRoomintoUser = async (userInfo: CustomUser[]) => {
    const room = (await findRoom()) as any;

    if (room && userInfo) {
      const room_id = room[0].id;
      const { data, error } = await supabase
        .from('user')
        .update({ chat_rooms: [room_id] })
        .eq('uid', userInfo[0].uid)
        .select();

      if (error) {
        console.error('Error adding chat room id to user:', error.message);
        return false;
      }
    }
  };

  // 게시물 관련 데이터를 첫 메세지로 보낸당
  const sendFirstMessage = async () => {
    if (product && curUser) {
      const room = await findRoom();
      if (room) {
        const InitMessage = [
          {
            sender_id: curUser.uid,
            content: `제목: ${product[0].title}`,
            chat_room_id: room[0]?.id
          },
          {
            sender_id: curUser.uid,
            content: `${product[0].price}원`,
            chat_room_id: room[0]?.id
          },
          {
            sender_id: curUser.uid,
            content: '상품에 관심 있어요!',
            chat_room_id: room[0]?.id
          }
        ];
        const { data, error } = await supabase
          .from('chat_messages')
          .insert(InitMessage);

        if (error) console.log('Send Messages Failed', error);
      }
    } else console.log('Failed, no data');
  };

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
    getUserData();
  }, []);

  useEffect(() => {
    if (curUser && target) {
      insertUserIntoChatRoom(curUser, target);
      findUser(curUser);
      findUser(target);
      sendFirstMessage();
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

  return (
    <StDetailContainer>
      <StDetailInfoSection>
        <StImageWrapper>
          <StCarouselBox>
            <StImageList>
              <div>a</div>
              <div style={{ backgroundColor: 'gray' }}>a</div>
              <div style={{ backgroundColor: 'black' }}>a</div>
            </StImageList>
          </StCarouselBox>
        </StImageWrapper>
        <StProductInfo>
          <StProductInfoHeader>
            <StUserTitlebox>
              <StUserImage>
                <StProfileImages></StProfileImages>
              </StUserImage>
              <StUserNickname>{data.nickname}</StUserNickname>
            </StUserTitlebox>
            <StAlertButton>신고하기</StAlertButton>
          </StProductInfoHeader>
          <StHeaderTitle>{data.title}</StHeaderTitle>
          <StHeaderPriceWrapper>
            <StPrice>{data.price.toLocaleString('kr-KO')}원</StPrice>
            <StTimeLeft>{data.created_at.slice(0, 10)}</StTimeLeft>
          </StHeaderPriceWrapper>
          <StProductInfoBody>
            <ProductDetailInfo
              labels={labels}
              productInfo={productInfo}
              data={data}
            />
          </StProductInfoBody>
          <ButtonWrapper>
            <Button $role="like">찜하기</Button>
            {/* 작성자 ID 가져오기 */}
            <Button $role="chat" id={product[0].uid} onClick={makeChatRoom}>
              채팅 보내고 구매하기
            </Button>
          </ButtonWrapper>
        </StProductInfo>
      </StDetailInfoSection>
      <StProductIntroSection>
        <StProductIntroTitle>상품 설명</StProductIntroTitle>
        <StProductContent>{data.contents}</StProductContent>
        <StProductCategory>
          {data.tags?.map((tag: string, i: number) => {
            return <StCategoryTag key={i}># {tag}</StCategoryTag>;
          })}
        </StProductCategory>
      </StProductIntroSection>
    </StDetailContainer>
  );
};

export default ProductDetail;
