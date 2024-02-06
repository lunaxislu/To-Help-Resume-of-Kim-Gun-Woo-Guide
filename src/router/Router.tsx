import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import ChatRoom from '../pages/chat/ChatRoom';
// import CommuDetail from '../pages/community/CommuDetail';
// import CommunityMain from '../pages/community/CommunityMain';
// import WritePost from '../pages/community/WritePost';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
// import MyPage from '../pages/mypage/MyPage';
// import ProductsList from '../pages/products/ProductsList';
// import ProductsPosts from '../pages/products/ProductsPosts';
// import ProductDetail from '../pages/productsDetail/ProductDetail';
import SearchResults from '../pages/searchResults/SearchResults';
import { GlobalStyles } from '../styles/GlobalStyle';
// import PrivateLayout from '../layouts/PrivateLayout/PrivateLayout';
import Layout from '../layouts/Layout';
// import ProductsPostsEdit from '../pages/products/ProductsPostsEdit';
// import PostersProducts from '../pages/postersProducts/PostersProducts';
import React, { Suspense, lazy } from 'react';

const ProductDetail = React.lazy(
  () => import('../pages/productsDetail/ProductDetail')
);
const ProductsList = React.lazy(() => import('../pages/products/ProductsList'));
const WritePost = React.lazy(() => import('../pages/community/WritePost'));
const ProductsPosts = React.lazy(
  () => import('../pages/products/ProductsPosts')
);
const ProductsPostsEdit = React.lazy(
  () => import('../pages/products/ProductsPostsEdit')
);
const CommunityMain = React.lazy(
  () => import('../pages/community/CommunityMain')
);
const CommuDetail = React.lazy(() => import('../pages/community/CommuDetail'));
const ChatRoom = React.lazy(() => import('../pages/chat/ChatRoom'));
const PostersProducts = React.lazy(
  () => import('../pages/postersProducts/PostersProducts')
);
const MyPage = React.lazy(() => import('../pages/mypage/MyPage'));
const PrivateLayout = React.lazy(
  () => import('../layouts/PrivateLayout/PrivateLayout')
);

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Suspense fallback={<div>로딩 즁 </div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<CommunityMain />} />
            <Route path="/community/detail/:id" element={<CommuDetail />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/postersProducts/:id" element={<PostersProducts />} />
            <Route path="/products/detail/:id" element={<ProductDetail />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="*" element={<Navigate to={'/'} replace />} />

            <Route element={<PrivateLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/chat" element={<ChatRoom />} />
              <Route path="/productsposts" element={<ProductsPosts />} />
              <Route
                path="/productsposts/edit/:id"
                element={<ProductsPostsEdit />}
              />
              <Route path="/community_write" element={<WritePost />} />
              <Route path="*" element={<Navigate to={'/'} replace />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
