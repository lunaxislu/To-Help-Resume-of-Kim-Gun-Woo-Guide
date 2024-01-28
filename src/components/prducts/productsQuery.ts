import { supabase } from "../../api/supabase/supabaseClient";

export const getProductsCount = async () => {
  const { count, error } = await supabase
    .from('products')
    .select('count', { count: 'exact' });
  if (error) {
    throw error;
  }
  return count;
};

export const PAGE_POST_NUMBER = 20;

export const fetchRangeProductsPosts = async (page: number, selectCategory: string[]) => {
  const firstPostIndex = (page - 1) * PAGE_POST_NUMBER;
  const lastPostIndex = firstPostIndex + PAGE_POST_NUMBER - 1;
  
  if (selectCategory[0] === '전체') {
    const { data, count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact' }) // 카운트 정보도 가져옴
    .order('created_at', { ascending: false })
    .range(firstPostIndex, lastPostIndex);

    if (error) {
    throw error;
    }
  return { data, count };
    
  } else {
    const { data, count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact' }) // 카운트 정보도 가져옴
    .contains('category', selectCategory) // 카테고리 필터링 추가
    .order('created_at', { ascending: false })
    .range(firstPostIndex, lastPostIndex);

  if (error) {
    throw error;
  }

  return { data, count };
  }
};