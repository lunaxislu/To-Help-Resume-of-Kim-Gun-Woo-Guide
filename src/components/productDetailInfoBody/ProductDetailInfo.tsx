import React, { useState } from 'react';
import { Product } from '../../pages/productsDetail/ProductDetail';
import styled from 'styled-components';
import { StFadeAni } from '../../pages/chat/ChatRoom';

type ProductInfo = {
  labels: string[];
  productInfo: any[];
  data: Product;
};

const ProductDetailInfo = ({ labels, productInfo, data }: ProductInfo) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const showQuality = () => {
    setIsHover(true);
  };

  const hideQuality = () => {
    setIsHover(false);
  };

  return (
    <div>
      {labels.map((label: string, i: number) => {
        return (
          <StProductRow key={i}>
            <StRowLabel>* {label}</StRowLabel>
            {productInfo[i] === data.quality ? (
              <StRowValue>
                <p
                  style={{
                    padding: '.3rem',
                    backgroundColor: '#f3f3f3',
                    width: 'fit-content'
                  }}
                >
                  {productInfo[i]}
                </p>
                <StQuailityInfo>
                  <p onMouseEnter={showQuality} onMouseLeave={hideQuality}>
                    i
                  </p>
                  {isHover && (
                    <StQuilityInfoBox>
                      거의 새것 - 대충 깔끔하다는 뜻
                    </StQuilityInfoBox>
                  )}
                </StQuailityInfo>
              </StRowValue>
            ) : (
              <StRowValue>{productInfo[i]}</StRowValue>
            )}
          </StProductRow>
        );
      })}
    </div>
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

const StRowValue = styled.div`
  width: 100%;
  font-family: 'Pretendard-Medium';
  font-size: 0.875rem;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StQuailityInfo = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  background-color: var(--primary-color);
  color: white;
  line-height: 1.4;
  cursor: pointer;
  position: relative;
`;

const StQuilityInfoBox = styled.div`
  width: 220px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: -250px;
  bottom: -150px;
  padding: 1rem;
  color: white;
  animation: ${StFadeAni} 0.2s forwards;
`;

export default ProductDetailInfo;
