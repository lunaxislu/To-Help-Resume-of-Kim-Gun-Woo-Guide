import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CommuListProps, Post } from '../../pages/community/api/model';
import * as St from '../../styles/community/CommunityListStyle';
import parseDate from '../../util/getDate';

//우선 랜덤한 느낌만 들게 인덱스로
//영상 찍고 글쓰기에 추가하는식으로 변경하자
const RANDOM_COLORS = [
  'red',
  'yellow',
  'yellow',
  'green',
  'blue',
  'purple',
  'green',
  'red',
  'yellow',
  'purple',
  'blue',
  'purple',
  'green',
  'red',
  'yellow',
  'purple',
  'blue'
];
const CommunityList: React.FC<CommuListProps> = ({ posts }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleText = (content: string): string => {
    // 정규 표현식을 사용하여 태그를 제외한 텍스트만 추출
    const textOnly = content.replace(/<[^>]*>|&nbsp;/g, ' ');

    return textOnly;
  };

  //색 랜덤 지정
  // const generateRandomColorName = (): string =>
  //   RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
  const getColorIndexByPostId = (postId: number): number => {
    return postId % RANDOM_COLORS.length;
  };
  return (
    <div>
      <St.Container>
        {posts?.map((post: Post) => {
          // const postColor = generateRandomColorName();
          const colorIndex = getColorIndexByPostId(post.post_id);
          const postColor = RANDOM_COLORS[colorIndex];
          return (
            <St.Posts
              key={post.post_id}
              onClick={() => {
                navigate(`/community/detail/${post.post_id}`);
              }}
              $postcolor={postColor}
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
                  <St.LikesIcon $postcolor={postColor} />
                  <p>{post.likes}</p>
                  <St.CommentIcon $postcolor={postColor} />
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

export default React.memo(CommunityList);
