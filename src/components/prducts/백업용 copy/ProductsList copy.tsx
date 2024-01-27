import * as St from '../../../styles/products/ProductsListStyle'
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { fetchRangeProductsPosts, getProductsPosts } from '../productsQuery';
import { useEffect, useState } from 'react';
import { ProductsPostsType } from '../ProductsType';

interface Props {
  selectCategory: string;
}

const RANGE_POST_NUMBER = 25;

const ProductList = ({selectCategory}: Props) => {

  // const navigate = useNavigate();

  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);

  // const {data: productsPosts, isLoading, isError} = useQuery(['productsPosts', currentPage], () => fetchRangeProductsPosts(currentPage), {
  //   onSuccess: (data) => {
  //     if (data.count) {
  //       setTotalPages(Math.ceil(data.count / RANGE_POST_NUMBER));
  //     }
  //   }
  // });
  // useEffect(() => {
  //   setCurrentPage(1); // 카테고리가 바뀔 때마다 첫 페이지로 리셋
  // }, [selectCategory]);

  // if (isLoading) {
  //   return <St.LoadingStyle>Loading...</St.LoadingStyle>;
  // }

  // if (isError) {
  //   return <St.LoadingStyle>정보를 가져올 수 없습니다. 다시 시도해주세요.</St.LoadingStyle>;
  // }

  // const posts = productsPosts?.data;
  // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);


  //const {data: productsPosts, isLoading, isError} = useQuery('productsPosts', getProductsPosts);

  // if (!productsId) {
  //   return <div>해당 카테고리에 판매되는 물품이 없습니다.</div>
  // }


  // 필터된 상품 ID 배열
  // const filteredPostsId = selectCategory === '전체' ? 
  //   productsPosts?.map(product => product.id) || [] : 
  //   productsPosts?.filter(product => product.category.includes(selectCategory)).map(product => product.id) || [];

  return (
    <div>
      {/* <St.ProductsListContainer>
        {posts?.filter((product) => {
          if (selectCategory === '전체') {
            return posts;
          } else {
            return product.category === selectCategory;
          }
        }).map((product: ProductsPostsType) => 
          <St.ProductsCardContainer key={product.post_user_uid} onClick={() => navigate(`/products/detail/${product.post_user_uid}`)}>
            <St.CardImageWrapper>
              {product.image_url !== null && product.image_url !== undefined ? (
                <St.CardImage src={product.image_url[0]} alt="상품 이미지" />
              ) : (
                <div></div>
              )}
            </St.CardImageWrapper>
            {[product.quality].map((condition) => 
              <St.CardQuality>
                {condition}
              </St.CardQuality>
            )}
            <St.CardTitle>{product.title}</St.CardTitle>
            <St.CardPrice>{product.price}원</St.CardPrice>
          </St.ProductsCardContainer>
        )}
      </St.ProductsListContainer>
      <St.PageNumberStyle>
        {pages.map((number: number) => (
          <St.PageButton key={number} pageNumber={number} $currentPage={currentPage} onClick={() => setCurrentPage(number)}>
            {number}
          </St.PageButton>
        ))}
      </St.PageNumberStyle> */}
    </div>
      // <St.ProductsListContainer>
      //   {filteredPostsId?.map((productId) => {
      //     const product = productsPosts?.find(p => p.id === productId)
      //     if (product) {
      //       return (
      //         <St.ProductsCardContainer key={productId.id} onClick={() => navigate(`/products/detail/${productId}`)}>
      //           <St.CardImageWrapper>
      //             {product.image_url !== null && product.image_url !== undefined ? (
      //               <St.CardImage src={product.image_url[0]} alt="상품 이미지" />
      //             ) : (
      //               <div></div>
      //             )}
      //           </St.CardImageWrapper>
      //             {[product.quality].map((condition) => (
      //               <St.CardQuality>
      //                 {condition}
      //               </St.CardQuality>
      //             ))}
      //           <St.CardTitle>{product.title}</St.CardTitle>
      //           <St.CardPrice>{product.price}원</St.CardPrice>
      //         </St.ProductsCardContainer>
      //       )
      //     }
      //   })}
      // </St.ProductsListContainer>
  );
};

export default ProductList;
