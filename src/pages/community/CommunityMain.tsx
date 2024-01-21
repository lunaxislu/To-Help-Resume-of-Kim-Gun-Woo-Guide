import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
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
        <Title>
          {posts
            ? `${posts?.length}개의 이야기를 확인해보세요`
            : '0개의 이야기를 확인해보세요'}
        </Title>

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
          <WriteBtn
            onClick={() => {
              navigate('/community_write');
            }}
          >
            <WriteIcon /> 글쓰기
          </WriteBtn>
        </FeatureBar>
        <CommuList selectCategory={selectCategory} />
      </Post_container>
    </Container>
  );
};
const Container = styled.div`
  /* margin-top: 30px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
`;
const Post_container = styled.div`
  max-width: 111.6rem;
  width: 80%;
  margin-bottom: 5rem;
`;

const FeatureBar = styled.div`
  display: flex;
  margin: 1rem 0 3rem 0;
  & input {
    border: 0.1rem solid #bdbdbd;
    border-radius: 1.9rem;
    height: 3.6rem;
    width: 3.8rem;
    padding-left: 1.6rem;
  }
`;
const Categorys = styled.div`
  display: flex;
  width: 100%;
  gap: 0.6rem;
`;
const WriteBtn = styled.button`
  width: 9rem;
  height: 3.1rem;
  color: var(--12-gray);
  background-color: var(--opc-10);
  border: none;
  font-size: var(--fontSize-H5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.4rem;
`;
const WriteIcon = styled(BiEdit)`
  color: var(--opc-100);
  width: 1.5rem;
  height: 1.5rem;
`;
const Title = styled.h2`
  color: white;
  font-size: var(--fontSize-H3);
  margin-bottom: 2.4rem;
  margin: 2.4rem 0rem;
`;
const CategoryBtn = styled.button<{ $selectCategory: string }>`
  border: none;
  height: 3rem;
  width: 5.6rem;
  border-radius: 5.6rem;

  ${(props) => {
    if (props.$selectCategory === props.children) {
      return css`
        background-color: var(--opc-100);
        font-weight: var(--fontWeight-bold);
      `;
    }
    if (props.children === '전체') {
      return css`
        background-color: var(--opc-10);
        border: 0.1rem solid #dbff00;
        color: var(--12-gray);
      `;
    }

    return css`
      background-color: var(--opc-10);
      color: var(--6-gray);
    `;
  }}
`;
export default CommunityMain;
