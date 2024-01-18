import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';
import CommuList from '../../components/community/CommuList';
import { categoryArray } from './WritePost';
import { fetchPosts } from './commuQuery';
const CommunityMain: React.FC = () => {
  const [selectCategory, setSelectCategory] = useState('전체');
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useQuery('posts', fetchPosts);

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <Container>
      <Post_container>
        <h2>
          {posts
            ? `${posts?.length}개의 이야기를 확인해보세요`
            : '0개의 이야기를 확인해보세요'}
        </h2>
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
        </FeatureBar>
        <CommuList selectCategory={selectCategory} />
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
  max-width: 906px;
  width: 80%;
  margin-bottom: 50px;
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
