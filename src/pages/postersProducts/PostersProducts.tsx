import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabase/supabaseClient';
import { useParams } from 'react-router';
import { Product } from '../productsDetail/types';
import ProductsCard from '../../components/prducts/ProductsCard';
import styled from 'styled-components';
import { StFadeAni } from '../chat/style';

const PostersProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(9);

  const fetchPage = async (page: number) => {
    let { data: productsRes, error } = await supabase
      .from('products')
      .select('*')
      .range(0, page)
      .eq('post_user_uid', id);

    if (error) console.log('Products fetch failed');

    if (productsRes) {
      setProducts(productsRes);
    }
  };

  // 스크롤 높이에 따라 데이터를 더 가져오는 함수
  const loadMoreImages = () => {
    fetchPage(page);
  };

  // 스크롤 제어 - 스크롤양 + 창의 높이가 전체 body의 높이보다 커지면 이미지 추가 호출 실행
  const onScrollHandler = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight * 0.99
    ) {
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
    fetchPage(page);
  }, []);

  return (
    <div style={{ maxWidth: '116rem', margin: 'auto', position: 'relative' }}>
      <StListTitle>
        {products[0]?.post_user_name}
        <span>님의 판매 상품</span>
      </StListTitle>
      <StProductsListContainer>
        <ProductsCard posts={products} />
      </StProductsListContainer>
    </div>
  );
};

export default PostersProducts;

const StProductsListContainer = styled.div`
  max-width: 116rem;
  display: flex;
  margin: auto;
  animation: ${StFadeAni} 0.3s ease;
  @media screen and (max-width: 768px) {
    max-width: 76.8rem;
    min-width: 30rem;
    padding: 0;
  }
`;

const StListTitle = styled.h2`
  width: 100%;
  margin-block: 2rem;
  font-size: 3rem;

  span {
    margin-left: 0.6rem;
    font-size: 2rem;
  }
`;

const StEndPoint = styled.div`
  color: black;
  font-size: 3rem;
  position: absolute;
  bottom: -10rem;
  left: 50%;
  transform: translateX(-50%);
`;
