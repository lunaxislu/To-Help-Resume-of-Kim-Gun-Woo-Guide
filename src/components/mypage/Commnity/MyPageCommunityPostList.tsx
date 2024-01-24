import React, { useEffect, useRef, useState } from 'react';
import { StPostContainer } from '../../../styles/mypageStyle/CommunityCardStyle';
import 'react-loading-skeleton/dist/skeleton.css';
import { supabase } from '../../../api/supabase/supabaseClient';
import { debounce } from 'lodash';
import SkeletonCommunityCard from '../../card/SkeletonCommunityCard';
import { userId } from '../../../util/getUserId';
import { Community, CommunityActive } from '../../../api/supabase/community';
import { MyPageCommunityCard } from './MyPageCommunityCard';

const MyPageCommunityPostList: React.FC<CommunityActive> = ({ activeTab }) => {
  const CARDS_COUNT = 10;
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [isInView, setIsInView] = useState(false);
  const [communityPosts, setCommunityPosts] = useState<Community[]>([]);
  const [favCommunityPosts, setFavCommunityPosts] = useState<Community[]>([]);

  const getCurrentUserCommunityPosts = async () => {
    let { data: communityPosts, error } = await supabase
      .from('community')
      .select('*')
      .eq('post_user', userId)
      .limit(10);

    if (communityPosts && communityPosts.length > 0) {
      setCommunityPosts(communityPosts);
    }
  };

  const onScrollHandler = () => {
    // js script가 동작하고 카드를 감싸는 전체 컨테이너가 바닥에 닿을 때
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current;
      const { scrollTop, clientHeight, scrollHeight } = container;
      const isAtBottom = scrollTop + clientHeight <= scrollHeight;
      setIsInView(isAtBottom);
    }
  };

  const getCurrentUserFavCommunityPosts = async () => {
    let { data: favCommunityPosts, error } = await supabase
      .from('community')
      .select('*');

    console.log(userId);

    if (favCommunityPosts && favCommunityPosts.length > 0) {
      const filteredFavProducts = favCommunityPosts
        .filter((user) => user.likes_user.includes(userId))
        .map((item) => item);

      setFavCommunityPosts(filteredFavProducts);
    }
  };

  useEffect(() => {
    getCurrentUserFavCommunityPosts();
  }, []);

  useEffect(() => {
    const debouncedScroll = debounce(() => onScrollHandler(), 200);
    window.addEventListener('scroll', debouncedScroll);
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, []);

  const fetchCommunityPosts = async (offset: number, limit: number) => {
    const from = offset * CARDS_COUNT;
    const to = from + CARDS_COUNT - 1;

    const { data } = await supabase!
      .from('community')
      .select('*')
      .range(from, to)
      .eq('post_user', userId);

    return data;
  };

  const loadMorePosts = async (offset: number) => {
    setIsLoading(true);
    setOffset((prev) => prev + 1);
    try {
      const newPosts = await fetchCommunityPosts(offset, CARDS_COUNT);

      if (newPosts) {
        setCommunityPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }

    setIsLoading(false);
  };

  const handleText = (content: string): string => {
    // 정규 표현식을 사용하여 태그를 제외한 텍스트만 추출
    const textOnly = content.replace(/<[^>]*>|&nbsp;/g, ' ');

    return textOnly;
  };

  useEffect(() => {
    if (isInView) {
      loadMorePosts(offset);
    }
  }, [isInView]);

  useEffect(() => {
    // Initial load
    getCurrentUserCommunityPosts();
  }, []);

  return (
    <StPostContainer ref={containerRef}>
      {activeTab === 3 &&
        communityPosts.map((post) => {
          return (
            <MyPageCommunityCard
              id={post.id}
              title={post.title}
              content={post.content}
              created_at={post.created_at}
              // images={post.main_image}
              post_id={post.post_id}
              comment={post.comment}
              likes={post.likes}
            />
          );
        })}

      {activeTab === 4 &&
        favCommunityPosts.map((post) => {
          return (
            <MyPageCommunityCard
              id={post.id}
              title={post.title}
              content={post.content}
              created_at={post.created_at}
              // images={post.main_image}
              post_id={post.post_id}
              comment={post.comment}
              likes={post.likes}
            />
          );
        })}

      {isLoading && <SkeletonCommunityCard cards={10} />}
    </StPostContainer>
  );
};

export default MyPageCommunityPostList;
