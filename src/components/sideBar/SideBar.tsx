import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled, { keyframes } from 'styled-components';
import SearchBar from '../layout/header/SearchBar';

const StSideBtnContainer = styled.div`
  width: fit-content;
  padding: 1rem;
  background-color: transparent;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'BM-JUA';
  position: fixed;
  top: 30%;
  right: 3%;
  transform: translate(0%, -50%);
  z-index: 100;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StMainButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  outline: none;
  background-color: #18b3bc;
  color: white;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  transition: opacity 0.1s ease;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const SlideDown = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -200%);
  }

  to {
    opacity: 1;
    transform: translate(-50%,-50%);
  }
`;

const SlideUp = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;

  }
`;

type ButtonProps = {
  $index: number;
  $isShow: boolean;
};

const StMenuButtons = styled.button<ButtonProps>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0.1rem solid #18b3bc;
  outline: none;
  background-color: white;
  color: #18b3bc;
  font-weight: 600;
  position: absolute;
  margin-top: 3.6rem;
  top: ${(props) => props.$index * 90}%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  animation-name: ${(props) => (props.$isShow ? SlideDown : SlideUp)};
  animation-duration: 0.15s;
  animation-fill-mode: backwards;
  animation-delay: ${(props) => 0.06 * props.$index}s;
  cursor: pointer;
  transition: opacity 0.1s ease;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const StSearchBarContainer = styled.div`
  position: absolute;
  top: 385%;
  right: 8rem;
`;

const SideBar = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const setMenuToggle = () => {
    setIsShow((prev) => !prev);
  };
  const toggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev);
  };
  const arr = [
    '판매하기',
    '중고거래',
    '커뮤니티',
    '검색',
    '채팅',
    '알림',
    '프로필'
  ];

  const navigateToPage = (menu: string) => {
    switch (menu) {
      case '판매하기':
        navigate('/productsposts');

        break;
      case '중고거래':
        navigate('/products');
        break;
      case '커뮤니티':
        navigate('/community');
        break;
      case '검색':
        toggleSearchBar();
        break;
      case '채팅':
        navigate('/chat');
        break;
      case '알림':
        break;
      case '프로필':
        navigate('/mypage');
        break;
      default:
        break;
    }
  };

  return (
    <StSideBtnContainer>
      <StMainButton
        onClick={() => {
          setMenuToggle();
          if (isShow && isSearchBarVisible) {
            toggleSearchBar();
          }
        }}
      >
        Menu
      </StMainButton>
      {isShow && isSearchBarVisible && (
        <StSearchBarContainer>
          <SearchBar
            showSearchComp={isSearchBarVisible}
            setShowSearchComp={setIsSearchBarVisible}
          />
        </StSearchBarContainer>
      )}
      {arr.map((menu, i) => {
        return (
          isShow && (
            <StMenuButtons
              onClick={(e) => {
                e.stopPropagation();
                navigateToPage(menu);
              }}
              $isShow
              $index={i + 1}
              key={i}
            >
              {menu}
            </StMenuButtons>
          )
        );
      })}
    </StSideBtnContainer>
  );
};

export default SideBar;
