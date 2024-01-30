import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import MyPage from '../pages/mypage/MyPage';
import ProductsPosts from '../pages/products/ProductsPosts';
import ChatRoom from '../pages/chat/ChatRoom';
import WritePost from '../pages/community/WritePost';

const Private = () => {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/productsposts" element={<ProductsPosts />} />
      <Route path="/community_write" element={<WritePost />} />
      <Route path="/chat" element={<ChatRoom />} />
    </Routes>
  );
};

export default Private;
