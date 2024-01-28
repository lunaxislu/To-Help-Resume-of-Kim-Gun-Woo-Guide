import React from 'react';
import {
  CommentIcon,
  LikesIcon,
  StIconAndDateWrapper,
  StIconContainer,
  StPostContent,
  StPostContentsWrapper,
  StPostDate,
  StPostImage,
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
  likes,
  main_image
}) => {
  const handleText = (content: string): string => {
    const textOnly = content.replace(/<[^>]*>|&nbsp;/g, ' ');
    return textOnly;
  };

  return (
    <StPostWrapper key={id} to={`/community/detail/${post_id}`}>
      <StPostTitle>{title}</StPostTitle>
      <StPostContentsWrapper>
        {main_image && <StPostImage src={main_image} alt={title} />}

        <StPostContent>
          {handleText(
            content.length >= 70 ? `${content.substring(0, 70)}...` : content
          )}
        </StPostContent>
      </StPostContentsWrapper>

      <StIconAndDateWrapper>
        <StIconContainer>
          <LikesIcon />
          <span>{likes}</span>
          <CommentIcon />
          <span>{comment?.length}</span>
        </StIconContainer>
        <StPostDate>{parseDate(created_at)}</StPostDate>
      </StIconAndDateWrapper>
    </StPostWrapper>
  );
};
