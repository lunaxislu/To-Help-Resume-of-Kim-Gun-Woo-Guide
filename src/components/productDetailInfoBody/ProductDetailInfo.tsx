import React, { useState } from 'react';
import styled from 'styled-components';
import { Product } from '../../pages/productsDetail/types';
import ProductDetail from './ProductDetailBody';
import Maps from '../mapTest/Maps';
import {
  StMapModal,
  StModalBackDrop,
  StProductRow,
  StRowLabel
} from './infoStyle';

type ProductInfo = {
  labels: string[];
  productInfo: any[];
  data: Product;
};

const ProductDetailInfo = ({ labels, productInfo, data }: ProductInfo) => {
  const [showMap, setShowMap] = useState<boolean>(false);
  // 게시물에서 주소 받아오고
  const [searchAddress, setSearchAddress] = useState<string>(data.address);

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
              <Maps searchAddress={searchAddress} setShowMap={setShowMap} />
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

export default ProductDetailInfo;
