import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import { GlobalStyles } from '../styles/GlobalStyle';
import Products from '../pages/products/Products';
import ProductsPosts from '../pages/products/ProductsPosts';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productsposts" element={<ProductsPosts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
