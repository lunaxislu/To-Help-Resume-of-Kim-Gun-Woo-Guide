import { useInfiniteQuery } from 'react-query';
import { MouseEvent, useEffect, useState } from 'react';
import ProductListCard from '../../components/prducts/ProductsList/ProductsListCard';
import ProductsSortBtn from '../../components/prducts/ProductsList/ProductsSortBtn';
import * as St from '../../styles/products/productsList/StProductsList';
import { useNavigate } from 'react-router';
import { fetchProductsPosts } from '../../components/prducts/productsQuery';
import { useInView } from 'react-intersection-observer';
import { ProductsPostsType } from '../../components/prducts/ProductsType';
import SkeletonProductCard from '../../components/skeleton/SkeletonProductCard';
import ProductsSkeleton from '../../components/skeleton/ProductsSkeleton';
import ProductCategory from '../../components/prducts/ProductsList/ProductCategory';


const ProductsList = () => {
  const navigate = useNavigate();

  // 판매글쓰기 함수를 위한 id 체크
  const [userId, setUserID] = useState('');
  
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserID(storedUserId);
    }
  }, []);
  const [selectCategory, setSelectCategory] = useState<string[]>(['전체']);
  
  // intersection Observer API
  const {ref, inView} = useInView();
  
  // 무한스크롤을 위한 전체 or 카테고리별 데이터 가져오기(count도 함께 가져옴)
  const {data, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage 
  } = useInfiniteQuery(['productInfinite', selectCategory],
  ({pageParam = 1}) => fetchProductsPosts(selectCategory, pageParam, 10),
  {
   getNextPageParam: (lastPage, pages) => {
    if (lastPage.data.length < 10) return undefined;
    return pages.length + 1;
   }
  });

  // inView가 true이고 다음페이지가 존재한다면 다음페이지 데이터 불러오기
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  // 데이터 안에 있는 찐 data를 하나의 배열로 만들어주기
  const posts: ProductsPostsType[] = data?.pages.flatMap(page => page.data) || [];
  
  // 로그아웃된 유저 판매글 쓰기 막아주기
  const handleOnClickSellWriteBtn = () => {
    if (!userId) {
      const confirmLogin = window.confirm('판매하기는 로그인 후에 가능합니다. 로그인 하시겠습니까?');
      if (confirmLogin) {
        navigate('/login');
      }
      return;
    }
    navigate('/productsposts');
  }
  
  if (isError) {
    return (
      <St.LoadingStyle>
        물품 정보를 가져올 수 없습니다. 개발팀에게 문의주세요.
      </St.LoadingStyle>
    );
  }

  return (
    <St.EntireContainer>
      <St.ContentsContainer>
        <St.TitleContainer>
          <St.Title>
            {data?.pages[0].count && `${data?.pages[0].count}개의 ${selectCategory} 물품이 거래되고 있어요`}
            {isLoading && `Loading....`}
          </St.Title>
          <St.PostsWriteBtn onClick={handleOnClickSellWriteBtn}>
            <St.SellWriteIcon /> 판매하기
          </St.PostsWriteBtn>
        </St.TitleContainer>
        <St.BarContainer>
          <ProductCategory selectCategory={selectCategory} setSelectCategory={setSelectCategory} />
          {/* <St.SortBtnContainer>
          <ProductsSortBtn />
        </St.SortBtnContainer> */}
        </St.BarContainer>
        {isLoading ? (
          <ProductsSkeleton count={15}/>
        ) : (
          <ProductListCard posts={posts} selectCategory={selectCategory} />
        )}
        {hasNextPage && !isFetchingNextPage && <div ref={ref} />}
        {isFetchingNextPage && <ProductsSkeleton count={10} />}
        {!isFetchingNextPage && !isLoading && 
        <St.LastData>
          <p>{selectCategory} 카테고리의 마지막 물품입니다.</p>
          <p>'판매하기'를 눌러 판매를 시작해보세요!</p>
        </St.LastData>
        }
      </St.ContentsContainer>
    </St.EntireContainer>
  );
};

export default ProductsList;