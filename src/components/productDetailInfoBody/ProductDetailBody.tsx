import React, { useEffect, useState } from 'react';
import { Product } from '../../pages/productsDetail/types';
import styled from 'styled-components';
import { StFadeAni } from '../../pages/chat/style';
import { GoInfo } from 'react-icons/go';

type BodyInfo = {
  productInfo: any[];
  data: Product;
  i: number;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductDetail = ({ productInfo, data, i, setShowMap }: BodyInfo) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const showQuality = () => {
    setIsHover(true);
  };

  const hideQuality = () => {
    setIsHover(false);
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  const checkDevice = (agent: string) => {
    const mobileRegex = [
      /Android/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return mobileRegex.some((mobile) => agent.match(mobile));
  };

  useEffect(() => {
    if (checkDevice(window.navigator.userAgent)) setIsMobile(true);
    if (checkDevice(window.navigator.userAgent)) setIsMobile(false);
  }, []);

  return (
    <>
      {productInfo[i] === data.quality && (
        <StRowValue>
          <StValueParagraph>{productInfo[i]}</StValueParagraph>
          <StQualityInfo>
            <div style={{ width: '100%', height: '100%' }}>
              <p onMouseEnter={showQuality} onMouseLeave={hideQuality}>
                {<GoInfo />}
              </p>
            </div>

            {isHover && (
              <StQualityInfoBox>
                <p>
                  <span>새 상품</span> &nbsp;사용하지 않은 새 상품이에요
                </p>
                <p>
                  <span>사용감 없음</span> &nbsp;사용은 했지만 눈에 띄는
                  흔적이나 얼룩이 없어요 / 아주 조금 사용했어요
                </p>

                <p>
                  <span>사용감 적음</span> &nbsp;눈에 띄는 흔적이나 얼룩이 약간
                  있어요 / 절반정도 사용했어요
                </p>
                <p>
                  <span>사용감 많음</span> &nbsp;눈에 띄는 흔적이나 얼룩이 많이
                  있어요 / 많이 사용했어요
                </p>
                <p>
                  <span>고장 / 파손 상품</span> &nbsp;기능 이상이나 외관 손상
                  등으로 수리가 필요해요{' '}
                </p>
              </StQualityInfoBox>
            )}
          </StQualityInfo>
        </StRowValue>
      )}
      {productInfo[i] !== data.quality &&
        productInfo[i] === data.address &&
        data.address !== '' && (
          <StRowValue>
            {productInfo[i]}
            <StMapButton onClick={handleShowMap}>
              {isMobile ? '지도 보기' : '지도로 확인하기'}
            </StMapButton>
          </StRowValue>
        )}

      {productInfo[i] !== data.quality && productInfo[i] !== data.address && (
        <StRowValue>{productInfo[i]}</StRowValue>
      )}
      {productInfo[i] !== data.shipping_cost &&
        productInfo[i] !== data.address && <></>}

      {productInfo[i] === data.changable && data.changable === '불가능' && (
        <></>
      )}
      {productInfo[i] === data.changable && data.changable === '가능' && (
        <>
          <StRowValue>{productInfo[i]}</StRowValue>
        </>
      )}
    </>
  );
};

const StRowValue = styled.div`
  width: 100%;
  font-size: 1.4rem;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StValueParagraph = styled.div`
  width: fit-content;
  font-size: 1.2rem;
  padding: 0.6rem;
  border-radius: 0.3rem;
  padding-top: 0.9rem;
  color: var(--11-gray);
  background-color: var(--4-gray);
`;

const StQualityInfo = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  background-color: transparent;
  color: var(--opc-60);
  line-height: 1.2;
  font-size: 2rem;
  cursor: pointer;
  position: relative;
`;

const StQualityInfoBox = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: -500px;
  bottom: -100px;
  color: white;
  border-radius: 12px;
  display: -webkit-flex; /* iOS Safari에서 Flexbox 지정 */
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem;
  animation: ${StFadeAni} 0.2s forwards;
  text-align: left;
  font-size: 1.4rem;

  p {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  span {
    color: var(--opc-100);
    font-weight: 500;
    margin-left: 0.4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    left: -300px;

    p {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    span {
      margin-bottom: 0.3rem;
      margin-left: 0.3rem;
    }
  }
`;

const StMapButton = styled.button.attrs({
  type: 'button'
})`
  width: 100px;
  height: 30px;
  background: transparent;
  border: none;
  color: var(--8-gray);
  text-decoration: underline;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default ProductDetail;
