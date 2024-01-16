import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabase/supabaseClient';
import { useQuery } from 'react-query';
import {
  StCardContainer,
  StCardWrapper,
  StProductQuality
} from '../../styles/mypageStyle/ProductCardStyle';

export interface Product {
  id: number;
  quality: string;
  title: string;
  price: number;
}

interface ProductCardProps {
  list: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ list }) => {
  return (
    <StCardContainer>
      {list.map((product) => {
        return (
          <StCardWrapper key={product.id}>
            <StProductQuality>{product.quality}</StProductQuality>
            <p>{product.title}</p>
            <p>₩{product.price}</p>
          </StCardWrapper>
        );
      })}
    </StCardContainer>
  );
};

export default ProductCard;
