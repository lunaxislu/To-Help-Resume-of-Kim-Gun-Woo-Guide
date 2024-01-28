export type AddressValueType = {
  address: string,
  detailAddress: string
}

export type ProductsPostsType = {
  id:string,
  title: string,
  category: string[],
  price: number,
  count: number, 
  contents: string,
  created_at: string,
  post_user_name: string,
  nickname: string,    
  deal_type: string,
  likes: number,
  quality: string,
  changable: string,
  shipping_cost: string,
  agreement: boolean,
  exchange_product: string,
  tags: string[], 
  address: string,
  detailAddress: string,
  image_url: string,
  like_user: {uid:string, }[],
  isSell: boolean,
  buyer_uid: string,
  post_user_uid: string,
  buyer_nickname: string
};

export type ProductsInputType = {
  title: string,
  category: string[],
  price: number,
  shipping_cost: string,
  count: number, 
  deal_type: string,
  address: string,
  detailAddress: string,
  quality: string,
  changable: string,
  exchange_product: string,
  contents: string,
  tags: string, 
  agreement: boolean,
  image_url: string
};

export type ProductsInputFinalType = {
  title: string,
  category: string[],
  price: number,
  shipping_cost: string,
  count: number, 
  deal_type: string,
  address: string,
  detailAddress: string,
  quality: string,
  changable: string,
  exchange_product: string,
  contents: string,
  tags: string[], 
  agreement: boolean,
  image_url: string[]
};