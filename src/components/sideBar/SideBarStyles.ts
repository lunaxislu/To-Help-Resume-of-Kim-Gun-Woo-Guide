import { SearchBar } from './../../styles/community/CommunityMainStyle';
import styled, { css, keyframes } from 'styled-components';

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
  bottom: 10%;
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
  font-size: var(--fontSize-H3);
  line-height: 2.5;
  font-weight: 600;
  position: absolute;
  margin-top: 3.6rem;
  bottom: ${(props) => props.$index * 90}%;
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

type SearchBarProps = {
  $status: string | null;
};

const StSearchBarContainer = styled.div<SearchBarProps>`
  position: absolute;
  ${(props) => {
    if (props.$status === null) {
      return css`
        bottom: 135%;
      `;
    } else {
      return css`
        top: -720%;
      `;
    }
  }}
  right: 10rem;
`;

export {
  StMainButton,
  StMenuButtons,
  StSideBtnContainer,
  StSearchBarContainer
};
