import React, { useState } from 'react';
import { Product } from '../../pages/productsDetail/types';
import styled from 'styled-components';
import { StFadeAni } from '../../pages/chat/style';

type BodyInfo = {
  productInfo: any[];
  data: Product;
  i: number;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductDetail = ({ productInfo, data, i, setShowMap }: BodyInfo) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const showQuality = () => {
    setIsHover(true);
  };

  const hideQuality = () => {
    setIsHover(false);
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  return (
    <>
      {productInfo[i] === data.quality && (
        <StRowValue>
          <StValueParagraph>{productInfo[i]}</StValueParagraph>
          <StQualityInfo>
            <p onMouseEnter={showQuality} onMouseLeave={hideQuality}>
              i
            </p>
            {isHover && (
              <StQualityInfoBox>
                거의 새것 - 대충 깔끔하다는 뜻
              </StQualityInfoBox>
            )}
          </StQualityInfo>
        </StRowValue>
      )}

      {productInfo[i] !== data.quality && productInfo[i] === data.location && (
        <StRowValue>
          {productInfo[i]}{' '}
          <StMapButton onClick={handleShowMap}>지도에서 보기</StMapButton>
        </StRowValue>
      )}

      {productInfo[i] !== data.quality && productInfo[i] !== data.location && (
        <StRowValue>{productInfo[i]}</StRowValue>
      )}
    </>
  );
};

const StRowValue = styled.div`
  width: 100%;
  font-family: 'Pretendard-Medium';
  font-size: 0.875rem;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StValueParagraph = styled.div`
  width: fit-content;
  padding: 0.3rem;
  background-color: #eeeeee;
`;

const StQualityInfo = styled.div`
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

const StQualityInfoBox = styled.div`
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

const StMapButton = styled.button.attrs({
  type: 'button'
})`
  width: 100px;
  height: 30px;
  background: transparent;
  border: none;
  text-decoration: underline;
  cursor: pointer;
`;

export default ProductDetail;
