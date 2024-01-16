import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { supabase } from '../../api/supabase/supabaseClient';
import { Community, UsedItem } from '../usedtypes';

const SearchResults: React.FC = () => {
  const [usedItemResults, setUsedItemResults] = useState<UsedItem[]>([]);
  const [communityResults, setCommunityResults] = useState<Community[]>([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchQuery) {
          // 중고 게시물 검색
          const { data: usedItemData, error: usedItemError } = await supabase
            .from('used_item__board')
            .select('*')
            .textSearch('title', searchQuery);

          // 커뮤 게시물 검색
          const { data: communityData, error: communityError } = await supabase
            .from('community')
            .select('*')
            .textSearch('title', searchQuery);

          if (usedItemError || communityError) {
            console.error(
              '데이터 베이스에 요청을 실패하였습니다:',
              usedItemError || communityError
            );
            return;
          }

          setUsedItemResults(usedItemData || []);
          setCommunityResults(communityData || []);
        }
      } catch (error) {
        console.error('수파베이스에 요청 중 실패:', error);
        throw error;
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div>
      <h2>중고거래게시물 결과</h2>
      {usedItemResults.map((item) => (
        <div key={item.id}>
          <h1>{item.quality}</h1>
          <h3>{item.title}</h3>
          <p>{item.price}원</p>
          {item.image_url && <img src={item.image_url} alt={item.title} />}
        </div>
      ))}
      <h2>커뮤니티 게시물 결과</h2>
      {communityResults.map((item) => (
        <div key={item.post_id}>
          <div>{item.title}</div>
          {item.image_url && <img src={item.image_url} alt={item.title} />}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
