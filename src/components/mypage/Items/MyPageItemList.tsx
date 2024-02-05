import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { fetchItems } from '../../../api/supabase/mypageQuery';
import { useEffect } from 'react';
import { ProductsPostsType } from '../../prducts/ProductsType';
import ProductsSkeleton from '../../skeleton/ProductsSkeleton';
import { useAppSelector } from '../../../redux/reduxHooks/reduxBase';
import ProductsCard from '../../prducts/ProductsCard';

const MyPageItemList = () => {
  const { selectedTab } = useAppSelector((state) => state.tab);
  const { ref, inView } = useInView();
  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    ['getItems', selectedTab],
    ({ pageParam = 1 }) => fetchItems(selectedTab, pageParam, 10),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage && lastPage.data && lastPage.data.length < 10)
          return undefined;
        return pages.length + 1;
      }
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const posts: ProductsPostsType[] =
    data?.pages.flatMap((page) => page?.data) || [];

  const filteredFavItems: ProductsPostsType[] =
    data?.pages.flatMap((page) => page.filteredFavItems) || [];

  return (
    <div ref={ref}>
      {isLoading ? (
        <ProductsSkeleton count={10} />
      ) : (
        <ProductsCard
          posts={selectedTab === '찜한 물품' ? filteredFavItems : posts}
          selectCategory={selectedTab}
        />
      )}
    </div>
  );
};

export default MyPageItemList;
