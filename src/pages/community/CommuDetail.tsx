import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
import { Post } from './model';
const CommuDetail = () => {
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
      {posts.map((post) => {
        return (
          <div>
            <Topper key={post.post_id}>
              <TopperLeft>
                <h1>{post.title}</h1>
                <p>{post.post_user}</p>
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
              <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            </div>
          </div>
        );
      })}
      <form>
        <input />
        <button>댓글 등록하기</button>
      </form>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img`
  width: 20px;
`;
const Topper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
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
