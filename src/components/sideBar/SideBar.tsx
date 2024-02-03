import React, { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import styled, { keyframes } from 'styled-components';

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
  transition: all 0.2s ease;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    width: 100px;
    border-radius: 5px;
  }
`;

const SideBar = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const navi = useNavigate();

  const arr = [
    '판매하기',
    '중고거래',
    '커뮤니티',
    '검색',
    '채팅',
    '알림',
    '프로필'
  ];

  const setMenuToggle = () => {
    setIsShow((prev) => !prev);
  };

  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    const { innerText } = e.currentTarget;
    innerText === '판매하기' && navi('/productsposts');
    innerText === '중고거래' && navi('/products');
    innerText === '커뮤니티' && navi('/community');
    innerText === '채팅' && navi('/chat');
    innerText === '프로필' && navi('/mypage');
  };

  return (
    <StSideBtnContainer>
      <StMainButton onClick={setMenuToggle}>Menu</StMainButton>
      {arr.map((menu, i) => {
        return (
          isShow && (
            <StMenuButtons
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate(e);
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
