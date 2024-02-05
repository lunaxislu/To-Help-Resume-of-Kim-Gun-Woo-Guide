import { supabase } from './supabaseClient';
const userId = localStorage.getItem('userId');

export interface LikeUser {
  userNickname: string;
  user_uid: string;
}
export interface Product {
  id: string;
  nickname: string;
  quality: string;
  title: string;
  price: number;
  user: string;
  image_url: string;
  like_user: LikeUser[];
  about: string;
  isSell: boolean;
  post_user_uid: string;
}

export interface ProductCardProps {
  activeTab: number;
}

export interface MyPageItemCardProps {
  id: string;
  image_url: string;
  user: string;
  quality: string;
  title: string;
  price: number;
}

// TODO: ProductCard에 있는 함수들 공통화
// export const getCurrentUserProducts = async ({setMyItems, setMyItem,  }) => {
//   let { data: products, error } = await supabase
//     .from('products')
//     .select('*')
//     .eq('post_user_uid', userId)
//     .limit(10);

//   if (products && products.length > 0) {
//     setMyItems(products);
//     dispatch(setMyItem(products));
//   }
// };
