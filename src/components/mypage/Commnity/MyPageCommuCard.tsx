import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Post } from '../../../pages/community/api/model';
import * as St from '../../../styles/community/CommunityListStyle';
import parseDate from '../../../util/getDate';

const MyPageCommuCard = ({ posts }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleText = (content: string): string => {
    // 정규 표현식을 사용하여 태그를 제외한 텍스트만 추출
    const textOnly = content.replace(/<[^>]*>|&nbsp;/g, ' ');

    return textOnly;
  };

  return (
    <div>
      <St.Container>
        {posts?.map((post: Post) => {
          return (
            <St.Posts
              key={post.post_id}
              onClick={() => {
                navigate(`/community/detail/${post.post_id}`);
              }}
              $postcolor={post.post_color}
            >
              <div>
                {' '}
                <h2>{post.title}</h2>
                <St.ContentsContainer>
                  {post.main_image && (
                    <St.MainImg>
                      <img src={post.main_image} alt="Main" />
                    </St.MainImg>
                  )}

                  <St.ContentArea>{handleText(post.content)}</St.ContentArea>
                </St.ContentsContainer>
              </div>
              <St.RightSide>
                {' '}
                <St.CommentArea>
                  <St.LikesIcon $postcolor={post.post_color} />
                  <p>{post.likes}</p>
                  <St.CommentIcon $postcolor={post.post_color} />
                  <p>{post.comments_count}</p>
                </St.CommentArea>
                <div>
                  <p>{parseDate(post.created_at)}</p>
                </div>
              </St.RightSide>
            </St.Posts>
          );
        })}
        {/* {isLoading && <SkeletonCommunityCard cards={4} />} */}
      </St.Container>
    </div>
  );
};

export default MyPageCommuCard;
