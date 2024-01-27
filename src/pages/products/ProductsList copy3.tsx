import { useQuery } from 'react-query'
import { MouseEvent, useEffect, useState } from 'react';
import ProductListCard from '../../components/prducts/ProductsList/ProductsListCard';
import ProductsSearchBar from '../../components/prducts/ProductsList/ProductsSearchBar';
import ProductsSortBtn from '../../components/prducts/ProductsList/ProductsSortBtn';
import * as St from '../../styles/products/ProductsListStyle'
import { useNavigate } from 'react-router';
import { fetchRangeProductsPosts, getProductsPosts } from '../../components/prducts/productsQuery';
import Pagination from './Pagination';
import { ProductsPostsType } from '../../components/prducts/ProductsType';
import { ceil } from 'lodash';

const major = ['전체', '회화', '조소', '판화', '금속공예', '도예', '유리공예', '목공예', '섬유공예', '기타']

const ProductsList = () => {
  const navigate = useNavigate();

  const [selectCategory, setSelectCategory] = useState<string[]>([]);
  const [clicked, setClicked] = useState<string>('전체');

  const {
    data: productsPosts, isLoading, isError
  } = useQuery('productsPosts', getProductsPosts);

  // Pagination을 위한 State
  // const [totalPages, setTotalPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  
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

  if (isLoading) {
    return <St.LoadingStyle>Loading...</St.LoadingStyle>;
  }

  if (isError) {
    return <St.LoadingStyle>정보를 가져올 수 없습니다. 다시 시도해주세요.</St.LoadingStyle>
  }

  // const posts = productsPosts?.data;
  // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const filteredItems = productsPosts?.filter(item => {
  return item.category.some((category:string) => selectCategory.includes(category));
});
  console.log('filtered', filteredItems);
  // const firstPostIndex = (currentPage -1) * postsPerPage;
  // const lastPostIndex = firstPostIndex + postsPerPage;
  // const currentPosts = clicked === '전체' ? productsPosts?.slice(firstPostIndex, lastPostIndex) : filteredItems?.slice(firstPostIndex, lastPostIndex);

  const handleOnClickCategory = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const clickedCategory = target.textContent || ''; 
    setClicked(clickedCategory)

    // 현재까지 선택된 카테고리를 유지하면서 새로운 카테고리를 추가
    // 이미 포함 된 값이 있을 때
    if (clickedCategory === '전체') {
      setSelectCategory([])
    }
    if (clickedCategory !== '전체' && !selectCategory.includes(clickedCategory)) {
      setSelectCategory((prev) => [...prev, clickedCategory])
    }
    if (clickedCategory !== '전체' && selectCategory.includes(clickedCategory)) {
        const filtered = selectCategory.filter(category => category !== clickedCategory)
        setSelectCategory(filtered)
    }
    // if (selectCategory === ([])) {
    //   selectCategory([])
    // }
  }
 // console.log(currentPosts);
// console.log(selectCategory)
//  if(isLoading) {<div>로딩중</div>}
  
  return ( <div></div>
    // <St.EntireContainer>
    //   <St.ContentsContainer>
    //     <div style={{display: 'flex', justifyContent: 'space-between'}}>
    //       <St.Title>
    //         {productsPosts?`${productsPosts?.length}개의 물품이 거래되고 있어요` : `0개의 물품이 거래되고 있어요`}
    //       </St.Title>
    //       <St.MobilePostsWriteBtn onClick={() => navigate('/productsposts')}>
    //         <St.SellWriteIcon/> 판매하기
    //       </St.MobilePostsWriteBtn>
    //     </div>
    //   <St.BarContainer>
    //     <St.CategoryContainer>
    //       <St.CategoryWrapper>
    //         {major.map(major => 
    //           <li>
    //             <St.Category key={major} onClick={handleOnClickCategory}
    //               $selectCategory={selectCategory}
    //               >{major}</St.Category>
    //           </li>
    //         )}
    //       </St.CategoryWrapper>
    //       <St.PostsWriteBtn onClick={() => navigate('/productsposts')}>
    //         <St.SellWriteIcon/> 판매하기
    //       </St.PostsWriteBtn>
    //     </St.CategoryContainer>
    //     {/* <St.SearchBarContainer>
    //       <ProductsSearchBar />
    //       <ProductsSortBtn />
    //     </St.SearchBarContainer> */}
    //   </St.BarContainer>
    //     <ProductListCard selectCategory={selectCategory} clickedCategory={clicked} />
    //   </St.ContentsContainer>
    // </St.EntireContainer>
  );
};

export default ProductsList;
