import { SetStateAction } from 'react';
import { supabase } from '../../api/supabase/supabaseClient';
import { Product } from '../productsDetail/types';

export const fetchPage = async (
  page: number,
  id: string | undefined,
  cachedData: Product[],
  setIsEnd: React.Dispatch<SetStateAction<boolean>>,
  setProducts: React.Dispatch<SetStateAction<Product[]>>
) => {
  let { data: productsRes, error } = await supabase
    .from('products')
    .select('*')
    .range(0, page)
    .eq('post_user_uid', id);

  if (error) console.log('Products fetch failed');

  // 캐싱 된 이전 데이터와 새로 가져온 데이터의 길이가 같다면 요청 중단
  if (cachedData.length === productsRes?.length) {
    setIsEnd(true);
  }

  if (productsRes) setProducts(productsRes);
};
