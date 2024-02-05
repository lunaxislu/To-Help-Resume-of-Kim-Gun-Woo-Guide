import { useState } from "react";
import { supabase } from "../../api/supabase/supabaseClient";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { ProductsInputFinalType } from "./ProductsType";
import { useNavigate } from "react-router";

// supabase 데이터 가져오는 함수
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

// export const addPostsMutation = async (EntireData: ProductsInputFinalType) => {
//   try {
//     const { data, error } = await supabase
//       .from('products')
//       .insert([EntireData]);
//     if (error) throw error;
//   } catch (error) {
//     console.error('Error adding post:', error);
//   }
// };

// const navigate = useNavigate();

// export const addPostsMutation = useMutation(
//   async (EntireData: ProductsInputFinalType) => {
//     const { data, error } = await supabase.from('products').insert([EntireData]);
//     if (error) {
//       throw error;
//     }
//     return data;
//   },
//   {
//     onSuccess: () => {
//       alert('중고거래 판매글이 등록되었습니다.');
//       navigate('/products');
//     },
//     onError: (error) => {
//       alert('게시물 등록에 실패하였습니다. 다시 시도하여 주십시오.');
//       console.log(error);
//     },
//   } 
// );

// const upDatePostsMutation = useMutation(
//   async (data: {upDatePost: ProductsInputFinalType, productData: any}) => {
//     const {upDatePost, productData} = data;
//     const { data: result, error } = await supabase.from('products').update(upDatePost).eq('id', productData.id);
//     if (error) {
//       throw error;
//     }
//     return result;
//   },
//   {
//     onSuccess: () => {
//       alert('게시물이 수정되었습니다.');
//       navigate(`/products/detail/${productData.id}`);
//     },
//     onError: (error) => {
//       alert('게시물 수정에 실패하였습니다. 다시 시도하여 주십시오.');
//       console.log(error);
//     },
//   }
// );


// const ProductsQuery = () => {
//   const queryClient = useQueryClient();

//   const fetchUserData = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser();
      
//       const { data: profiles, error } = await supabase
//         .from('user')
//         .select('*')
//         .eq('id', user!.id);

//       if (error) {
//         console.log(error);
//       }

//       if (profiles != null && profiles.length > 0) {
//         const userNickname = profiles[0].nickname;
//         const userName = profiles[0].username;

//         return {
//           post_user_uid: user!.id,
//           post_user_name: userName,
//           nickname: userNickname,
//         }
//       }

//     } catch (error: any) {
//       console.log(error.message);
//     }
//     return {
//       post_user_uid: "",
//       post_user_name: "",
//       nickname: "",
//     }
//   };

//   const {data, isLoading, isError, invalidateQuery, userData} = useQuery('productsList', fetchUserData);

//   return { data, isLoading, isError, invalidateQuery, userData }
// };

// export default ProductsQuery;