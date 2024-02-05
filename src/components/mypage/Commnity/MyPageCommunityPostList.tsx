import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '../../../redux/reduxHooks/reduxBase';
import { useInfiniteQuery } from 'react-query';
import { fetchPosts } from '../../../api/supabase/mypageQuery';
import { useEffect } from 'react';
import SkeletonCommunityCard from '../../skeleton/SkeletonCommunityCard';
import MyPageCommuCard from './MyPageCommuCard';
import { Post } from '../../../pages/community/api/model';

const MyPageCommunityPostList = () => {
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
    ['getPosts', selectedTab],
    ({ pageParam = 1 }) => fetchPosts(selectedTab, pageParam, 10),
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

  const posts: Post[] = data?.pages.flatMap((page) => page?.data) || [];

  const filteredFavPosts: Post[] =
    data?.pages.flatMap((page) => page.filteredFavPosts) || [];

  console.log(filteredFavPosts);

  return (
    <div ref={ref}>
      {isLoading ? (
        <SkeletonCommunityCard cards={4} />
      ) : (
        <MyPageCommuCard
          posts={selectedTab === '추천한 글' ? filteredFavPosts : posts}
          selectCategory={selectedTab}
        />
      )}
    </div>
  );
};

export default MyPageCommunityPostList;
