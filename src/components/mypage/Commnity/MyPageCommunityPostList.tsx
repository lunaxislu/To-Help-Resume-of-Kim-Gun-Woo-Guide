import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '../../../redux/reduxHooks/reduxBase';
import { useInfiniteQuery } from 'react-query';
import { fetchPosts } from '../../../api/supabase/mypageQuery';
import { useEffect } from 'react';
import SkeletonCommunityCard from '../../skeleton/SkeletonCommunityCard';
import MyPageCommuCard from './MyPageCommuCard';
import { Post } from '../../../pages/community/api/model';
import Nothing from '../Nothing';

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

      {posts.length === 0 && selectedTab === '내가 쓴 글' && (
        <Nothing
          type={'커뮤니티로 이동하기'}
          content={
            '아직 작성한 게시글이 없습니다. \n 커뮤니티에서 이야기를 공유해보세요!'
          }
          to={'/community_write'}
        />
      )}

      {filteredFavPosts.length === 0 && selectedTab === '추천한 글' && (
        <Nothing
          type={'커뮤니티로 이동하기'}
          content={
            '아직 추천하신 글이 없습니다. \n 커뮤니티에서 사람들의 이야기를 들어보세요!'
          }
          to={'/community'}
        />
      )}
    </div>
  );
};

export default MyPageCommunityPostList;
