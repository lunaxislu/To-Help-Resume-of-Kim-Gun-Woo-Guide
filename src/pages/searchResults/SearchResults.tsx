import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { supabase } from '../../api/supabase/supabaseClient';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { Communityy, UsedItem } from '../usedtypes';

const SearchResults: React.FC = () => {
  const { usedItemResults, communityResults } = useSelector(
    (state: RootState) => state.search.searchResults
  );
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );

  const [usedItemsWithImages, setUsedItemsWithImages] = useState<UsedItem[]>(
    []
  );
  const [communityItemsWithImages, setCommunityItemsWithImages] = useState<
    Communityy[]
  >([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // 중고 게시물 이미지 URL 가져오기
        const usedItemsImages = await Promise.all(
          usedItemResults.map(async (item) => {
            const pathToImage = `pictures/${item.image_Url}.png`;
            const { data } = await supabase.storage
              .from('picture')
              .getPublicUrl(pathToImage);
            return { ...item, data };
          })
        );

        // 커뮤니티 게시물 이미지 URL 가져오기
        const communityItemsImages = await Promise.all(
          communityResults.map(async (item) => {
            const pathToImage = `pictures/${item.image_Url}.png`;
            const { data } = await supabase.storage
              .from('community_picture')
              .getPublicUrl(pathToImage);
            return { ...item, data };
          })
        );

        setUsedItemsWithImages(usedItemsImages);
        setCommunityItemsWithImages(communityItemsImages);
      } catch (error) {
        console.error('수파베이스에 요청 중 실패:', error);
        throw error;
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery, usedItemResults, communityResults]);

  return (
    <div>
      <h2>중고거래게시물 결과</h2>
      {usedItemsWithImages.map((item) => (
        <div key={item.id}>
          <Link to={`/products/detail/${item.id}`}>
            {item.image_Url && <img src={item.image_Url} alt="Item" />}
            <h1>{item.quality}</h1>
            <h3>{item.title}</h3>
            <p>{item.price}원</p>
          </Link>
        </div>
      ))}
      <h2>커뮤니티 게시물 결과</h2>
      {communityItemsWithImages.map((item) => (
        <div key={item.post_id}>
          <Link to={`/community/detail/${item.post_id}`}>
            {item.image_Url && (
              <img src={item.image_Url} alt="Community Post" />
            )}
            <div>{item.title}</div>
            <p>{item.content}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
