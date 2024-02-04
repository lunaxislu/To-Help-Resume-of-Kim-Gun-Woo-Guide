import React, { MouseEvent } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import ProductsCard from '../prducts/ProductsCard';
import { Product } from '../../pages/productsDetail/types';
import { useNavigate } from 'react-router';

type RecommendProps = {
  product: Product[];
  similar: Product[];
  otherPosts: Product[];
};

const Recommend = ({ product, similar, otherPosts }: RecommendProps) => {
  const navi = useNavigate();
  // 상품추천란 네비게이션 함수
  const navigateTo = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    if (id && id === product![0].post_user_uid) navi(`/postersProducts/${id}`);
    else navi('/products');
  };

  return (
    <>
      <div>
        <StSimilarProductTitleWrapper>
          비슷한 상품
          <StToSectionButton onClick={navigateTo}>
            전체보기 <FaArrowRight />
          </StToSectionButton>
        </StSimilarProductTitleWrapper>
        <ProductsCard
          posts={similar
            .filter((product) => product.isSell !== true)
            .slice(0, 5)}
        />
      </div>
      <div>
        <StOtherPostsTitleWrapper>
          이 판매자의 다른 상품
          <StToSectionButton id={product[0].post_user_uid} onClick={navigateTo}>
            전체보기 <FaArrowRight />
          </StToSectionButton>
        </StOtherPostsTitleWrapper>
        <ProductsCard
          posts={otherPosts
            .filter((product) => product.isSell !== true)
            .slice(0, 5)}
        />
      </div>
    </>
  );
};

export default Recommend;

const StSimilarProductTitleWrapper = styled.h2`
  width: 100%;
  font-size: 2rem;
  margin-block: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StOtherPostsTitleWrapper = styled.h2`
  width: 100%;
  font-size: 2rem;
  margin-block: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StToSectionButton = styled.button`
  background: var(--opc-100);
  color: white;
  border-radius: 50px;
  padding: 0.8rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #414141;
    color: var(--opc-100);
  }
`;
