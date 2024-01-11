import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import { GlobalStyles } from '../styles/GlobalStyle';
import Login from '../pages/login/Login';
import Layout from '../layout/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
