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

    // Fetch images for each item
    const itemsWithImages = await Promise.all(
      data.map(async (item) => {
        const { data: imageData, error: imageError } = await supabase.storage
          .from('picture_test')
          .download(`path/to/${item.image_filename}`);
        if (imageError) {
          console.error(
            'Error fetching image from Supabase Storage:',
            imageError
          );
        }

        // Add image data to the item
        return { ...item, imageData };
      })
    );

    return itemsWithImages || [];
  } catch (error) {
    console.error('Error during data fetching:', error);
    throw error;
  }
};

const Home = () => {
  const {
    data: usedItems = [],
    isLoading,
    isError
  } = useQuery('usedItems', fetchUsedItems, {
    staleTime: 60000
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오기를 실패했습니다.</div>;
  }

  return (
    <HomeContainer>
      <HomeSection>
        <ul>
          {usedItems.map((item) => (
            <SupabaseList key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.contents}</p>
              <p>Price: {item.price}</p>
              {/* Display image if available */}
              {item.imageData && (
                <img
                  src={`data:${item.imageData['content-type']};base64,${item.imageData.data}`}
                  alt="Item"
                />
              )}
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
`;

const SupabaseList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
`;

export default Home;
