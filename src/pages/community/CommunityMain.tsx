import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
type Post = {
  post_id: number;
  title: string;
  content: string;
  created_at: string;
  category: string;
  post_user: string;
  nickname: string;
  comment: { user_id: string; user_name: string } | null;
  likes: number | null;
  like_user: { uid: string }[] | null;
  files: string;
};
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
  console.log(posts);
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
          <Post key={post.post_id}>
            <Post_content>
              {' '}
              <h2>
                [{post.category}]{post.title}
              </h2>
              {post.files && (
                <div>
                  <p>Uploaded File:</p>
                  <a
                    href={post.files}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    첨부파일
                  </a>
                </div>
              )}
              {/* <p>{post.content}</p> */}
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </Post_content>
          </Post>
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
const Post = styled.div`
  border: 2px solid pink;
  display: flex;
  width: 600px;
  font-size: 20px;
  justify-content: space-between;
  & img {
    width: 100px;
  }
  & h2 {
    font-weight: 700;
  }
`;

export default CommunityMain;
