import React, { useState } from 'react';
import styled from 'styled-components';
import { Product } from '../../pages/productsDetail/types';
import ProductDetail from './ProductDetailBody';
import Maps from '../mapTest/Maps';

type ProductInfo = {
  labels: string[];
  productInfo: any[];
  data: Product;
};

const ProductDetailInfo = ({ labels, productInfo, data }: ProductInfo) => {
  const [showMap, setShowMap] = useState<boolean>(false);
  // 게시물에서 주소 받아오고
  const [searchAddress, setSearchAddress] = useState<string>(
    '가좌로 16-14, 어쩌구 짱 엄청나게 긴 주소다아아아아아ㅏ아아아아'
  );

  return (
    <>
      {showMap && (
        <>
          <StModalBackDrop
            onClick={() => {
              setShowMap(false);
            }}
          >
            <StMapModal onClick={(e) => e.stopPropagation()}>
              {/* 주소를 지도로 넘겨주면 안에서 좌표 찾아서 제공 */}
              <Maps searchAddress={searchAddress} />
            </StMapModal>
          </StModalBackDrop>
        </>
      )}
      {labels.map((label: string, i: number) => {
        return (
          <StProductRow key={i}>
            <StRowLabel>* {label}</StRowLabel>
            <ProductDetail
              productInfo={productInfo}
              data={data}
              i={i}
              setShowMap={setShowMap}
            />
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

const StModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #1d1d1d50;
  z-index: 100;
`;

const StMapModal = styled.div`
  position: absolute;
  width: 100%;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ProductDetailInfo;
