import React, { useEffect, useState } from 'react';
import { Tab, TabsContainer } from '../../styles/mypageStyle/TabsStyle';
import ProductCard, { Product } from './ProductCard';
import CommunityPost, { Community } from './CommunityPost';
import { supabase } from '../../api/supabase/supabaseClient';

import { useQuery } from 'react-query';

const Tabs = () => {
  const [userId, setUserId] = useState<string>();
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [purchasedList, setPurchasedList] = useState<Product[]>([]);
  const [communityPostList, setCommunityPostList] = useState<Community[]>([]);
  const [toggle, setToggle] = useState(1);

  const clickToggleTab = (index: number) => {
    setToggle(index);
  };

  // 현재 로그인한 사용자의 정보 가져오기
  const getCurrentUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    setUserId(user?.id);
  };

  const getCurrentUserProducts = async () => {
    let { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('uid', userId);

    if (products && products.length > 0) {
      setProductsList(products);
    }
  };

  const getPurchasedProducts = async () => {
    let { data: purchasedProducts, error } = await supabase
      .from('products')
      .select('*')
      .eq('buyer_uid', userId);

    if (purchasedProducts && purchasedProducts.length > 0) {
      setPurchasedList(purchasedProducts);
    }
  };

  const getCurrentUserCommunityPosts = async () => {
    let { data: communityPosts, error } = await supabase
      .from('community')
      .select('*')
      .eq('author_uid', userId);

    if (communityPosts && communityPosts.length > 0) {
      setCommunityPostList(communityPosts);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userId) {
      getCurrentUserProducts();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getPurchasedProducts();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getCurrentUserCommunityPosts();
    }
  }, [userId]);

  return (
    <>
      <TabsContainer>
        <Tab onClick={() => clickToggleTab(1)}>내 상품</Tab>
        <Tab onClick={() => clickToggleTab(2)}>구매 상품</Tab>
        <Tab onClick={() => clickToggleTab(3)}>커뮤니티</Tab>
      </TabsContainer>

      {toggle === 1 ? <ProductCard list={productsList} /> : null}
      {toggle === 2 ? <ProductCard list={purchasedList} /> : null}
      {toggle === 3 ? <CommunityPost list={communityPostList} /> : null}
    </>
  );
};

export default Tabs;
