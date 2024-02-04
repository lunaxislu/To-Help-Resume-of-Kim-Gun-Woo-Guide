import React from 'react';
import { useQuery } from 'react-query';
import { getPostCount } from '../../pages/community/commuQuery';
import { CommunityMainCountProps } from '../../pages/community/model';
import * as St from '../../styles/community/CommunityMainStyle';

const CommunityMainCount: React.FC<CommunityMainCountProps> = ({
  selectCategory
}) => {
  const { data: count } = useQuery(
    ['posts_count', selectCategory],
    () => getPostCount(selectCategory)
    // {
    //   staleTime: 60000,
    //   onSuccess: (count) => {
    //     // 여기서 selectCategory를 이용한 작업을 수행
    //     console.log('Data fetched successfully', count);
    //   }
    // }
  );
  console.log(count);
  return <St.Title>{`${count ?? 0}개의 이야기를 확인해보세요`}</St.Title>;
};

export default React.memo(CommunityMainCount);
