import React from 'react';
import {
  StIconAndDateWrapper,
  StIconContainer,
  StPostContent,
  StPostContentsWrapper,
  StPostDate,
  StPostTitle,
  StPostWrapper
} from '../../../styles/mypageStyle/CommunityCardStyle';
import parseDate from '../../../util/getDate';
import { MyPageCommunityCardProps } from '../../../api/supabase/community';

export const MyPageCommunityCard: React.FC<MyPageCommunityCardProps> = ({
  id,
  title,
  content,
  post_id,
  comment,
  created_at,
  likes
}) => {
  const handleText = (content: string): string => {
    // 정규 표현식을 사용하여 태그를 제외한 텍스트만 추출
    const textOnly = content.replace(/<[^>]*>|&nbsp;/g, ' ');

    return textOnly;
  };

  return (
    <StPostWrapper key={id} to={`/community/detail/${post_id}`}>
      <StPostTitle>{title}</StPostTitle>
      <StPostContentsWrapper>
        {/* {!post.images ? '' : <StPostImage src={post.images} />} */}
        <StPostContent>{handleText(content)}</StPostContent>
      </StPostContentsWrapper>

      <StIconAndDateWrapper>
        <StIconContainer>
          <img src="/assets/thabong.png" />
          <span>{likes}</span>
          <img src="/assets/comments.svg" />
          <span>{comment?.length}</span>
        </StIconContainer>
        <StPostDate>{parseDate(created_at)}</StPostDate>
      </StIconAndDateWrapper>
    </StPostWrapper>
  );
};
