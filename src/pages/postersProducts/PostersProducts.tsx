import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchPage } from './PosterProductsFn';
import ProductsCard from '../../components/prducts/ProductsCard';
import {
  ListWrapper,
  StEndPoint,
  StListTitle,
  StProductsListContainer
} from './PosterProductsStyle';
import type { Product } from '../productsDetail/types';

const PostersProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(9);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [cachedData, setCachedData] = useState<Product[]>([]);

  // 스크롤 높이에 따라 데이터를 더 가져오는 함수
  const loadMoreImages = () => {
    fetchPage(page, id, cachedData, setIsEnd, setProducts);
  };

  // 스크롤 제어 - 스크롤양 + 창의 높이가 전체 body의 높이보다 커지면 이미지 추가 호출 실행
  const onScrollHandler = () => {
    // isEnd가 false일 때만 데이터를 요청
    if (
      !isEnd &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.99
    ) {
      setCachedData(products);
      setPage(page + 1);
      loadMoreImages();
    } else {
      return;
    }
  };

  // 스크롤 감지 - 무한 스크롤
  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler); // 스크롤 이벤트

    return () => {
      window.removeEventListener('scroll', onScrollHandler); // 스크롤 이벤트 제거
    };
  });

  // 초기 셋팅
  useEffect(() => {
    fetchPage(page, id, cachedData, setIsEnd, setProducts);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <ListWrapper>
      <StListTitle>
        {products[0]?.post_user_name}
        <span>님의 판매 상품</span>
      </StListTitle>
      <StProductsListContainer>
        <ProductsCard posts={products} />
      </StProductsListContainer>
      {isEnd && (
        <StEndPoint>
          <h1>더이상 상품이 없습니다</h1>
        </StEndPoint>
      )}
    </ListWrapper>
  );
};

export default PostersProducts;
