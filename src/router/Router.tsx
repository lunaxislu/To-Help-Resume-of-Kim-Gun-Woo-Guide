import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatRoom from '../pages/chat/ChatRoom';
import CommunityMain from '../pages/community/CommunityMain';
import WritePost from '../pages/community/WritePost';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import { GlobalStyles } from '../styles/GlobalStyle';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<CommunityMain />} />
        <Route path="/community_write" element={<WritePost />} />
        <Route path="login" element={<Login />} />
        <Route path="/chat" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
