import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommunityMain from '../pages/community/CommunityMain';
import WritePost from '../pages/community/WritePost';
import Home from '../pages/home/Home';
import { GlobalStyles } from '../styles/GlobalStyle';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<CommunityMain />} />
        <Route path="/community_write" element={<WritePost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
