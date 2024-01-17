import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { fetchPosts } from '../../pages/community/commuQuery';
import { CommuListProps, Post } from '../../pages/community/model';
const CommuList: React.FC<CommuListProps> = ({
  selectCategory
}: {
  selectCategory: string;
}) => {
  // const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useQuery('posts', fetchPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  const handleText = (content: string): string => {
    // 정규 표현식을 사용하여 태그를 제외한 텍스트만 추출
    const textOnly = content.replace(/<[^>]*>/g, '');

    return textOnly;
  };

  return (
    <div>
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
              {post.main_image ? <img src={post.main_image} /> : ''}

              <div>
                {' '}
                <h2>
                  {post.title}
                  {/* {post.main_image ? '🎞' : ''} */}
                </h2>
                <p>{handleText(post.content)}</p>
              </div>
              <div>
                <p>{post.created_at}</p>
              </div>
            </Posts>
          );
        })}
    </div>
  );
};
const Container = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Post_container = styled.div`
  max-width: 1116px;
  width: 80%;
  margin-bottom: 50px;
`;

const Posts = styled.div`
  display: flex;
  font-size: 20px;
  padding: 21px;
  height: 100px;
  gap: 16px;
  border: none;
  border-radius: 5px;
  background-color: #f3f3f3;
  margin-bottom: 20px;
  & img {
    width: 56px;
    height: 56px;
    /* background-color: white; */
  }
  & h2 {
    font-weight: 700;
    margin-bottom: 16px;
  }
  & p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 500px;
    font-size: 16px;
  }
`;

export default CommuList;
