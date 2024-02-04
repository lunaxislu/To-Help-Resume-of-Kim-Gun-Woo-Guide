import React, { MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { supabase } from '../../api/supabase/supabaseClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetailInfo from '../../components/productDetailInfoBody/ProductDetailInfo';
import * as St from './style';
import type { CustomUser, Product } from './types';
import { RoomType } from '../../components/chat/types';
import { v4 as uuid } from 'uuid';
import ProductDetailCarousel from '../../components/productDetailInfoBody/ProductDetailCarousel';
import {
  createRoom,
  getProductInfo,
  handleAddRoomIntoUsers,
  handleCheckIsSoldOut,
  isLikedProduct,
  sendInitMessage
} from './supabase_Detail/supabaseAPI';
import ProductChatList from '../../components/productDetailChatList/ProductChatList';
import ProductDetailInfoHeader from '../../components/productDetailInfoBody/ProductDetailInfoHeader';
import ProductPriceWrapper from '../../components/productDetailInfoBody/ProductPriceWrapper';
import ProductButton from '../../components/productDetailInfoBody/ProductButton';
import {
  getProduct,
  getTargetData,
  getUserData,
  handleCancleLike,
  handleDeletePost,
  handleGetLikeCount,
  handleLike,
  handleSellComplete,
  isExistsRoom
} from '../../components/productDetailInfoBody/ProductDetailFn';
import { TbCircleNumber1 } from 'react-icons/tb';
import { HiSparkles } from 'react-icons/hi2';
import { FaLocationDot, FaTruckFast } from 'react-icons/fa6';
import { RiExchangeFill } from 'react-icons/ri';
import ImageViewer from '../../components/productDetailInfoBody/ImageViewer';
import styled from 'styled-components';
import ProductsCard from '../../components/prducts/ProductsCard';
import { FaArrowRight } from 'react-icons/fa';
// DB의 채팅방 테이블 조회 후 같은 게시물에 대한 정보를 가진 채팅방이 존재하면
// 채팅 보내고 구매하기 버튼 대신 이어서 채팅하기로 전환

const ProductDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();
  const [curUser, setCurUser] = useState<CustomUser | null>(null);
  const [target, setTarget] = useState<CustomUser | null>(null);
  const [product, setProduct] = useState<Product[] | null>(null);
  const [isExist, setIsExist] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [createdChatList, setCreatedChatList] = useState<RoomType[]>([]);
  const [buyerChatId, setBuyerChatId] = useState<string>('');
  const [showChatList, setShowChatList] = useState<boolean>(false);
  const [isSoldOut, setIsSoldOut] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [likesCount, setLikesCount] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showViewer, setShowViewer] = useState<boolean>(false);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [otherPosts, setOtherPosts] = useState<Product[]>([]);

  const getOthers = async (targetId: string) => {
    const { data: otherPosts, error: failFetchPosts } = await supabase
      .from('products')
      .select('*')
      .eq('post_user_uid', targetId);

    if (failFetchPosts)
      console.log('작성자 게시물 가져오기 오류', failFetchPosts);

    if (otherPosts) {
      setOtherPosts(otherPosts);
    }
  };

  const getSilmilar = async (productTags: string[]) => {
    const { data: similarProducts, error: failFetchSimilar } = await supabase
      .from('products')
      .select('*')
      .contains('tags', productTags);

    if (failFetchSimilar)
      console.log('추천 상품 가져오기 오류', failFetchSimilar);

    if (similarProducts) {
      setSimilar(similarProducts);
    }
  };

  const makeChatRoom = async (e: MouseEvent<HTMLDivElement>) => {
    // curUser, targetUser 준비
    const currentUserId = localStorage.getItem('userId');
    const targetUserID = e.currentTarget.id;

    // user 테이블에서 채팅 상대 정보 가져오기
    const [targetUserRes, currentUserRes] = await Promise.all([
      supabase.from('user').select('*').eq('uid', targetUserID),
      supabase.from('user').select('*').eq('uid', currentUserId)
    ]);

    // 에러 처리
    if (targetUserRes.error || currentUserRes.error) {
      alert('로그인 정보 또는 작성자 정보를 찾을 수 없습니다');
      targetUserRes && console.log(targetUserRes);
      currentUserRes && console.log(currentUserRes);
      return;
    }

    const targetUser = targetUserRes.data;
    const currentUser = currentUserRes.data;

    // 둘 중 하나라도 데이터가 없다면 중단
    if (
      !targetUser ||
      targetUser.length === 0 ||
      !currentUser ||
      currentUser.length === 0
    ) {
      console.log('TargetUser or currentUser is null');
      if (window.confirm('로그인 후 이용 부탁드립니다') === true) {
        navi('/login');
      }
      return;
    }

    // 에러가 없다면 실행
    setTarget(targetUser[0]);
    setCurUser(currentUser[0]);
    if (targetUser && currentUser) {
      await insertUserIntoChatRoom(currentUser[0], targetUser[0]);
    } else {
      console.log('TargetUser or currentUser is null');
    }
  };

  // 생성된 채팅방 row에 참여자 정보, 채팅방 이름 삽입
  const insertUserIntoChatRoom = async (
    currentUser: CustomUser | null,
    targetUser: CustomUser | null
  ) => {
    const productInfo = await getProductInfo(id);

    if (productInfo) {
      setProduct(productInfo);
      const roomForm = [
        {
          id: uuid(), // 고유 채팅방 id
          room_name: `${productInfo[0].title}`, // 채팅방 이름
          about: `${id}`, // 채팅방이 어떤 제품과 관련이 있는지 제품 id를 넣음
          // 참여자 정보와 제품 정보를 넣어 참여자와 제품이 모두 같은 방의 중복 생성을 방지
          participants: [
            {
              about: `${id}`,
              isSeller: true, // 구매자와 판매자를 나누는 기준
              user_id: targetUser?.uid, // 상대방은 항상 판매자
              user_name: targetUser?.username,
              avatar_url: targetUser?.avatar_url
            },
            {
              about: `${id}`,
              isSeller: false,
              user_id: currentUser?.uid,
              user_name: currentUser?.username,
              avatar_url: currentUser?.avatar_url
            }
          ]
        }
      ];

      const chatRoom = await createRoom(roomForm);

      ////////////////// 방 생성 후 유저들에게 소속된 방을 추가 //////////////

      // 방이 생겼다면 유저들의 chat_room 필드에 생성 된 채팅방을 넣어주자
      if (chatRoom && currentUser && targetUser) {
        await Promise.all([
          handleAddRoomIntoUsers(currentUser, chatRoom),
          handleAddRoomIntoUsers(targetUser, chatRoom),
          sendInitMessage(product, chatRoom, currentUser, navi)
        ]);
      }
    }
  };

  // 판매 완료 때 사용 할 제품 관련 사용자 리스트 가져오기
  const handleLoadChatRooms = async () => {
    const { data: roomList, error: roomListFetchError } = await supabase
      .from('chat_room')
      .select('*')
      .eq('about', id);
    if (roomList) {
      setCreatedChatList(roomList);
    }
    if (roomListFetchError) {
      console.log('no exists created Room');
    }
  };

  // 채팅 리스트 보여주기
  const handleShowChatList = () => {
    setShowChatList(true);
  };

  // 상품추천란 네비게이션 함수
  const navigateTo = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    if (id && id === product![0].post_user_uid) navi(`/postersProducts/${id}`);
    else navi('/products');
  };

  useEffect(() => {
    getUserData({ setCurUser });
    getTargetData({ id, setTarget });
    getProduct({ id, setProduct });
    handleCheckIsSoldOut({ id, setIsSoldOut });
    handleGetLikeCount({ id, setLikesCount });
  }, []);

  useEffect(() => {
    if (target) {
      getOthers(target?.uid);
    }
    if (product) {
      getSilmilar(product[0].tags);
    }
  }, [target, product]);

  useEffect(() => {
    if (curUser) {
      isLikedProduct({ curUser, id, setIsLiked });
      isExistsRoom({ id, curUser, setIsExist });
    }
  }, [curUser]);

  const checkWindowSize = () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkWindowSize();
    window.addEventListener('DOMContentLoaded', checkWindowSize);
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('DOMContentLoaded', checkWindowSize);
      window.removeEventListener('resize', checkWindowSize);
    };
  });

  if (product === null) return <div>로딩 중</div>;

  const labels = [
    {
      tag: '수량',
      icon: <TbCircleNumber1 />
    },
    {
      tag: '상태',
      icon: <HiSparkles />
    },
    {
      tag: '거래 방식',
      icon: <FaTruckFast />
    },
    {
      tag: '직거래 장소',
      icon: <FaLocationDot />
    },
    {
      tag: '교환',
      icon: <RiExchangeFill />
    }
  ];

  const data = product[0];
  const productInfo = [
    data.count,
    data.quality,
    data.deal_type,
    data.address,
    data.exchange_product,
    data.changable,
    data.shipping_cost
  ];

  // 수정할 기본 데이터를 담은 변수 선언(하빈 추가)
  const selectedProductData = {
    id: data.id,
    image_url: data.image_url,
    title: data.title,
    category: data.category,
    price: data.price,
    shipping_cost: data.shipping_cost,
    count: data.count,
    deal_type: data.deal_type,
    address: data.address,
    quality: data.quality,
    changable: data.changable,
    exchange_product: data.exchange_product,
    contents: data.contents,
    detailAddress: data.detailAddress,
    tags: data?.tags,
    agreement: data.agreement
  };

  return (
    <>
      {showChatList && (
        <ProductChatList
          createdChatList={createdChatList}
          curUser={curUser}
          handleSellComplete={() => {
            handleSellComplete({ selectedUser, buyerChatId, navi, id });
          }}
          selectedUser={selectedUser}
          setBuyerChatId={setBuyerChatId}
          setSelectedUser={setSelectedUser}
          setShowChatList={setShowChatList}
        />
      )}
      {showViewer && (
        // 모바일 때 위치 조정 //
        <ImageViewer product={product} setShowViewer={setShowViewer} />
      )}

      <ToastContainer />
      {/* 본체 */}
      <St.StDetailContainer>
        <St.StDetailInfoSection>
          <St.StImageWrapper onClick={() => setShowViewer(true)}>
            <ProductDetailCarousel
              carouselImages={
                product[0]?.image_url === null ? [] : product[0]?.image_url
              }
            />
          </St.StImageWrapper>
          {/* 게시물 상단 */}
          <St.StProductInfo>
            <ProductDetailInfoHeader
              curUser={curUser}
              data={data}
              handleDeletePost={() => {
                handleDeletePost({ id, navi });
              }}
              isMobile={isMobile}
              product={product}
              target={target}
              selectedProductData={selectedProductData}
            ></ProductDetailInfoHeader>
            <St.StHeaderTitle>{data.title}</St.StHeaderTitle>
            <ProductPriceWrapper data={data} isMobile={isMobile} />
            <St.StProductInfoBody>
              <ProductDetailInfo
                labels={labels}
                productInfo={productInfo}
                data={data}
              />
            </St.StProductInfoBody>
            {/* 판매자와 구매자에게 다르게 보이는 버튼 */}
            <ProductButton
              curUser={curUser}
              handleCancleLike={() => {
                handleCancleLike({
                  id,
                  curUser,
                  isLikedProduct,
                  setIsLiked,
                  setLikesCount
                });
              }}
              handleLike={() => {
                handleLike({
                  curUser,
                  id,
                  isLikedProduct,
                  setIsLiked,
                  setLikesCount
                });
              }}
              handleLoadChatRooms={handleLoadChatRooms}
              handleShowChatList={handleShowChatList}
              isExist={isExist}
              isLiked={isLiked}
              isSoldOut={isSoldOut}
              likesCount={likesCount}
              makeChatRoom={makeChatRoom}
              product={product}
            />
          </St.StProductInfo>
        </St.StDetailInfoSection>
        {/* 상품 설명란 */}
        <St.StProductIntroSection>
          <St.StProductIntroTitle>상품 설명</St.StProductIntroTitle>
          <St.StProductContent>{data.contents}</St.StProductContent>
          <St.StProductCategory>
            {data.tags?.map((tag: string, i: number) => {
              return <St.StCategoryTag key={i}># {tag}</St.StCategoryTag>;
            })}
          </St.StProductCategory>
        </St.StProductIntroSection>
        {/* 상품 추천 섹션 */}
        <div>
          <StSimilarProductTitleWrapper>
            비슷한 상품
            <StToSectionButton onClick={navigateTo}>
              전체보기 <FaArrowRight />
            </StToSectionButton>
          </StSimilarProductTitleWrapper>
          <ProductsCard
            posts={similar
              .filter((product) => product.isSell !== true)
              .slice(0, 5)}
          />
        </div>
        <div>
          <StOtherPostsTitleWrapper>
            이 판매자의 다른 상품
            <StToSectionButton
              id={product[0].post_user_uid}
              onClick={navigateTo}
            >
              전체보기 <FaArrowRight />
            </StToSectionButton>
          </StOtherPostsTitleWrapper>
          <ProductsCard
            posts={otherPosts
              .filter((product) => product.isSell !== true)
              .slice(0, 5)}
          />
        </div>
      </St.StDetailContainer>
    </>
  );
};

export default ProductDetail;

const StSimilarProductTitleWrapper = styled.h2`
  width: 100%;
  font-size: 2rem;
  margin-block: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StOtherPostsTitleWrapper = styled.h2`
  width: 100%;
  font-size: 2rem;
  margin-block: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StToSectionButton = styled.button`
  background: var(--opc-100);
  color: white;
  border-radius: 50px;
  padding: 0.8rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #414141;
    color: var(--opc-100);
  }
`;
