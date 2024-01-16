import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router';
import SearchResults from '../pages/searchResults/SearchResults';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
