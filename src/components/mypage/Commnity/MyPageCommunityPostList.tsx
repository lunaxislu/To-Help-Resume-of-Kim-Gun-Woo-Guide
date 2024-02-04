import React, { useEffect, useRef, useState } from 'react';
import { StPostContainer } from '../../../styles/mypageStyle/CommunityCardStyle';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonCommunityCard from '../../skeleton/SkeletonCommunityCard';
import { CommunityActive } from '../../../api/supabase/community';
import Nothing from '../Nothing';
import { useInView } from 'react-intersection-observer';
import {
  getCommunityPosts,
  getFavCommunityPosts
} from '../../../api/supabase/mypage';
import { useInfiniteQuery } from 'react-query';
import CommunityList from '../../community/CommunityList';
import { useAppDispatch } from '../../../redux/reduxHooks/reduxBase';
import {
  setFavPost,
  setMyPost
} from '../../../redux/modules/countPostsAndItemsSlice';
import useInfiniteQueryHook from '../../../hooks/useInfiniteQuery';

const MyPageCommunityPostList: React.FC<CommunityActive> = ({ activeTab }) => {
  const dispatch = useAppDispatch();

  const {
    data: myPosts,
    hasNextPage: hasNextPageMyPosts,
    fetchNextPage: fetchNextPageMyPosts,
    status: statusMyPosts
  } = useInfiniteQueryHook({
    queryKey: ['myPosts'],
    queryFn: getCommunityPosts
  });

  const {
    data: myFavPosts,
    hasNextPage: hasNextPageMyFavPosts,
    fetchNextPage: fetchNextPageMyFavPosts,
    status: statusMyFavPosts
  } = useInfiniteQueryHook({
    queryKey: ['myFavPosts'],
    queryFn: getFavCommunityPosts
  });

  dispatch(setMyPost(myPosts?.pages.length));
  dispatch(setFavPost(myFavPosts?.pages.length));

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (!inView || !hasNextPageMyPosts) return;
      fetchNextPageMyPosts();

      if (!inView || !hasNextPageMyPosts) return;
      fetchNextPageMyPosts();
    }
  });

  useEffect(() => {
    // 처음 랜더링 시 화면이 맨 위에 위치
    if (window.scrollY !== 0) window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {activeTab === 3 && (
        <StPostContainer ref={ref}>
          <CommunityList posts={myPosts?.pages}></CommunityList>
        </StPostContainer>
      )}
      {myPosts?.pages.length === 0 && activeTab !== 4 && (
        <Nothing
          type={'글쓰기'}
          content={'아직 작성한 게시물이 없습니다.'}
          icon={''}
          to={'/community_write'}
          show={true}
        />
      )}

      {activeTab === 4 && (
        <StPostContainer ref={ref}>
          <CommunityList posts={myFavPosts?.pages}></CommunityList>
        </StPostContainer>
      )}
      {myFavPosts?.pages.length === 0 && activeTab !== 3 && (
        <Nothing
          type={'커뮤니티 보러가기'}
          content={'아직 추천한 게시물이 없습니다.'}
          icon={''}
          to={'/community'}
          show={true}
        />
      )}
    </>
  );
};

export default MyPageCommunityPostList;
