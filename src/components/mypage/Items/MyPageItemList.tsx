import React, { useEffect } from 'react';
import { StCardContainer } from '../../../styles/mypageStyle/ProductCardStyle';
import SkeletonProductCard from '../../skeleton/SkeletonProductCard';
import { ProductCardProps } from '../../../api/supabase/products';
import { useInView } from 'react-intersection-observer';
import Nothing from '../Nothing';
import ProductsCard from '../../prducts/ProductsCard';
import {
  getCommunityPosts,
  getFavoriteItems,
  getMyItems,
  getPurchasedItems
} from '../../../api/supabase/mypage';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useAppDispatch } from '../../../redux/reduxHooks/reduxBase';
import {
  setFavItem,
  setMyItem,
  setPurchasedItem
} from '../../../redux/modules/countPostsAndItemsSlice';
import useInfiniteQueryHook from '../../../hooks/useInfiniteQuery';

const MyPageItemList: React.FC<ProductCardProps> = ({ activeTab }) => {
  const dispatch = useAppDispatch();

  const {
    data: myItems,
    hasNextPage: hasNextPageMyItems,
    fetchNextPage: fetchNextPageMyItems,
    status: statusMyItems
  } = useInfiniteQueryHook({
    queryKey: ['myItems'],
    queryFn: getMyItems
  });

  const {
    data: purchasedItems,
    hasNextPage: hasNextPagePurchasedItems,
    fetchNextPage: fetchNextPagePurchasedItems,
    status: statusPurchasedItems
  } = useInfiniteQueryHook({
    queryKey: ['purchasedItems'],
    queryFn: getPurchasedItems
  });

  const {
    data: favItems,
    hasNextPage: hasNextPageFavItems,
    fetchNextPage: fetchNextPageFavItems,
    status: statusFavItems
  } = useInfiniteQueryHook({
    queryKey: ['favItems'],
    queryFn: getFavoriteItems
  });

  dispatch(setMyItem(myItems?.pages.length));
  dispatch(setPurchasedItem(purchasedItems?.pages.length));
  dispatch(setFavItem(favItems?.pages.length));

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (!inView || !hasNextPageMyItems) return;
      fetchNextPageMyItems();

      if (!inView || !hasNextPagePurchasedItems) return;
      fetchNextPagePurchasedItems();

      if (!inView || !hasNextPageFavItems) return;
      fetchNextPageFavItems();
    }
  });

  useEffect(() => {
    // 처음 랜더링 시 화면이 맨 위에 위치
    if (window.scrollY !== 0) window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* 판매한 물품 */}
      {activeTab === 0 && (
        <StCardContainer ref={ref}>
          {statusMyItems === 'loading' ? (
            <SkeletonProductCard cards={5} />
          ) : (
            <ProductsCard posts={myItems?.pages} />
          )}
        </StCardContainer>
      )}
      {myItems?.pages.length === 0 && activeTab !== 1 && activeTab !== 2 && (
        <Nothing
          type={'판매하기'}
          content={'판매한 물품이 없습니다.'}
          icon={''}
          to={'/productsposts'}
          show={true}
        />
      )}

      {/* 구매한 물품 */}
      {activeTab === 1 && (
        <StCardContainer ref={ref}>
          {statusPurchasedItems === 'loading' ? (
            <SkeletonProductCard cards={5} />
          ) : (
            <ProductsCard posts={purchasedItems?.pages} />
          )}
        </StCardContainer>
      )}
      {purchasedItems?.pages.length === 0 &&
        activeTab !== 0 &&
        activeTab !== 2 && (
          <Nothing
            type={'중고거래 구경가기'}
            content={'구매하신 물품이 없습니다.'}
            icon={''}
            to={'/products'}
            show={true}
          />
        )}

      {/* 찜한 물품 */}
      {activeTab === 2 && (
        <StCardContainer ref={ref}>
          {statusFavItems === 'loading' ? (
            <SkeletonProductCard cards={5} />
          ) : (
            <ProductsCard posts={favItems?.pages} />
          )}
        </StCardContainer>
      )}
      {favItems?.pages.length === 0 && activeTab !== 1 && activeTab !== 0 && (
        <Nothing
          type={'중고거래 구경가기'}
          content={'찜한 물품이 없습니다.'}
          icon={''}
          to={'/products'}
          show={true}
        />
      )}
    </>
  );
};

export default MyPageItemList;
