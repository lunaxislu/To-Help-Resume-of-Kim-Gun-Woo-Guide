import React, { useEffect, useRef, useState } from 'react';
import { StPostContainer } from '../../../styles/mypageStyle/CommunityCardStyle';
import 'react-loading-skeleton/dist/skeleton.css';
import { supabase } from '../../../api/supabase/supabaseClient';
import { debounce } from 'lodash';
import SkeletonCommunityCard from '../../skeleton/SkeletonCommunityCard';
import { Community, CommunityActive } from '../../../api/supabase/community';
import { MyPageCommunityCard } from './MyPageCommunityCard';
import { useAppDispatch } from '../../../redux/reduxHooks/reduxBase';
import { setFavPost, setMyPost } from '../../../redux/modules/countSlice';
import Nothing from '../Nothing';

const MyPageCommunityPostList: React.FC<CommunityActive> = ({ activeTab }) => {
  const CARDS_COUNT = 10;
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [isInView, setIsInView] = useState(false);
  const [communityPosts, setCommunityPosts] = useState<Community[]>([]);
  const [favCommunityPosts, setFavCommunityPosts] = useState<Community[]>([]);
  const userId = localStorage.getItem('userId');

  const dispatch = useAppDispatch();
  const getCurrentUserCommunityPosts = async () => {
    let { data: communityPosts, error } = await supabase
      .from('community')
      .select('*')
      .eq('post_user', userId)
      .limit(10);

    if (communityPosts && communityPosts.length > 0) {
      setCommunityPosts(communityPosts);
      dispatch(setMyPost(communityPosts));
    }
  };

  const onScrollHandler = () => {
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

    if (favCommunityPosts && favCommunityPosts.length > 0) {
      const filteredFavProducts = favCommunityPosts
        .filter((user) => user.likes_user?.includes(userId))
        .map((item) => item);

      setFavCommunityPosts(filteredFavProducts);
      dispatch(setFavPost(filteredFavProducts));
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

  useEffect(() => {
    if (isInView) {
      loadMorePosts(offset);
    }
  }, [isInView]);

  useEffect(() => {
    getCurrentUserCommunityPosts();
  }, []);

  const handleText = (content: string): string => {
    const textOnly = content.replace(/<[^>]*>|&nbsp;/g, ' ');
    return textOnly;
  };

  return (
    <StPostContainer
      ref={containerRef}
      list={communityPosts.length === 0 && activeTab === 3 ? true : false}
    >
      {activeTab === 3 &&
        communityPosts.map((post) => {
          return (
            <MyPageCommunityCard
              id={post.id}
              title={post.title}
              content={handleText(post.content)}
              created_at={post.created_at}
              main_image={post.main_image}
              post_id={post.post_id}
              comment={post.comment}
              likes={post.likes}
            />
          );
        })}

      {communityPosts.length === 0 && activeTab !== 4 && (
        <Nothing
          type={'글쓰기'}
          content={`아직 작성한 글이 없어요.\n커뮤니티에 작업자들과 이야기를 나눠보세요!`}
          icon={'/assets/write.svg'}
          to={'/community_write'}
          show={true}
        />
      )}

      {activeTab === 4 &&
        favCommunityPosts.map((post) => {
          return (
            <MyPageCommunityCard
              id={post.id}
              title={post.title}
              content={handleText(post.content)}
              created_at={post.created_at}
              main_image={post.main_image}
              post_id={post.post_id}
              comment={post.comment}
              likes={post.likes}
            />
          );
        })}
      {favCommunityPosts.length === 0 && activeTab !== 3 && (
        <Nothing
          type={''}
          content={`추천하신 글이 없습니다.`}
          icon={''}
          to={''}
          show={false}
        />
      )}
      {isLoading && <SkeletonCommunityCard cards={10} />}
    </StPostContainer>
  );
};

export default MyPageCommunityPostList;
