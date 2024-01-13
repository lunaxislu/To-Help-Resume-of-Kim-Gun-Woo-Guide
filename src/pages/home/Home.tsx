import React from 'react';
import styled from 'styled-components';
import { Community, UsedItem } from '../usedtypes';
import { supabase } from '../../api/supabase/supabaseClient';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

// 중고게시물 및 커뮤니티 게시물 + 사진 받아오는 로직
export const fetchData = async (): Promise<{
  usedItems: UsedItem[];
  communityItems: Community[];
}> => {
  try {
    const { data: usedItemsData, error: usedItemsError } = await supabase
      .from('used_item__board')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    const { data: communityItemsData, error: communityItemsError } =
      await supabase
        .from('community')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (usedItemsError || communityItemsError) {
      console.error(
        '데이터 베이스에 요청을 실패하였습니다:',
        usedItemsError || communityItemsError
      );
      return { usedItems: [], communityItems: [] };
    }

    const usedItemsWithImages = await Promise.all(
      usedItemsData.map(async (item) => {
        const pathToImage = `pictures/${item.image_Url}.png`;
        const { data } = await supabase.storage
          .from('picture')
          .getPublicUrl(pathToImage);
        return { ...item, data };
      })
    );

    const communityItemsWithImages = await Promise.all(
      communityItemsData.map(async (item) => {
        const pathToImage = `pictures/${item.image_Url}.png`;
        const { data } = await supabase.storage
          .from('community_picture')
          .getPublicUrl(pathToImage);
        return { ...item, data };
      })
    );

    return {
      usedItems: usedItemsWithImages || [],
      communityItems: communityItemsWithImages || []
    };
  } catch (error) {
    console.error('수파베이스에 요청 중 실패:', error);
    throw error;
  }
};

const Home = () => {
  const {
    data: { usedItems = [], communityItems = [] } = {},
    isLoading,
    isError
  } = useQuery('data', fetchData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오기를 실패했습니다.</div>;
  }

  return (
    <HomeContainer>
      <HomeSection>
        <div className="one">
          <div>
            {<span>{usedItems.length}개</span>}의 상품이 거래되고 있어요!
          </div>
          <LinktoProducts to="/products">전체보기</LinktoProducts>
        </div>

        <h2>오늘의 중고거래</h2>
        <ul>
          {usedItems.map((item) => (
            <SupabaseList key={item.id}>
              {item.image_Url && <img src={item.image_Url} alt="Item" />}
              <h3>{item.title}</h3>
              <p>{item.contents}</p>
              <p>Price: {item.price}</p>
              <p>Location: {item.location}</p>
              <p>Deal Type: {item.deal_type}</p>
            </SupabaseList>
          ))}
        </ul>
      </HomeSection>

      <div>
        <h2>커뮤니티</h2>
        <ul>
          {communityItems.map((item) => (
            <div key={item.post_id}>
              {item.image_Url && (
                <img src={item.image_Url} alt="Community Post" />
              )}
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <p>Category: {item.category}</p>
              <p>Likes: {item.likes}</p>
            </div>
          ))}
        </ul>
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.section`
  border-top: 1px solid #000;
  display: flex;
  flex-direction: column;
`;

const HomeSection = styled.section`
  margin: 0 400px;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  span {
    font-weight: bold;
  }
  .one {
    display: flex;
    justify-content: space-between;
  }

  h2 {
    text-align: left;
    margin-top: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 20px;

    hr {
      width: 100%;
      margin: 10px 0;
      border: none;
      height: 1px;
      background-color: #000;
    }
  }
`;
const LinktoProducts = styled(Link)`
  text-decoration: none;
  color: #000;
  cursor: pointer;
  font-weight: bold;
`;
const SupabaseList = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
  border: 1px solid black;
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
`;

export default Home;
