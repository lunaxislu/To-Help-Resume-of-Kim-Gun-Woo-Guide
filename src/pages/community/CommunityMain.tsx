import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
import { categoryArray } from './WritePost';
import { Post } from './model';
const CommunityMain: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectCategory, setSelectCategory] = useState('전체');
  useEffect(() => {
    const getPost = async () => {
      try {
        let { data: community, error } = await supabase
          .from('community')
          .select('*')
          .order('post_id', { ascending: false });
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

  const handleText = (content: string): string => {
    // 정규 표현식을 사용하여 태그를 제외한 텍스트만 추출
    const textOnly = content.replace(/<[^>]*>/g, '');

    return textOnly;
  };
  console.log(selectCategory);
  return (
    <Container>
      <Post_container>
        <h2>{`${posts.length}개의 이야기를 확인해보세요`}</h2>
        <button
          onClick={() => {
            navigate('/community_write');
          }}
        >
          글쓰기
        </button>
        <FeatureBar>
          <Categorys>
            {categoryArray.map((category) => {
              return (
                <CategoryBtn
                  onClick={(event) => {
                    //event.target의 타입을 HTMLElement로 명시적으로 지정
                    const target = event.target as HTMLElement;
                    setSelectCategory(target.textContent || '');
                  }}
                  key={category}
                  $selectCategory={selectCategory}
                >
                  {category}
                </CategoryBtn>
              );
            })}
          </Categorys>
          <form>
            <input placeholder="검색어를 입력하세요" />
          </form>
        </FeatureBar>

        {posts
          .filter((post) => {
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
      </Post_container>
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
  }
`;
const FeatureBar = styled.div`
  display: flex;
  margin: 10px 0 30px 0;
  & input {
    border: 1px solid #bdbdbd;
    border-radius: 19px;
    height: 36px;
    width: 380px;
    padding-left: 16px;
  }
`;
const Categorys = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
`;
const CategoryBtn = styled.button<{ $selectCategory: string }>`
  border: none;
  height: 30px;
  width: 56px;
  border-radius: 6px;

  ${(props) => {
    if (props.$selectCategory === props.children) {
      console.log(props.$selectCategory);
      console.log(props.children);

      return css`
        background-color: #636363;
        color: white;
      `;
    }
    return css`
      background-color: #f3f3f3;
      color: black;
    `;
  }}
`;
export default CommunityMain;
