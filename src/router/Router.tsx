import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from 'react-router-dom';
import Layout from '../layout/Layout';
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
import { useAppSelector } from '../redux/reduxHooks/reduxBase';
import PreviewTest from '../components/imagePreviewer/PreviewTest';

const Router = () => {
  const { isLogin } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/login/:mode"
            element={isLogin ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/" element={<Home />} />
          <Route
            path="/mypage"
            element={isLogin ? <MyPage /> : <Navigate to="/login/login" />}
          />
          <Route path="/products" element={<ProductsList />} />
          <Route
            path="/products/detail/:id"
            element={
              isLogin ? <ProductDetail /> : <Navigate to="/login/login" />
            }
          />
          <Route
            path="/productsposts"
            element={
              isLogin ? <ProductsPosts /> : <Navigate to="/login/login" />
            }
          />
          <Route path="/community" element={<CommunityMain />} />
          <Route
            path="/community_write"
            element={isLogin ? <WritePost /> : <Navigate to="/login/login" />}
          />
          <Route path="/search-results" element={<SearchResults />} />
          <Route
            path="/chat"
            element={isLogin ? <ChatRoom /> : <Navigate to="/login/login" />}
          />
          <Route
            path="/community/detail/:id"
            element={isLogin ? <CommuDetail /> : <Navigate to="/login/login" />}
          />
          <Route path="/chat/imageViewer" element={<PreviewTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
