import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatRoom from '../pages/chat/ChatRoom';
import CommunityMain from '../pages/community/CommunityMain';
import WritePost from '../pages/community/WritePost';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import MyPage from '../pages/mypage/MyPage';
import { GlobalStyles } from '../styles/GlobalStyle';
import Products from '../pages/products/Products';
import ProductsPosts from '../pages/products/ProductsPosts';
import Layout from '../layout/Layout';
import SearchResults from '../pages/searchResults/SearchResults';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productsposts" element={<ProductsPosts />} />
          <Route path="/community" element={<CommunityMain />} />
          <Route path="/community_write" element={<WritePost />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
