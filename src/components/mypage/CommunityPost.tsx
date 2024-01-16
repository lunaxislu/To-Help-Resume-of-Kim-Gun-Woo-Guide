import React, { useEffect, useState } from 'react';

import {
  StPostContainer,
  StPostWrapper
} from '../../styles/mypageStyle/CommunityRowStyle';

export interface Community {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface CommunityCardProps {
  list: Community[];
}

const CommunityPost: React.FC<CommunityCardProps> = ({ list }) => {
  return (
    <StPostContainer>
      {list.map((post) => {
        return (
          <StPostWrapper key={post.id}>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <p>{post.created_at}</p>
          </StPostWrapper>
        );
      })}
    </StPostContainer>
  );
};

export default CommunityPost;
