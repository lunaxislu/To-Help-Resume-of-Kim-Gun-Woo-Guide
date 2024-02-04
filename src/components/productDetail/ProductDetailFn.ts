import { SetStateAction } from 'react';
import { supabase } from '../../api/supabase/supabaseClient';
import { CustomUser, Product } from '../../pages/productsDetail/types';
import { Participants } from '../chat/types';
import CustomToastSuccess from './customToast/CustomToastSuccess';
import CustomToastError from './customToast/CustomToastError';
import CustomToastInfo from './customToast/CustomToast';

type GetLikeCountType = {
  id: string | undefined;
  setLikesCount: React.Dispatch<SetStateAction<number | null>>;
};

// 찜 개수 카운트 해주는 함수
export const handleGetLikeCount = async ({
  id,
  setLikesCount
}: GetLikeCountType) => {
  const { data: likes, error } = await supabase
    .from('products')
    .select('likes')
    .eq('id', id);

  if (likes && likes.length > 0) {
    setLikesCount(likes[0].likes);
  }
};

type DeletePostType = {
  id: string | undefined;
  navi: any;
};

// 게시물 삭제
export const handleDeletePost = async ({ id, navi }: DeletePostType) => {
  if (window.confirm('정말 삭제하시겠습니까?') === true) {
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) console.log('삭제 실패!');

    if (!error) {
      alert('삭제 완료!');
      navi('/');
    }
  } else {
    return;
  }
};

type CheckExsistsRoomType = {
  id: string | undefined;
  curUser: CustomUser | null;
  setIsExist: React.Dispatch<SetStateAction<boolean>>;
};

// 내가 소속된 채팅 방인지 판단 (마운트 시)
export const isExistsRoom = async ({
  id,
  curUser,
  setIsExist
}: CheckExsistsRoomType) => {
  const { data: chat_rooms, error } = await supabase
    .from('chat_room')
    .select('*')
    .eq('about', id);

  if (chat_rooms) {
    const existsRoom = chat_rooms.filter((room) => {
      return room.participants.some((part: Participants) => {
        return part.user_id === curUser?.uid;
      });
    });
    existsRoom?.length > 0 && setIsExist(true);
  }
  // if (chat_rooms && chat_rooms.length > 0 && curUser) {
  //   const connectedRoom = chat_rooms.filter((room: RoomType) => {

  //   });
  //   if (connectedRoom && connectedRoom.length > 0) {
  //     setIsExist(true);
  //   }
  // }
};

type GetUserFnType = {
  setCurUser: React.Dispatch<SetStateAction<CustomUser | null>>;
};

// 마운트 시 유저 정보 가져옴
export const getUserData = async ({ setCurUser }: GetUserFnType) => {
  const currentUserId = localStorage.getItem('userId');
  const { data: currentUser, error } = await supabase
    .from('user')
    .select('*')
    .eq('uid', currentUserId);

  // 현재 로그인 유저의 데이터가 있다면
  if (currentUser && currentUser.length > 0) {
    setCurUser(currentUser[0]);
  }
  // 로그이 유저 없음 에러
  if (error) console.log('logined user not exists');
};

type GetTargetFnType = {
  id: string | undefined;
  setTarget: React.Dispatch<SetStateAction<CustomUser | null>>;
};

// 마운트 시 유저 정보 가져옴
export const getTargetData = async ({ id, setTarget }: GetTargetFnType) => {
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id);

  if (product) {
    const { data: targetUser, error } = await supabase
      .from('user')
      .select('*')
      .eq('uid', product[0]?.post_user_uid);

    // 현재 로그인 유저의 데이터가 있다면
    if (targetUser && targetUser.length > 0) {
      setTarget(targetUser[0]);
    }
    // 로그이 유저 없음 에러
    if (error) console.log('logined user not exists');
  }

  if (productError) console.log('작성자 정보 fetch 오류');
};

type GetProductDataType = {
  id: string | undefined;
  setProduct: React.Dispatch<SetStateAction<Product[] | null>>;
};
// 마운트 시 제품 정보 가져옴
export const getProduct = async ({ id, setProduct }: GetProductDataType) => {
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

type LikeFnProps = {
  id: string | undefined;
  curUser: CustomUser | null;
  setLikesCount: React.Dispatch<SetStateAction<number | null>>;
  isLikedProduct: any;
  setIsLiked: React.Dispatch<SetStateAction<boolean>>;
};

// 좋아요
export const handleLike = async ({
  id,
  curUser,
  setLikesCount,
  isLikedProduct,
  setIsLiked
}: LikeFnProps) => {
  // 로컬 스토리지 비우기
  if (!curUser) {
    alert('로그인 후 이용바랍니다');
    return;
  }
  try {
    const [likesFieldRes, existingDataRes, likeListRes] =
      await Promise.allSettled([
        supabase.from('products').select('likes').eq('id', id),
        supabase.from('products').select('like_user').eq('id', id),
        supabase.from('user').select('likes').eq('uid', curUser?.uid)
      ]);
    const likesField =
      likesFieldRes.status === 'fulfilled' ? likesFieldRes.value.data : null;
    const existingData =
      existingDataRes.status === 'fulfilled'
        ? existingDataRes.value.data
        : null;
    const likeList =
      likeListRes.status === 'fulfilled' ? likeListRes.value.data : null;
    ////////////////////////////// 유저 관련 처리 ////////////////////////////////
    if (
      likesFieldRes.status === 'rejected' ||
      existingDataRes.status === 'rejected' ||
      likeListRes.status === 'rejected'
    )
      console.error('필요한 정보를 찾을 수 없습니다');

    // 유저에게 좋아요한 게시물 추가
    const like_userList =
      Array.isArray(likeList) && likeList.length > 0
        ? likeList[0].likes || []
        : [];

    const updatedList = [...like_userList, id];

    if (likeList) {
      const { error } = await supabase
        .from('user')
        .update({ likes: updatedList })
        .eq('id', curUser?.id);
    }

    ////////////////////////// product 테이블 관련 처리 ///////////////////////////

    if (
      likesField &&
      existingData &&
      likesField.length > 0 &&
      existingData.length > 0
    ) {
      // 좋아요 수 1 증가
      const { status, error } = await supabase
        .from('products')
        .update({ likes: likesField[0].likes + 1 })
        .eq('id', id);

      setLikesCount((prevLikesCount) =>
        prevLikesCount ? prevLikesCount + 1 : 1
      );

      // 배열인지, 배열이면 길이가 0이상인지 확인
      const like_userList =
        existingData && Array.isArray(existingData) && existingData.length > 0
          ? Array.from(existingData[0].like_user || [])
          : [];

      const newLikeUser = {
        userNickname: curUser?.nickname,
        user_uid: curUser?.uid
      };

      const updatedLikeUserList = [...like_userList, newLikeUser];

      // 좋아요한 사용자 업데이트
      const { status: likeUser, error: likeUserFail } = await supabase
        .from('products')
        .update({
          like_user: updatedLikeUserList
        })
        .eq('id', id);

      if (status === 204 && likeUser === 204) {
        CustomToastSuccess({ message: '찜 목록에 추가했어요!' });
      }
      if (error || likeUserFail) {
        CustomToastError({ message: '찜하기 실패, 다시 시도해주세요' });
      }
    }

    isLikedProduct({ curUser, id, setIsLiked });
  } catch (error) {
    CustomToastError({ message: '찜하기 오류' });
  }
};

// 찜 취소 기능
export const handleCancleLike = async ({
  id,
  curUser,
  isLikedProduct,
  setIsLiked,
  setLikesCount
}: LikeFnProps) => {
  try {
    const [likesFieldRes, existingDataRes, likeListRes] =
      await Promise.allSettled([
        supabase.from('products').select('likes').eq('id', id),
        supabase.from('products').select('like_user').eq('id', id),
        supabase.from('user').select('likes').eq('uid', curUser?.uid)
      ]);
    const likesField =
      likesFieldRes.status === 'fulfilled' ? likesFieldRes.value.data : null;
    const existingData =
      existingDataRes.status === 'fulfilled'
        ? existingDataRes.value.data
        : null;
    const likeList =
      likeListRes.status === 'fulfilled' ? likeListRes.value.data : null;

    ////////////////////////////// 유저 관련 처리 ////////////////////////////////
    // 유저에게 좋아요한 게시물 추가
    const like_userList =
      Array.isArray(likeList) && likeList.length > 0
        ? likeList[0].likes || []
        : [];

    const updatedList = like_userList.filter(
      (productId: string) => productId !== id
    );

    if (likeList) {
      const { error } = await supabase
        .from('user')
        .update({ likes: updatedList })
        .eq('id', curUser?.id);
    }

    ////////////////////////// product 테이블 관련 처리 ///////////////////////////

    if (
      likesField &&
      existingData &&
      likesField.length > 0 &&
      existingData.length > 0
    ) {
      // 좋아요 수 1 감소
      const { status, error } = await supabase
        .from('products')
        .update({ likes: likesField[0].likes - 1 })
        .eq('id', id);

      setLikesCount((prevLikesCount) =>
        prevLikesCount ? prevLikesCount - 1 : 1
      );

      // 배열인지, 배열이면 길이가 0이상인지 확인
      const like_userList =
        existingData && Array.isArray(existingData) && existingData.length > 0
          ? Array.from(existingData[0].like_user || [])
          : [];

      const updatedLikeUserList = like_userList.filter(
        (user: any) => user.user_uid !== curUser?.uid
      );

      // 좋아요한 사용자 업데이트
      const { status: likeUser, error: likeUserFail } = await supabase
        .from('products')
        .update({
          like_user: updatedLikeUserList
        })
        .eq('id', id);

      if (status === 204 && likeUser === 204) {
        CustomToastInfo({ message: '찜 목록에서 삭제했어요!' });
      }
      if (error || likeUserFail) {
        CustomToastError({
          message: '찜하기 실패, 유저 정보를 찾을 수 없습니다'
        });
      }
    }
    isLikedProduct({ curUser, id, setIsLiked });
  } catch (error) {
    CustomToastError({ message: '찜 취소하기 오류' });
  }
};

type sellFnProps = {
  selectedUser: string;
  buyerChatId: string;
  navi: any;
  id: string | undefined;
};

// 판매 완료
export const handleSellComplete = async ({
  selectedUser,
  buyerChatId,
  navi,
  id
}: sellFnProps) => {
  if (
    window.confirm(`${selectedUser}님 에게 물품 판매를 완료하시겠습니까?`) ===
    true
  ) {
    const { data: buyUser, error: buyUserFetchError } = await supabase
      .from('user')
      .select('*')
      .eq('uid', buyerChatId);

    // 에러처리
    if (buyUserFetchError) {
      console.log('buyUser Fetch Failed', buyUserFetchError);
    }

    if (buyUser) {
      const currentBuyProducts = buyUser[0].buyProduct || [];
      const newList = [...currentBuyProducts, id];
      const { data: res, error: sellError } = await supabase
        .from('user')
        .update({ buyProduct: newList })
        .eq('uid', buyerChatId);

      // 업데이트 실패 에러 처리
      if (sellError) {
        console.log('list update fail at user table');
      }

      // 제품 게시물 상태  업데이트
      const { data: sellRes, error: sellErr } = await supabase
        .from('products')
        .update({ isSell: true })
        .eq('id', id);

      // 게시물 buyer_uid에 구매자 ID 업데이트
      const { data: buyerInsert, error: buyerInsertErr } = await supabase
        .from('products')
        .update({ buyer_uid: buyerChatId })
        .eq('id', id);

      alert('판매가 완료되었습니다');
      navi('/');
    }
  } else {
    return;
  }
};
