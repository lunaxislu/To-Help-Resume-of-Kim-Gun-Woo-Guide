import { supabase } from './supabaseClient';
const userId = localStorage.getItem('userId');

export const fetchItems = async (
  selectedTab: string,
  page: number,
  postLimit: number = 10
) => {
  const firstIndex = (page - 1) * postLimit;
  let myItems = supabase.from('products').select('*');

  switch (selectedTab) {
    case '내 물품':
      myItems = myItems.eq('post_user_uid', userId);
      break;
    case '구매한 물품':
      myItems = myItems.eq('buyer_uid', userId);
      break;
    default:
      break;
  }

  const { data, error } = await myItems.range(
    firstIndex,
    firstIndex + postLimit - 1
  );

  const filteredFavItems = data?.filter((product) =>
    product.like_user?.some(
      (like: { user_uid: string }) => like.user_uid === userId
    )
  );

  return { data, filteredFavItems };
};

export const fetchPosts = async (
  selectedTab: string,
  page: number,
  postLimit: number = 10
) => {
  const firstIndex = (page - 1) * postLimit;
  let myPosts = supabase.from('community').select('*');

  if (selectedTab === '내가 쓴 글') {
    myPosts = myPosts.eq('post_user', userId);
  }

  const { data, error } = await myPosts.range(
    firstIndex,
    firstIndex + postLimit - 1
  );

  const filteredFavPosts = data
    ?.filter((user) => user.likes_user?.includes(userId))
    .map((item) => item);

  console.log(filteredFavPosts);
  return { data, filteredFavPosts };
};
