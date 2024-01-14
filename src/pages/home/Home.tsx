import React from 'react';
import styled from 'styled-components';
import { Community, UsedItem } from '../usedtypes';
import { supabase } from '../../api/supabase/supabaseClient';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Carousel from '../../components/mainpage/Carousel';

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

  const carouselImages: string[] = [
    process.env.PUBLIC_URL + '/assets/carousel1.png',
    process.env.PUBLIC_URL + '/assets/carousel2.png',
    process.env.PUBLIC_URL + '/assets/carousel3.png'
  ];

  return (
    <HomeContainer>
      <Carousel images={carouselImages} />
      <HomeSection>
        <div className="one">
          <div>
            {<span>{usedItems.length}개</span>}의 상품이 거래되고 있어요!
          </div>
          <LinktoProducts to="/products">전체보기</LinktoProducts>
        </div>

        <h2>오늘의 중고거래</h2>
        <SupabaseListContainer>
          {usedItems.map((item) => (
            <SupabaseList key={item.id}>
              {item.image_Url && <img src={item.image_Url} alt="Item" />}
              <h1>{item.quality}</h1>
              <h3>{item.title}</h3>
              <p>{item.price},000원</p>
            </SupabaseList>
          ))}
          <SupabaseList>
            <img
              src="https://apoudtyiediwwawobaah.supabase.co/storage/v1/object/sign/picture_test/pictures/Rectangle%2090%20(3).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaWN0dXJlX3Rlc3QvcGljdHVyZXMvUmVjdGFuZ2xlIDkwICgzKS5wbmciLCJpYXQiOjE3MDUyMzUwNTMsImV4cCI6MTcwNzgyNzA1M30.h0-eCT4ecs_DOMqQr4XE6NI6ynan0mOD8MBD31KzvbM&t=2024-01-14T12%3A24%3A13.597Z"
              alt="laptop"
            />
            <h1>사용감 많음</h1>
            <h3>클램프</h3>
            <p>600,000원</p>
          </SupabaseList>
          <SupabaseList>
            <img
              src="https://apoudtyiediwwawobaah.supabase.co/storage/v1/object/sign/picture_test/pictures/Rectangle%2090%20(4).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaWN0dXJlX3Rlc3QvcGljdHVyZXMvUmVjdGFuZ2xlIDkwICg0KS5wbmciLCJpYXQiOjE3MDUyMzMxNzMsImV4cCI6MTcwNzgyNTE3M30.mSJuS-bbX3BM3cnSzj7zRBOWueZXrthZyuMwBFLzbT0&t=2024-01-14T11%3A52%3A53.155Z"
              alt="laptop"
            />
            <h1>사용감 적음</h1>
            <h3>절단기</h3>
            <p>600,000원</p>
          </SupabaseList>
        </SupabaseListContainer>
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
  /* display: flex; */
  flex-direction: column;
`;

const HomeSection = styled.div`
  margin: 0 100px;
  margin-top: 20px;
  /* display: flex; */
  /* justify-content: center;
  align-items: center; */
  span {
    font-weight: bold;
  }
  .one {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
  }

  h2 {
    text-align: left;
    margin-top: 20px;
    margin-left: 10px;
  }
`;
const LinktoProducts = styled(Link)`
  text-decoration: none;
  color: #000;
  cursor: pointer;
  font-weight: bold;
`;

const SupabaseListContainer = styled.ul`
  width: 100%;
  height: 325px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;
const SupabaseList = styled.li`
  flex: 1 0 calc(20% - 20px);
  width: 208px;
  height: 325px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 208px;
    object-fit: cover;
    border-style: none;
  }
  h1 {
    width: 90px;
    padding: 8px;
    color: #656464;
    text-align: center;
    background-color: rgba(255, 122, 0, 0.1);
    border-radius: 3px;
    margin-top: 10px;
    font-weight: bold;
  }
  h3 {
    font-size: 16px;
    margin-top: 30px;
  }

  p {
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    text-align: left;
  }
`;

export default Home;
