import React, { useEffect, useRef, useState } from 'react';
import {
  StIconAndDateWrapper,
  StIconContainer,
  StPostContainer,
  StPostContent,
  StPostContentsWrapper,
  StPostDate,
  StPostImage,
  StPostTitle,
  StPostWrapper
} from '../../styles/mypageStyle/CommunityCardStyle';

import 'react-loading-skeleton/dist/skeleton.css';
import { supabase } from '../../api/supabase/supabaseClient';
import { debounce } from 'lodash';
import SkeletonCommunityCard from '../card/SkeletonCommunityCard';
import { userId } from '../../util/getUserId';
import parseDate from '../../util/getDate';

export interface Community {
  id: number;
  title: string;
  content: string;
  created_at: string;
  images: string;
  post_id: string;
  comment: [];
}

interface CommunityCardProps {
  // list: Community[];
  activeTab: number;
}

const CommunityPost: React.FC<CommunityCardProps> = ({ activeTab }) => {
  const CARDS_COUNT = 10;
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [isInView, setIsInView] = useState(false);
  const [communityPosts, setCommunityPosts] = useState<Community[]>([]);

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

  console.log(communityPosts);

  return (
    <StPostContainer ref={containerRef}>
      {activeTab === 3 &&
        communityPosts.map((post) => {
          console.log(post);
          return (
            <StPostWrapper
              key={post.id}
              to={`/community/detail/${post.post_id}`}
            >
              <StPostTitle>{post.title}</StPostTitle>
              <StPostContentsWrapper>
                {!post.images ? '' : <StPostImage src={post.images} />}
                <StPostContent>{handleText(post.content)}</StPostContent>
              </StPostContentsWrapper>

              <StIconAndDateWrapper>
                <StIconContainer>
                  <img src="/assets/thabong.png" />
                  <span>{post.comment?.length}</span>
                </StIconContainer>

                <StPostDate>{parseDate(post.created_at)}</StPostDate>
              </StIconAndDateWrapper>
            </StPostWrapper>
          );
        })}

      {isLoading && <SkeletonCommunityCard cards={10} />}
    </StPostContainer>
  );
};

export default CommunityPost;
