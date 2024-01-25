import React from 'react';
import styled from 'styled-components';

const ScrollTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <TopButton onClick={scrollToTop}>
      <img
        src={process.env.PUBLIC_URL + '/assets/upbutton.png'}
        alt="상단으로 이동"
      />
    </TopButton>
  );
};

const TopButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 10px;
  padding: 10px;
  border: none;
  cursor: pointer;
  transition: opacity 0.5s;
  background-color: transparent;
  @media screen and (max-width: 768px) {
    padding: 0;
    right: 0.3rem;
  }

  img {
    width: 60px;
    height: 60px;
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
