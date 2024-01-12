import React from 'react';
import styled from 'styled-components';
import { UsedItem } from '../usedtypes';
import { supabase } from '../Supabase';
import { useQuery } from 'react-query';

export const fetchUsedItems = async (): Promise<UsedItem[]> => {
  try {
    const { data, error } = await supabase
      .from('used_item__board')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching data from Supabase:', error);
      return [];
    }
    // https://apoudtyiediwwawobaah.supabase.co/storage/v1/object/sign/picture_test/pictures/bicycle.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaWN0dXJlX3Rlc3QvcGljdHVyZXMvYmljeWNsZS5zdmciLCJpYXQiOjE3MDUwMjYxNzMsImV4cCI6MTczNjU2MjE3M30.gZmM59FnL57LRaZxbb2S5ldrua3xXqPlogAUjOyPmnM&t=2024-01-12T02%3A22%3A53.757Z

    const itemsWithImages = await Promise.all(
      data.map(async (item) => {
        // const image_Url =
        //   'https://apoudtyiediwwawobaah.supabase.co/storage/v1/object/sign/picture_test/pictures/bicycle.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaWN0dXJlX3Rlc3QvcGljdHVyZXMvYmljeWNsZS5zdmciLCJpYXQiOjE3MDUwMjYxNzMsImV4cCI6MTczNjU2MjE3M30.gZmM59FnL57LRaZxbb2S5ldrua3xXqPlogAUjOyPmnM&t=2024-01-12T02%3A22%3A53.757Z';

        const pathToImage = `pictures/${item.image_Url}.png`;

        const { data } = supabase.storage
          .from('picture_test')
          .getPublicUrl(pathToImage);
        console.log(data);
        if (error) {
          console.error('수파베이스 요청 실패', error);
          return item;
        }
        return { ...item, data };
      })
    );

    return itemsWithImages || [];
  } catch (error) {
    console.error('수파베이스에 요청 중 실패:', error);
    throw error;
  }
};

const Home = () => {
  const {
    data: usedItems = [],
    isLoading,
    isError
  } = useQuery('usedItems', fetchUsedItems);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오기를 실패했습니다.</div>;
  }

  return (
    <HomeContainer>
      <HomeSection>
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
    </HomeContainer>
  );
};

const HomeContainer = styled.section`
  border-top: 1px solid #000;
`;

const HomeSection = styled.section`
  margin: 0 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    /* display: flex; */
    /* justify-content: center; */
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;

    hr {
      width: 100%;
      margin: 10px 0;
      border: none;
      height: 1px;
      background-color: #000;
    }
  }
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
