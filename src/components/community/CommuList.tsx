import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { fetchPosts } from '../../pages/community/commuQuery';
import { CommuListProps, Post } from '../../pages/community/model';
import * as St from '../../styles/community/CommunityListStyle';
import parseDate from '../../util/getDate';
const CommuList: React.FC<CommuListProps> = ({
  selectCategory
}: {
  selectCategory: string;
}) => {
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useQuery('posts', fetchPosts);

  if (isLoading) {
    return <St.Title>Loading...</St.Title>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  const handleText = (content: string): string => {
    // 정규 표현식을 사용하여 태그를 제외한 텍스트만 추출
    const textOnly = content.replace(/<[^>]*>|&nbsp;/g, ' ');

    return textOnly;
  };

  return (
    <St.Container>
      {posts
        ?.filter((post) => {
          if (selectCategory === '전체') {
            return posts;
          } else {
            return post.category === selectCategory;
          }
        })
        .map((post: Post) => {
          return (
            <St.Posts
              key={post.post_id}
              onClick={() => navigate(`/community/detail/${post.post_id}`)}
            >
              <div>
                {' '}
                <h2>{post.title}</h2>
                <St.ContentsContainer>
                  {post.main_image ? (
                    <St.MainImg>
                      <img src={post.main_image} />{' '}
                    </St.MainImg>
                  ) : (
                    ''
                  )}

                  <St.ContentArea>{handleText(post.content)}</St.ContentArea>
                </St.ContentsContainer>
              </div>
              <St.RightSide>
                {' '}
                <St.CommentArea>
                  <St.LikesIcon />
                  <p>{post.likes}</p>
                  <St.CommentIcon />
                  <p>{post.comment?.length}</p>
                </St.CommentArea>
                <div>
                  <p>{parseDate(post.created_at)}</p>
                </div>
              </St.RightSide>
            </St.Posts>
          );
        })}
    </St.Container>
  );
};

export default CommuList;
