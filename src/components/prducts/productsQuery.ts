import { supabase } from "../../api/supabase/supabaseClient";

export const fetchProductsPosts = async (
  selectCategory: string[], page: number, postLimit: number = 10) => {
  const firstIndex = (page - 1) * postLimit;
  
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' }) // 카운트 정보도 가져옴
    .order('created_at', { ascending: false });

  if (selectCategory[0] !== '전체') {
    query = query.contains('category', selectCategory); // 카테고리 필터링 추가
  }
  try {
    const {data, count, error} = await query.range(firstIndex, firstIndex + postLimit -1);
    
    if (error) {
      throw error;
    }
  
    return { data, count };

  } catch (error) {
    throw error;
  }
};