import * as St from '../../../styles/products/ProductsListStyle';
import { useQuery } from 'react-query';
import { PAGE_POST_NUMBER, fetchRangeProductsPosts } from '../productsQuery';
import { useEffect, useState } from 'react';
import Pagination from '../../../pages/products/Pagination';
import PostsNothing from '../../../pages/products/PostsNothing';
import ProductsCard from '../ProductsCard';

interface Props {
  selectCategory: string[];
}

const ProductListCard = ({ selectCategory }: Props) => {

  // Pagination을 위한 State
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<any>();

  const fetchTest = async () => {
    try {
      const res = await fetchRangeProductsPosts(currentPage, selectCategory);
      setPosts(res.data);

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
      {posts && posts.length > 0 ? (
        <>
          <ProductsCard posts={posts} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <PostsNothing selectCategory={selectCategory}/>
      )}
    </div>
  );
};

export default ProductListCard;
