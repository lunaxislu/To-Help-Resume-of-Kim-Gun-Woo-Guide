import React from 'react';
import * as St from '../../pages/productsDetail/style';
import { Product } from '../../pages/productsDetail/types';
import parseDate from '../../util/getDate';
import styled from 'styled-components';

type PriceWrapperProps = {
  data: Product;
  isMobile: boolean;
};

const StPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StShippingCostInfoBox = styled.div`
  padding: 0.5rem;
  background-color: var(--opc-100);
  color: white;
  border-radius: 2px;
  font-size: 1.4rem;
  font-weight: 500;
`;

const ProductPriceWrapper = ({ data, isMobile }: PriceWrapperProps) => {
  return (
    <>
      <St.StHeaderPriceWrapper>
        <StPriceContainer>
          <St.StPrice>{data.price.toLocaleString('kr-KO')}원</St.StPrice>
          <StShippingCostInfoBox>{data.shipping_cost}</StShippingCostInfoBox>
        </StPriceContainer>

        {!isMobile && (
          <St.StTimeLeft>{parseDate(data.created_at)}</St.StTimeLeft>
        )}
      </St.StHeaderPriceWrapper>
    </>
  );
};

export default ProductPriceWrapper;
