import React from 'react';
import styled from 'styled-components';
import { Product } from '../../pages/productsDetail/types';
import ProductDetail from './ProductDetailBody';

type ProductInfo = {
  labels: string[];
  productInfo: any[];
  data: Product;
};

const ProductDetailInfo = ({ labels, productInfo, data }: ProductInfo) => {
  return (
    <>
      {labels.map((label: string, i: number) => {
        return (
          <StProductRow key={i}>
            <StRowLabel>* {label}</StRowLabel>
            <ProductDetail productInfo={productInfo} data={data} i={i} />
          </StProductRow>
        );
      })}
    </>
  );
};

const StProductRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const StRowLabel = styled.div`
  width: 150px;
  font-family: 'Pretendard-Medium';
  font-size: 0.875rem;
  color: #878787;
`;

export default ProductDetailInfo;
