import * as St from '../../../styles/products/ProductsListStyle';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { PAGE_POST_NUMBER, fetchRangeProductsPosts } from '../productsQuery';
import { useEffect, useState } from 'react';
import { ProductsPostsType } from '../ProductsType';
import Pagination from '../../../pages/products/Pagination';

interface Props {
  selectCategory: string[];
}

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

  return (
    <div>
      <St.ProductsListContainer>
        {postsTest?.map((posts: ProductsPostsType) => (
          <St.ProductsCardContainer
            key={posts.id}
            onClick={() => navigate(`/products/detail/${posts.id}`)}
          >
            <St.CardImageWrapper>
              {posts.isSell === true ? (
                <St.IsSellProducts>
                  <St.SoldOut>판매완료</St.SoldOut>
                </St.IsSellProducts>
              ) : (<div></div>)}
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
      />
    </div>
  );
};

export default ProductListCard;
