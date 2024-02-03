import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ChatRoom from '../pages/chat/ChatRoom';
import CommuDetail from '../pages/community/CommuDetail';
import CommunityMain from '../pages/community/CommunityMain';
import WritePost from '../pages/community/WritePost';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import MyPage from '../pages/mypage/MyPage';
import ProductsList from '../pages/products/ProductsList';
import ProductsPosts from '../pages/products/ProductsPosts';
import ProductDetail from '../pages/productsDetail/ProductDetail';
import SearchResults from '../pages/searchResults/SearchResults';
import { GlobalStyles } from '../styles/GlobalStyle';
import PrivateLayout from '../layouts/PrivateLayout/PrivateLayout';
import Layout from '../layouts/Layout';
import SideBar from '../components/sideBar/SideBar';
import ProductsPostsEdit from '../pages/products/ProductsPostsEdit';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<CommunityMain />} />
          <Route path="/community/detail/:id" element={<CommuDetail />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/detail/:id" element={<ProductDetail />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/test" element={<SideBar />} />
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
    </BrowserRouter>
  );
};

export default Router;
