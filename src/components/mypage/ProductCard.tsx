import React, { useEffect, useRef, useState } from 'react';
import {
  StCardContainer,
  StCardWrapper,
  StProductImage,
  StProductPrice,
  StProductQuality
} from '../../styles/mypageStyle/ProductCardStyle';
import { debounce } from 'lodash';
import { supabase } from '../../api/supabase/supabaseClient';
import SkeletonProductCard from '../card/SkeletonProductCard';
import { Product, ProductCardProps } from '../../api/supabase/products';
import { PostgrestResponse } from '@supabase/supabase-js';
import { userId } from '../../util/getUserId';

const ProductCard: React.FC<ProductCardProps> = ({ activeTab }) => {
  const CARDS_COUNT = 10;
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
  const [loadedPurchasedProducts, setLoadedPurchasedProducts] = useState<
    Product[]
  >([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(1);
  const [isInView, setIsInView] = useState(false);

  const getCurrentUserProducts = async () => {
    let { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('post_user_uid', userId)
      .limit(10);

    if (products && products.length > 0) {
      setLoadedProducts(products);
    }
  };

  const getPurchasedProducts = async () => {
    let { data: purchasedProducts, error } = await supabase
      .from('products')
      .select('*')
      .eq('buyer_uid', userId)
      .limit(10);

    if (purchasedProducts && purchasedProducts.length > 0) {
      setLoadedPurchasedProducts(purchasedProducts);
    }
  };

  const getFavoriteProducts = async () => {
    let { data: favProducts, error } = await supabase
      .from('products')
      .select('*');

    if (favProducts && favProducts.length > 0) {
      const filteredFavProducts = favProducts
        .filter((product) =>
          product.like_user?.some(
            (like: { user_uid: string }) => like.user_uid === userId
          )
        )
        .map((product) => product);
      setFavoriteProducts(filteredFavProducts);
    }
  };

  useEffect(() => {
    getFavoriteProducts();
  }, []);

  const onScrollHandler = () => {
    // js script가 동작하고 카드를 감싸는 전체 컨테이너가 바닥에 닿을 때
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current;
      const { scrollTop, clientHeight, scrollHeight } = container;
      const isAtBottom = scrollTop + clientHeight <= scrollHeight;
      setIsInView(isAtBottom);
    }
  };

  useEffect(() => {
    const debouncedScroll = debounce(() => onScrollHandler(), 200);
    window.addEventListener('scroll', debouncedScroll);
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, []);

  const fetchProducts = async (offset: number, limit: number) => {
    const from = offset * CARDS_COUNT;
    const to = from + CARDS_COUNT - 1;

    const { data } = await supabase!
      .from('products')
      .select('*')
      .range(from, to)
      .eq('post_user_uid', userId);

    return data;
  };

  const loadMoreProducts = async (offset: number) => {
    setIsLoading(true);
    setOffset((prev) => prev + 1);
    try {
      const newProducts = await fetchProducts(offset, CARDS_COUNT);

      if (newProducts) {
        setLoadedProducts((prevProducts) => [...prevProducts, ...newProducts]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isInView) {
      loadMoreProducts(offset);
    }
  }, [isInView]);

  useEffect(() => {
    getCurrentUserProducts();
  }, []);

  useEffect(() => {
    getPurchasedProducts();
  }, []);

  useEffect(() => {
    //getFavoriteProducts();
  }, []);

  return (
    <StCardContainer ref={containerRef}>
      {activeTab === 1 &&
        loadedProducts.map((product) => {
          return (
            <StCardWrapper
              key={product.id}
              to={`/products/detail/${product.id}`}
            >
              <StProductImage
                src={
                  product.image_url !== null && product.image_url !== undefined
                    ? product.image_url[0]
                    : ''
                }
                alt=""
              />
              <StProductQuality>{product.quality}</StProductQuality>
              <p>{product.user}</p>
              <p>{product.title}</p>

              <StProductPrice>
                {product.price.toLocaleString('ko-KR')}원
              </StProductPrice>
            </StCardWrapper>
          );
        })}

      {isLoading && <SkeletonProductCard cards={3} />}

      {activeTab === 2 &&
        loadedPurchasedProducts.map((product) => {
          return (
            <>
              <StCardWrapper
                key={product.id}
                to={`/products/detail/${product.id}`}
              >
                <StProductImage
                  src={
                    product.image_url !== null &&
                    product.image_url !== undefined
                      ? product.image_url[0]
                      : ''
                  }
                  alt=""
                />
                <StProductQuality>{product.quality}</StProductQuality>
                <p>{product.user}</p>
                <p>{product.title}</p>
                <StProductPrice>
                  {product.price.toLocaleString('ko-KR')}원
                </StProductPrice>
              </StCardWrapper>
            </>
          );
        })}

      {isLoading && <SkeletonProductCard cards={10} />}

      {activeTab === 4 &&
        favoriteProducts.map((product) => {
          return (
            <>
              <StCardWrapper
                key={product.id}
                to={`/products/detail/${product.id}`}
              >
                <StProductImage
                  src={
                    product.image_url !== null &&
                    product.image_url !== undefined
                      ? product.image_url[0]
                      : ''
                  }
                  alt=""
                />
                <StProductQuality>{product.quality}</StProductQuality>
                <p>{product.user}</p>
                <p>{product.title}</p>
                <StProductPrice>
                  {product.price.toLocaleString('ko-KR')}원
                </StProductPrice>
              </StCardWrapper>
            </>
          );
        })}

      {isLoading && <SkeletonProductCard cards={10} />}
    </StCardContainer>
  );
};

export default ProductCard;
