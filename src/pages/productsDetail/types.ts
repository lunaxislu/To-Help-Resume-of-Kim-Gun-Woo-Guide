export interface Product {
  id: string;
  post_user_uid: string;
  created_at: string;
  post_user: string;
  nickname: string;
  title: string;
  contents: string;
  price: number;
  tags: string[];
  location: string;
  deal_type: string;
  like_user: { user_id: string; user_name: string }[];
  likes: number;
  quality: string;
  changable: boolean;
  shipping_cost: boolean;
  agreement: boolean;
  exchange_product: string;
  count: number;
  category: string[];
  address: string;
  image_url: string[];
  isSell: boolean;
  buyer: string;
}

export type CustomUser = {
  id: string;
  uid: string;
  created_at: string;
  username: string;
  nickname: string;
  address: string;
  chat_rooms: {}[];
  likes: {}[];
  board: {}[];
  comment: {}[];
  avatar_url: string;
};
