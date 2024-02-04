import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CommuListProps, Post } from '../../pages/community/model';
import * as St from '../../styles/community/CommunityListStyle';
import parseDate from '../../util/getDate';
const RANDOM_COLORS = ['red', 'yellow', 'green', 'blue', 'purple'];
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

  const generateRandomColorName = (): string =>
    RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];

  return (
    <div>
      <St.Container>
        {posts?.map((post: Post) => {
          const postColor = generateRandomColorName();
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
      </St.Container>
    </div>
  );
};

export default CommunityList;
