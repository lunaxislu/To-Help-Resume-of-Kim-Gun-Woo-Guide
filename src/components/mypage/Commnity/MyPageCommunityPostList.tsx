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

const MyPageCommunityPostList: React.FC<CommunityActive> = ({ activeTab }) => {
  const dispatch = useAppDispatch();
  const {
    data: myPost,
    hasNextPage: hasNextPageMyPost,
    fetchNextPage: fetchNextPageMyPost,
    status: statusMyPost
  } = useInfiniteQuery({
    queryKey: ['myPost'],
    queryFn: getCommunityPosts,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
    select: (data) => {
      return {
        pages: data.pages.map((pageData) => pageData.data).flat(),
        pageParams: data.pageParams
      };
    }
  });

  const {
    data: myFavPost,
    hasNextPage: hasNextPageMyFavPost,
    fetchNextPage: fetchNextPageMyFavPost,
    status: statusMyFavPost
  } = useInfiniteQuery({
    queryKey: ['myFavPost'],
    queryFn: getFavCommunityPosts,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
    select: (data) => {
      return {
        pages: data.pages.map((pageData) => pageData.data).flat(),
        pageParams: data.pageParams
      };
    }
  });

  dispatch(setMyPost(myPost?.pages.length));
  dispatch(setFavPost(myFavPost?.pages.length));

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (!inView || !hasNextPageMyPost) return;
      fetchNextPageMyPost();

      if (!inView || !hasNextPageMyPost) return;
      fetchNextPageMyPost();
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
          <CommunityList posts={myPost?.pages}></CommunityList>
        </StPostContainer>
      )}

      {activeTab === 4 && (
        <StPostContainer ref={ref}>
          <CommunityList posts={myFavPost?.pages}></CommunityList>
        </StPostContainer>
      )}
    </>
  );
};

export default MyPageCommunityPostList;
