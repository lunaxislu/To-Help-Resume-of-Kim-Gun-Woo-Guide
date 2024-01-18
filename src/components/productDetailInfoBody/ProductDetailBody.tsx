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
                <p>
                  <span>새 상품</span>: &nbsp;사용하지 않은 새 상품이에요
                </p>
                <p>
                  <span>사용감 없음</span>: &nbsp;사용은 했지만 눈에 띄는
                  흔적이나 얼룩이 없어요 / 아주 조금 사용했어요
                </p>

                <p>
                  <span>사용감 적음</span>: &nbsp;눈에 띄는 흔적이나 얼룩이 약간
                  있어요 / 절반정도 사용했어요
                </p>
                <p>
                  <span>사용감 많음</span>: &nbsp;눈에 띄는 흔적이나 얼룩이 많이
                  있어요 / 많이 사용했어요
                </p>
                <p>
                  <span>고장/파손 상품</span>: &nbsp;기능 이상이나 외관 손상
                  등으로 수리가 필요해요{' '}
                </p>
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
  width: fit-content;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: -520px;
  bottom: -50px;
  padding: 1.25rem 1rem;
  color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${StFadeAni} 0.2s forwards;
  text-align: left;

  span {
    font-weight: 500;
    font-size: 1.05rem;
  }
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
