import { useInfiniteQuery } from 'react-query';
import { MouseEvent, useEffect, useState } from 'react';
import ProductListCard from '../../components/prducts/ProductsList/ProductsListCard';
import ProductsSortBtn from '../../components/prducts/ProductsList/ProductsSortBtn';
import * as St from '../../styles/products/ProductsListStyle';
import { useNavigate } from 'react-router';
import { fetchProductsPosts } from '../../components/prducts/productsQuery';
import { useInView } from 'react-intersection-observer';
import { ProductsPostsType } from '../../components/prducts/ProductsType';

const major = [
  '전체',
  '회화',
  '조소',
  '공예',
  '기타'
];

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

  if (isError) {
    return (
      <St.LoadingStyle>
        정보를 가져올 수 없습니다. 다시 시도해주세요.
      </St.LoadingStyle>
    );
  }

  const handleOnClickCategory = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    setSelectCategory([target.innerText || '']);
  };
  
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

  return (
    <St.EntireContainer>
      <St.ContentsContainer>
        <St.TitleContainer>
          <St.Title>
            {data?.pages[0].count ? 
              `${data?.pages[0].count}개의 물품이 거래되고 있어요` : 
              `거래되고 있는 ${selectCategory} 물품이 없어요`}
          </St.Title>
          <St.PostsWriteBtn onClick={handleOnClickSellWriteBtn}>
            <St.SellWriteIcon /> 판매하기
          </St.PostsWriteBtn>
        </St.TitleContainer>
        <St.BarContainer>
          <St.CategoryContainer>
            <St.CategoryWrapper>
              {major.map((major) => (
                <li key={major}>
                  <St.Category
                    onClick={handleOnClickCategory}
                    $selectCategory={selectCategory}
                  >
                    {major}
                  </St.Category>
                </li>
              ))}
            </St.CategoryWrapper>
          </St.CategoryContainer>
          {/* <St.SearchBarContainer>
          <ProductsSortBtn />
        </St.SearchBarContainer> */}
        </St.BarContainer>
        {isLoading ? (
          <St.LoadingStyle>스켈레톤 이미지 props는 몇장 보여줄 것인지 갯수</St.LoadingStyle>
        ) : (
          <ProductListCard posts={posts} selectCategory={selectCategory} />
        )}
        {hasNextPage && !isFetchingNextPage && <div ref={ref}></div>}
        {isFetchingNextPage && <div>스켈레톤 이미지 props는 몇장 보여줄 것인지 갯수</div>}
      </St.ContentsContainer>
    </St.EntireContainer>
  );
};

export default ProductsList;
