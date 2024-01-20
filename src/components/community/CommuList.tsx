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
  gap: 24px;
`;
const Posts = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  padding: 30px;
  width: 546px;
  height: 195px;
  gap: 16px;
  border: none;
  border-radius: 5px;
  background-color: #1f1f1f;
  justify-content: space-between;
  color: #d9d9d9;

  & h2 {
    font-weight: 700;
    margin-bottom: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 400px;
  }
`;
const ContentArea = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 486px;
  height: 66px;
  font-size: 14px;
  line-height: 22px;
`;
const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CommentArea = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  & img {
    margin-top: 3px;
  }
`;
const CommentIcon = styled(BsChatRightFill)`
  color: #dbff00;
  opacity: 50%;
`;
const Title = styled.h2`
  color: white;
  font-size: 24px;
`;
export default CommuList;
