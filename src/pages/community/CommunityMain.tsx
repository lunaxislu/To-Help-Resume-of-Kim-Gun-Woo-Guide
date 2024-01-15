import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
import { Post } from './model';
// const categorys = ["전체",'꿀팁', "일상생활", "공구거래"]
const CommunityMain: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        let { data: community, error } = await supabase
          .from('community')
          .select('*');
        if (error) throw error;
        if (community != null) {
          setPosts(community);
        }
      } catch (error: any) {
        alert(error.message);
      }
    };

    getPost();
  }, []);
  // 필터 확실해지면 다시.
  // const filteredPost = posts.filter((post) => {
  //   return;
  // });
  const navigate = useNavigate();

  const extractTextFromHtml = (htmlString: string): string => {
    // 정규 표현식을 사용하여 태그를 제외한 텍스트만 추출
    const textOnly = htmlString.replace(/<[^>]*>/g, '');

    return textOnly;
  };
  return (
    <Container>
      <h1>커뮤니티</h1>
      <button
        onClick={() => {
          navigate('/community_write');
        }}
      >
        작성데스
      </button>
      <div>
        <button>전체</button>
        <button>꿀팁</button>
        <button>일상생활</button>
        <button>공구거래</button>
      </div>
      <p></p>

      {posts.map((post: Post) => {
        return (
          <Posts
            key={post.post_id}
            onClick={() => navigate(`/community/${post.post_id}`)}
          >
            {/* <img src={post.main_image} /> */}

            <div>
              {' '}
              <h2>
                [{post.category}]{post.title}
                {post.main_image ? '🎞' : ''}
              </h2>
              {/* {post.files && post.files.length > 0 && (
                <div>
                  {post.files.map((file: FilesObject, index) => (
                    <a
                      key={index}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.name}
                    </a>
                  ))}
                </div>
              )} */}
              <Post_content>{extractTextFromHtml(post.content)}</Post_content>
            </div>
          </Posts>
        );
      })}
    </Container>
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
const Post_content = styled.div``;
const Posts = styled.div`
  border: 2px solid pink;
  display: flex;
  width: 80%;
  max-width: 1116px;
  font-size: 20px;
  /* justify-content: space-between; */
  & img {
    width: 100px;
    height: 100px;
  }
  & h2 {
    font-weight: 700;
  }
`;

export default CommunityMain;
