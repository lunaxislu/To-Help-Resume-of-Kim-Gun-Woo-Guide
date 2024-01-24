export interface LikeUser {
  userNickname: string;
  user_uid: string;
}
export interface Product {
  id: number;
  nickname: string;
  quality: string;
  title: string;
  price: number;
  user: string;
  image_url: string;
  like_user: LikeUser[];
  about: string;
  isSell: boolean;
}

export interface ProductCardProps {
  //   list: Product[];
  activeTab: number;
}

// TODO: ProductCard에 있는 함수들 공통화
