import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import { GlobalStyles } from '../styles/GlobalStyle';
import Login from '../pages/login/Login';
import MyPage from '../pages/mypage/MyPage';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
