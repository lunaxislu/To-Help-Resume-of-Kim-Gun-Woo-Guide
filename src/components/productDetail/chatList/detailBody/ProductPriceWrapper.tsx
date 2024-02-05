import React from 'react';
import * as St from '../../../../pages/productsDetail/style';
import { Product } from '../../../../pages/productsDetail/types';
import parseDate from '../../../../util/getDate';
import {
  StPriceContainer,
  StShippingCostInfoBox
} from '../../ProductDetailStyles';

type PriceWrapperProps = {
  data: Product;
  isMobile: boolean;
};

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
