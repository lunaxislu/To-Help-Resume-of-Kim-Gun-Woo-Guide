import React, { useState } from 'react';
import styled from 'styled-components';

const ScrollTopButton = () => {
  const [smallscreen, setSmallScreen] = useState(window.innerWidth <= 768);
  const handleResize = () => {
    setSmallScreen(window.innerWidth <= 768);
  };
  // 화면 크기가 변할 때마다 handleResize 함수 호출
  window.addEventListener('resize', handleResize);
  // 컴포넌트가 언마운트되면 이벤트 리스너 제거
  React.useEffect(() => {
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <TopButton onClick={scrollToTop}>
      {smallscreen ? (
        <img
          src={process.env.PUBLIC_URL + '/assets/clickToUpButton.svg'}
          alt="상단으로 이동"
        />
      ) : (
        <img
          src={process.env.PUBLIC_URL + '/assets/topbutton.svg'}
          alt="상단으로 이동"
        />
      )}
    </TopButton>
  );
};

const TopButton = styled.button`
  position: fixed;
  bottom: 130px;
  right: -0.5%;
  padding: 10px;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.5s;
  background-color: transparent;
  @media screen and (max-width: 768px) {
    padding: 0;
    right: 6%;
  }

  img {
    width: 50px;
    height: 50px;
    @media screen and (max-width: 768px) {
      max-width: 30px;
      max-height: 30px;
      width: 100%;
      height: 33%;
    }
  }

  &:hover {
    opacity: 0.8;
    @media screen and (max-width: 320px) {
      opacity: 0.5;
    }
  }
`;

export default ScrollTopButton;
