import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import { Product } from '../../pages/productsDetail/types';
import DetailViewerCarousel from './DetailCarousel';
import { IoIosClose } from 'react-icons/io';

const StViewer = styled.div`
  width: 65%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  background-color: #1f1f1f;
  padding: 1.5rem;
  border-radius: 12px;
  @media screen and (max-width: 768px) {
    width: 100%;
    top: 40%;
  }
`;

const StCloseViewerBtn = styled.button`
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  top: 0;
  right: 5%;
  padding: 1rem;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 6rem;
  color: var(--opc-100);
  cursor: pointer;
  z-index: 7;

  @media screen and (max-width: 768px) {
    top: 0;
    right: 12%;
  }
`;

type ViewerProps = {
  product: Product[];
  setShowViewer: React.Dispatch<SetStateAction<boolean>>;
};

const ImageViewer = ({ product, setShowViewer }: ViewerProps) => {
  return (
    <StViewer>
      <StCloseViewerBtn>
        <IoIosClose onClick={() => setShowViewer(false)} />
      </StCloseViewerBtn>
      <DetailViewerCarousel
        carouselImages={
          product[0]?.image_url === null ? [] : product[0]?.image_url
        }
      />
    </StViewer>
  );
};

export default ImageViewer;
