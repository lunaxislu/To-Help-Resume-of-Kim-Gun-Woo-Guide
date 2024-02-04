import React from 'react';
import { useQuery } from 'react-query';
import { getPostCount } from '../../pages/community/api/commuQuery';
import { CommunityMainCountProps } from '../../pages/community/api/model';
import * as St from '../../styles/community/CommunityMainStyle';

const CommunityMainCount: React.FC<CommunityMainCountProps> = ({
  selectCategory
}) => {
  const { data: count } = useQuery(
    ['posts_count', selectCategory],
    () => getPostCount(selectCategory),
    {
      staleTime: 60000
    }
  );

  return <St.Title>{`${count ?? 0}개의 이야기를 확인해보세요`}</St.Title>;
};

export default React.memo(CommunityMainCount);
