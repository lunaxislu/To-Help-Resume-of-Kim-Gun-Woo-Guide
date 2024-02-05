import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import CategorySelector from '../../components/community/CategorySeletor';
import CommunityList from '../../components/community/CommunityList';
import CommunityMainCount from '../../components/community/CommunityMainCount';
import SkeletonCommunityCard from '../../components/skeleton/SkeletonCommunityCard';
import * as St from '../../styles/community/CommunityMainStyle';
import { fetchPosts } from './api/commuQuery';
import { Post } from './api/model';

const CommunityMain: React.FC = () => {
  const [selectCategory, setSelectCategory] = useState<string>('전체');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const { ref, inView } = useInView();

  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    ['posts', selectCategory],
    ({ pageParam = 1 }) => fetchPosts(selectCategory, pageParam, 6),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 6) return undefined;
        return pages.length + 1;
      },
      staleTime: 300000
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
  const handleWriteButtonClick = () => {
    if (!userId) {
      const confirmLogin = window.confirm(
        '글쓰기는 로그인 후에 가능합니다. 로그인 하시겠습니까?'
      );
      if (confirmLogin) {
        navigate('/login');
      }
      return;
    }
    navigate('/community_write');
  };

  const posts: Post[] = data?.pages?.flat() || [];

  if (isError) {
    alert(
      '데이터 불러오기 중 오류가 발생했습니다. 새로고침후 현상이 유지된다면 개발자에게 문의주세요'
    );
  }
  return (
    <St.Container>
      <St.Post_container>
        <CommunityMainCount selectCategory={selectCategory} />
        <St.FeatureBar>
          <CategorySelector
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
          />
          <St.WriteBtn onClick={handleWriteButtonClick}>
            <St.WriteIcon /> 글쓰기
          </St.WriteBtn>
        </St.FeatureBar>
        {isLoading ? (
          <SkeletonCommunityCard cards={6} />
        ) : (
          <CommunityList posts={posts} />
        )}
        {hasNextPage && !isFetchingNextPage && <div ref={ref}></div>}
        {isFetchingNextPage && <SkeletonCommunityCard cards={4} />}
      </St.Post_container>
    </St.Container>
  );
};

export default React.memo(CommunityMain);
