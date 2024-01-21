import { BsChatRightFill } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { fetchPosts } from '../../pages/community/commuQuery';
import { CommuListProps, Post } from '../../pages/community/model';
import parseDate from '../../util/getDate';
const CommuList: React.FC<CommuListProps> = ({
  selectCategory
}: {
  selectCategory: string;
}) => {
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useQuery('posts', fetchPosts);

  if (isLoading) {
    return <Title>Loading...</Title>;
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
    <Container>
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
            <Posts
              key={post.post_id}
              onClick={() => navigate(`/community/detail/${post.post_id}`)}
            >
              <div>
                {' '}
                <h2>
                  {post.title}
                  {/* {post.main_image ? <img src="/assets/imageIcon.png" /> : ''} */}
                </h2>
                <div>
                  <ContentArea>{handleText(post.content)}</ContentArea>
                </div>
              </div>
              <RightSide>
                {' '}
                <CommentArea>
                  <CommentIcon />

                  <p>{post.comment?.length}</p>
                </CommentArea>
                <div>
                  <p>{parseDate(post.created_at)}</p>
                </div>
              </RightSide>
            </Posts>
          );
        })}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
`;
const Posts = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  padding: 3rem;
  width: 54.6rem;
  height: 19.5rem;
  gap: 1.6rem;
  border: none;
  border-radius: 1rem;
  background-color: #1f1f1f;
  justify-content: space-between;
  color: #d9d9d9;

  & h2 {
    font-size: var(--fontSize-H4);
    font-weight: var(--fontWeight-semiBold);
    margin-bottom: 1.6rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 40rem;
    color: var(--12-gray);
  }
`;
const ContentArea = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 48.6rem;
  height: 6.6rem;
  font-size: var(--fontSize-H5);
  font-weight: var(--fontWeight-medium);
  line-height: 2.2rem;
  color: var(--9-gray);
`;
const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--fontSize-H6);
  color: var(--6-gray);
`;
const CommentArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--8-gray);
  & img {
    margin-top: 0.3rem;
  }
`;
const CommentIcon = styled(BsChatRightFill)`
  color: #dbff00;
  opacity: 50%;
`;
const Title = styled.h2`
  color: white;
  font-size: 2.4rem;
`;
export default CommuList;
