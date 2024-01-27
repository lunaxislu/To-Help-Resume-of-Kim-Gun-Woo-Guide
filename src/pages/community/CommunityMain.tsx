import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import CommuList from '../../components/community/CommuList';
import * as St from '../../styles/community/CommunityMainStyle';
import { categoryArray } from './WritePost';
import { fetchPosts } from './commuQuery';
const CommunityMain: React.FC = () => {
  const [selectCategory, setSelectCategory] = useState('전체');
  const [editToolOpen, setEditToolOpen] = useState(false);
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
        </St.FeatureBar>{' '}
        {/* <St.Topper2> 검색잇을 때
          <div>
            <div>
              <St.SearchBar placeholder="검색어를 입력하세요" />
            </div>
            <St.WriteBtn2
              onClick={() => {
                navigate('/community_write');
              }}
            >
              <St.WriteIcon /> 글쓰기
            </St.WriteBtn2>
          </div>

          <St.SortBar
            onClick={() => {
              setEditToolOpen(!editToolOpen);
            }}
          >
            최신순
            <St.DropIcon />
          </St.SortBar>
          {editToolOpen && (
            <St.EditDropdown>
              <St.DropdownItem>최신순</St.DropdownItem>
              <St.DropdownItem>인기순</St.DropdownItem>
            </St.EditDropdown>
          )}
        </St.Topper2> */}
        <CommuList selectCategory={selectCategory} />
      </St.Post_container>
    </St.Container>
  );
};

export default CommunityMain;
