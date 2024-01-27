import { supabase } from "../../api/supabase/supabaseClient";

export const getProductsPosts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

export const getProductsCount = async () => {
  const { count, error } = await supabase
    .from('products')
    .select('count', { count: 'exact' });
  if (error) {
    throw error;
  }
  return count;
};
//잠시 지울게여 락균사마s
// export const fetchRangeProductsPosts = async (page: number, selectCategory: string) => {
//   const PAGE_POST_NUMBER = 25;
//   const firstPostIndex = (page - 1) * PAGE_POST_NUMBER;
//   const lastPostIndex = firstPostIndex + PAGE_POST_NUMBER - 1; // 수정된 부분
//   const { data, count, error } = await supabase
//     .from('products')
//     .select('*')
//     .order('created_at', { ascending: false })
//     .range(firstPostIndex, lastPostIndex); // 수정된 부분
//   if (error) {
//     throw error;
//   }

//   return { data, count };
// };


export const fetchRangeProductsPosts = async (page: number, selectCategory: string[]) => {
  const PAGE_POST_NUMBER = 25;
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

const PAGE_SIZE = 25; // 한 페이지에 표시할 아이템 수

export const fetchProductsByCategory = async (selectedCategory: string[] | null, page: number) => {
  const firstIndex = (page - 1) * PAGE_SIZE;
  const lastIndex = page * PAGE_SIZE - 1;

  const categoryFilter = selectedCategory !== null ? selectedCategory : ['%전체%'];

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', categoryFilter as any)
    .range(firstIndex, lastIndex);

  if (error) {
    throw error;
  }

  return data;
};
export const getRangeProductsPosts = async (page: number) => {
  const PAGE_POST_NUMBER = 25;
  const firstPostIndex = (page - 1) * PAGE_POST_NUMBER;
  const lastPostIndex = firstPostIndex + PAGE_POST_NUMBER - 1;

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  const { data, count, error } = await query.range(firstPostIndex, lastPostIndex);

  if (error) {
    throw error;
  }

  return { data, count };
};
