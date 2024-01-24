import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router';
import ScrollTopButton from './ScrollTopButton';
import styled from 'styled-components';

const Layout = () => {
  const location = useLocation();
  const [showTopbutton, setShowTopButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage =
        (scrollY / (documentHeight - windowHeight)) * 100;

      if (
        (['/', '/community_write', '/productsposts'].includes(
          location.pathname
        ) &&
          scrollPercentage >= 50) ||
        (['/mypage', '/products', '/community', '/search-results'].includes(
          location.pathname
        ) &&
          scrollY >= 300)
      ) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <Wrapper>
      <Header />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      {showTopbutton && <ScrollTopButton />}
      <Footer />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;
