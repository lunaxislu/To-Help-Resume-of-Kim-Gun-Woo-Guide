import * as St from '../../../styles/products/ProductsListStyle';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { fetchRangeProductsPosts } from '../productsQuery';
import { useEffect, useState } from 'react';
import { ProductsPostsType } from '../ProductsType';
import Pagination from '../../../pages/products/Pagination';

interface Props {
  selectCategory: string[];
}

const PAGE_POST_NUMBER = 25;

const ProductListCard = ({ selectCategory }: Props) => {
  const navigate = useNavigate();

  // Pagination을 위한 State
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsTest, setPostsTest] = useState<any>();
  //const [filteredItems, setFilteredItems] = useState<ProductsPostsType[] | null>(null);

  const fetchTest = async () => {
    try {
      const res = await fetchRangeProductsPosts(currentPage, selectCategory);
      setPostsTest(res.data);

      if (res.count) {
        setTotalPages(Math.ceil(res.count / PAGE_POST_NUMBER));
      }
    } catch (error) {
      // 페이지네이션 이후 다른 카테고리 에러 날 때
      return;
    }
  };

  const {
    data: productsPosts,
    isLoading,
    isError
  } = useQuery(
    ['productsPosts', currentPage],
    async () => {
      await fetchTest(); // fetchTest가 끝날 때까지 기다립니다.
      return fetchRangeProductsPosts(currentPage, selectCategory);
    },
    {
      onSuccess: (data) => {
        if (data.count) {
          setTotalPages(Math.ceil(data.count / PAGE_POST_NUMBER));
        }
      }
    }
  );

  useEffect(() => {
    // selectCategory가 변경될 때마다 실행될 작업
    fetchTest();
  }, [selectCategory]);

  useEffect(() => {
    setCurrentPage(1); // 카테고리가 바뀔 때마다 첫 페이지로 리셋
  }, [selectCategory]);

  if (isLoading) {
    return <St.LoadingStyle>Loading...</St.LoadingStyle>;
  }

  if (isError) {
    return (
      <St.LoadingStyle>
        정보를 가져올 수 없습니다. 다시 시도해주세요.
      </St.LoadingStyle>
    );
  }

  const posts = productsPosts?.data;

  // const {
  //   data: productsPosts, isLoading, isError
  // } = useQuery(['productsPosts', currentPage], () => fetchRangeProductsPosts(currentPage),{
  //   onSuccess: (data) => {
  //     if (data.count) {
  //       setTotalPages(Math.ceil(data.count / PAGE_POST_NUMBER))
  //     }
  //   }
  // });

  // useEffect(() => {
  //   setCurrentPage(1); // 카테고리가 바뀔 때마다 첫 페이지로 리셋
  // }, [selectCategory]);

  // useEffect(() => {
  //   if (productsPosts?.data) {
  //     const filtered = selectCategory.length > 0
  //     ? productsPosts.data.filter((item) => item.category.some((category:string) => selectCategory.includes(category)))
  //     : productsPosts.data;
  //     setFilteredItems(filtered);
  //   }
  // }, [selectCategory, productsPosts]);

  //const posts = filteredItems || productsPosts?.data;

  // 모든 아이템 중 seletCategory안에 필터로 선택 된 값이 하나라도 포함되는 아이템들만 배열에 담아 반환
  //   const filteredItems = posts?.filter(item => {
  //   return item.category.some((category:string) => selectCategory.includes(category));
  // });

  // 필터된 상품 ID 배열
  // const filteredPostsId = selectCategory === '전체' ?
  //   productsPosts?.map(product => product.id) || [] :
  //   productsPosts?.filter(product => product.category.includes(selectCategory)).map(product => product.id) || [];

  return (
    <div>
      <St.ProductsListContainer>
        {postsTest?.map((posts: ProductsPostsType) => (
          <St.ProductsCardContainer
            key={posts.id}
            onClick={() => navigate(`/products/detail/${posts.id}`)}
          >
            <St.CardImageWrapper>
              {posts.image_url !== null && posts.image_url !== undefined ? (
                <St.CardImage src={posts.image_url[0]} alt="상품 이미지" />
              ) : (
                <div></div>
              )}
            </St.CardImageWrapper>
            {[posts.quality].map((condition) => (
              <St.CardQuality key={condition}>{condition}</St.CardQuality>
            ))}
            <St.CardTitle>{posts.title}</St.CardTitle>
            <St.CardPrice>{posts.price.toLocaleString('kr-KO')}원</St.CardPrice>
          </St.ProductsCardContainer>
        ))}
      </St.ProductsListContainer>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectCategory={selectCategory}
      />
    </div>
    // <div>
    //   <St.ProductsListContainer>
    //     {clickedCategory === '전체' &&
    //     posts?.map((posts:ProductsPostsType) =><St.ProductsCardContainer key={posts.id} onClick={() => navigate(`/products/detail/${posts.id}`)}>
    //         <St.CardImageWrapper>
    //           {posts.image_url !== null && posts.image_url !== undefined ? (
    //             <St.CardImage src={posts.image_url[0]} alt="상품 이미지" />
    //           ) : (<div></div>)}
    //         </St.CardImageWrapper>
    //         {[posts.quality].map((condition) =>
    //           <St.CardQuality key={condition}>
    //             {condition}
    //           </St.CardQuality>
    //         )}
    //         <St.CardTitle>{posts.title}</St.CardTitle>
    //         <St.CardPrice>{posts.price}원</St.CardPrice>
    //       </St.ProductsCardContainer>)
    //     }

    //     {clickedCategory !== '전체' &&
    //     filteredItems?.map((posts: ProductsPostsType) =>
    //       <St.ProductsCardContainer key={posts.id} onClick={() => navigate(`/products/detail/${posts.id}`)}>
    //         <St.CardImageWrapper>
    //           {posts.image_url !== null && posts.image_url !== undefined ? (
    //             <St.CardImage src={posts.image_url[0]} alt="상품 이미지" />
    //           ) : (<div></div>)}
    //         </St.CardImageWrapper>
    //         {[posts.quality].map((condition) =>
    //           <St.CardQuality key={condition}>
    //             {condition}
    //           </St.CardQuality>
    //         )}
    //         <St.CardTitle>{posts.title}</St.CardTitle>
    //         <St.CardPrice>{posts.price}원</St.CardPrice>
    //       </St.ProductsCardContainer>
    //       )}

    //     {selectCategory.length === 0 && clickedCategory !== '전체' &&
    //     posts?.map((posts:ProductsPostsType) =><St.ProductsCardContainer key={posts.id} onClick={() => navigate(`/products/detail/${posts.post_user_uid}`)}>
    //         <St.CardImageWrapper>
    //           {posts.image_url !== null && posts.image_url !== undefined ? (
    //             <St.CardImage src={posts.image_url[0]} alt="상품 이미지" />
    //           ) : (<div></div>)}
    //         </St.CardImageWrapper>
    //         {[posts.quality].map((condition) =>
    //           <St.CardQuality key={condition}>
    //             {condition}
    //           </St.CardQuality>
    //         )}
    //         <St.CardTitle>{posts.title}</St.CardTitle>
    //         <St.CardPrice>{posts.price}원</St.CardPrice>
    //       </St.ProductsCardContainer>)
    //     }
    //   </St.ProductsListContainer>
    //   <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} selectCategory={selectCategory} />
    // </div>

    // <div>
    //   <St.ProductsListContainer>
    //     {posts?.filter((product) => {
    //       if (selectCategory === '전체') {
    //         return posts;
    //       } else {
    //         return product.category === selectCategory;
    //       }
    //     }).map((product: ProductsPostsType) =>
    //       <St.ProductsCardContainer key={product.post_user_uid} onClick={() => navigate(`/products/detail/${product.post_user_uid}`)}>
    //         <St.CardImageWrapper>
    //           {product.image_url !== null && product.image_url !== undefined ? (
    //             <St.CardImage src={product.image_url[0]} alt="상품 이미지" />
    //           ) : (
    //             <div></div>
    //           )}
    //         </St.CardImageWrapper>
    //         {[product.quality].map((condition) =>
    //           <St.CardQuality>
    //             {condition}
    //           </St.CardQuality>
    //         )}
    //         <St.CardTitle>{product.title}</St.CardTitle>
    //         <St.CardPrice>{product.price}원</St.CardPrice>
    //       </St.ProductsCardContainer>
    //     )}
    //   </St.ProductsListContainer>
    //   <St.PageNumberStyle>
    //     {pages.map((number: number) => (
    //       <St.PageButton key={number} pageNumber={number} $currentPage={currentPage} onClick={() => setCurrentPage(number)}>
    //         {number}
    //       </St.PageButton>
    //     ))}
    //   </St.PageNumberStyle>
    // </div>
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

export default ProductListCard;
