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
  image_url: string;
  image_Url: string;
  publicURL: string;
  publicUrL: string;
  images: string;
  error: string;
}

export interface Communityy {
  post_id: number;
  title: string;
  content: string;
  category: string;
  post_user: string;
  nickname: string;
  likes: number;
  files: Array<Record<string, any>>;
  main_image: string;
  anon: boolean;
  created_at: string;
  comment: Array<Record<string, any>>;
  likes_user: Array<Record<string, any>>;
}
