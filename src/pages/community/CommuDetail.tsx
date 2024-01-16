import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
import { FilesObject, Post } from './model';
const CommuDetail: React.FC = () => {
  const param = useParams();
  const [posts, setPosts] = useState<Post[]>([]);

  const [comments, setComments] = useState();
  useEffect(() => {
    const getPost = async () => {
      try {
        let { data: community, error } = await supabase
          .from('community')
          .select('*')
          .eq('post_id', param.id);
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

  return (
    <Container>
      <ContentsContainer>
        {posts.map((post) => {
          return (
            <div key={post.post_id}>
              <Topper>
                <TopperLeft>
                  <h1>{post.title}</h1>
                  <p>{!!post.anon ? '익명의 작업자' : post.nickname}</p>
                </TopperLeft>

                <TopperRight>
                  <p>{post.created_at}</p>
                  <IconContainer>
                    <Icon src="/assets/comment.png" />
                    <p>0</p>
                    <Icon src="/assets/heart.png" />
                    <p>0</p>
                  </IconContainer>
                </TopperRight>
              </Topper>
              <div>
                <p>{post.category}</p>
                <Content>{parse(post.content)}</Content>
                {post.files && post.files.length > 0 && (
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
                )}
              </div>
            </div>
          );
        })}
      </ContentsContainer>

      <form>
        <input />
        <button>댓글 등록하기</button>
      </form>
    </Container>
  );
};
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & strong {
    font-weight: bold;
  }
  & em {
    font-style: italic;
  }
`;
const ContentsContainer = styled.div`
  width: 80%;
  max-width: 1116px;
  min-height: 600px;
`;

const Icon = styled.img`
  width: 20px;
`;
const Topper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1116px;
`;
const TopperRight = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopperLeft = styled.div`
  display: flex;
  flex-direction: column;
  &h1 {
    font-size: 20px;
  }
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: end;
`;
export default CommuDetail;
