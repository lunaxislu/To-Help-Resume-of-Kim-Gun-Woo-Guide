import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import CommuList from '../../components/community/CommuList';
import * as St from '../../styles/community/CommunityMainStyle';
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
    <St.Container>
      <St.Post_container>
        <St.Title>
          {posts
            ? `${posts?.length}개의 이야기를 확인해보세요`
            : '0개의 이야기를 확인해보세요'}
        </St.Title>

        <St.FeatureBar>
          <St.Categorys>
            {categoryArray.map((category) => {
              return (
                <St.CategoryBtn
                  onClick={(event) => {
                    //event.target의 타입을 HTMLElement로 명시적으로 지정
                    const target = event.target as HTMLElement;
                    setSelectCategory(target.textContent || '');
                  }}
                  key={category}
                  $selectCategory={selectCategory}
                >
                  {category}
                </St.CategoryBtn>
              );
            })}
          </St.Categorys>
          <St.WriteBtn
            onClick={() => {
              navigate('/community_write');
            }}
          >
            <St.WriteIcon /> 글쓰기
          </St.WriteBtn>
        </St.FeatureBar>
        <CommuList selectCategory={selectCategory} />
      </St.Post_container>
    </St.Container>
  );
};

export default CommunityMain;
