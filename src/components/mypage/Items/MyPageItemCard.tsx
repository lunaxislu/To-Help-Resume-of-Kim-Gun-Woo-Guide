import React from 'react';
import {
  StCardWrapper,
  StProductImage,
  StProductPrice,
  StProductQuality
} from '../../../styles/mypageStyle/ProductCardStyle';
import { MyPageItemCardProps } from '../../../api/supabase/products';

const MyPageItemCard: React.FC<MyPageItemCardProps> = ({
  id,
  image_url,
  user,
  quality,
  title,
  price
}) => {
  return (
    <StCardWrapper key={id} to={`/products/detail/${id}`}>
      <StProductImage
        src={image_url !== null && image_url !== undefined ? image_url[0] : ''}
        alt=""
      />
      <StProductQuality>{quality}</StProductQuality>
      <p>{user}</p>
      <p>{title.length >= 12 ? `${title.substring(0, 12)}...` : title}</p>
      <StProductPrice>{price.toLocaleString('ko-KR')}원</StProductPrice>
    </StCardWrapper>
  );
};

export default MyPageItemCard;
