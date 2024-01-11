export interface UsedItem {
  id: number;
  uid: string;
  created_at: string;
  post_user: string;
  nickname: string;
  title: string;
  contents: string;
  price: number;
  count: number;
  tags: string[];
  location: string;
  deal_type: string;
  like_user: string[];
  likes: number;
  quality: string;
  exchangable: boolean;
  shipping_cost: boolean;
  agreement: boolean;
  image_filename?: string;
  imageData?: any;
}

export type Database = {
  used_item__board: UsedItem[];
};
