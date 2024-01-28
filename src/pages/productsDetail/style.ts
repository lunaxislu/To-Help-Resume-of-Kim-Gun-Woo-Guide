import { FaHeart } from 'react-icons/fa';
import { AiFillAlert } from 'react-icons/ai';
import styled, { css, keyframes } from 'styled-components';
import { CustomUser } from './types';

export const StFadeAni = keyframes`
  from{
    opacity: 0;
    transform: translateX(-5%);
  }

  to {
    opacity: 1;
    transform: translateX(0%);
  }
`;

const StDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1440px;
  max-height: 2828px;
  padding: 4.9rem 0;
  margin: auto;
  font-family: 'Pretendard-Regular';
  animation: ${StFadeAni} 0.3s ease;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 768px;
    padding: 0;
  }
`;

const StDetailInfoSection = styled.section`
  width: 100%;
  max-width: 1440px;
  height: fit-content;
  display: flex;
  gap: 4.6rem;
  align-items: start;
  justify-content: center;
  border-bottom: 0.1rem solid var(--3-gray);
  margin-bottom: 3rem;

  @media screen and (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 768px;
    margin-bottom: 0.5rem;
  }
`;

const StImageWrapper = styled.div`
  width: 100%;
  max-width: 510px;
  height: 43.5rem;
  max-height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background-color: aliceblue;
  position: relative;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 768px;
    height: 100%;
    max-height: 43.5rem;
    margin-bottom: 1.5rem;
    border-radius: 0;
  }
`;

const StProductInfo = styled.div`
  width: 100%;
  max-width: 640px;
`;

const StProductInfoHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
  }
`;
const StUserTitlebox = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StUserImage = styled.div`
  width: fit-content;
`;

type ImageProps = {
  $url: string | undefined;
};

const StProfileImages = styled.div<ImageProps>`
  width: 22px;
  height: 22px;
  background: ${(props) => (props.$url ? css`url(${props.$url})` : '#d9d9d9')};
  background-size: cover;
  border-radius: 50%;
  background-repeat: no-repeat;

  @media screen and (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const StUserNickname = styled.h4`
  color: var(--7, #878787);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 191.2%; /* 26.768px */
  @media screen and (max-width: 768px) {
    width: 100px;
    white-space: nowrap;
  }
`;

const StAlertButton = styled.button`
  width: fit-content;
  background-color: transparent;
  color: var(--6, #717171);
  border: none;
  font-weight: var(--fontWeight-semiBold);
  display: flex;
  align-items: center;
  gap: 0.8rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    gap: 1.2rem;

    p {
      font-size: 1.4rem;
    }
  }
`;

const StAlertIcon = styled(AiFillAlert)`
  font-size: 1.8rem;
  color: #dbff00e5;
`;

const StHeaderTitle = styled.div`
  width: 100%;
  font-family: 'Pretendard-Medium';
  margin-block: 2.1rem;
  font-size: var(--fontSize-H2);

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
    padding: 0rem 1.5rem;
    margin-block: 0.3rem;
  }
`;
const StHeaderPriceWrapper = styled.div`
  width: 100%;
  margin-block: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--fontSize-H2);

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
    font-size: 1.4rem;
    margin-block: 0.6rem;
  }
`;
const StPrice = styled.h3`
  font-family: 'Pretendard-Bold';
`;
const StTimeLeft = styled.div`
  max-width: 20%;
  font-size: var(--fontSize-H5);
  color: var(--6-gray);
  font-weight: var(--fontWeight-medium);

  @media screen and (max-width: 768px) {
    max-width: 30%;
  }
`;

const StProductInfoBody = styled.div`
  width: 100%;
  height: 100%;
  max-width: 640rem;
  max-height: 318rem;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--3-gray);
  color: var(--8-gray);
  border-radius: 1rem;

  @media screen and (max-width: 768px) {
    width: 94%;
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem 1.5rem;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  gap: 1.4rem;
  margin-block: 2rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem 1.5rem;
    margin-block: 0.1rem;
  }
`;

const PopAni = keyframes`
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(4);
  }

  50% {
    transform: scale(9);
  }

  75% {
    transform: scale(9);
  }

  100% {
    transform: scale(1);
  }
`;

type ButtonProps = {
  $role: string;
};

const Button = styled.div<ButtonProps>`
  width: 100%;
  max-width: ${(props) => (props.$role === 'like' ? '7.1rem' : '100%')};
  height: 6.8rem;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$role === 'like' ? 'var(--3-gray)' : 'var(--opc-100)'};
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    font-size: 1.2rem;
  }

  h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.8rem;
    color: var(--2-gray);
    font-weight: var(--fontWeight-bold);
  }
  &:hover {
    h3,
    p {
      color: var(--opc-100);
    }
    background-color: var(--3-gray);
  }

  @media screen and (max-width: 768px) {
    h3 {
      font-size: 1.15rem;
    }

    max-width: ${(props) => (props.$role === 'like' ? '7.1rem' : '100%')};
  }
`;

const FaHeartIcon = styled(FaHeart)`
  margin-block: 0.4rem;
  font-size: 2rem;
`;

// 상품 설명 섹션
const StProductIntroSection = styled.section`
  width: 100%;
  max-width: 120rem;
  line-height: 3.1rem;
  color: var(--8-gray);
  margin: auto;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0.3rem 1.5rem;
  }
`;
const StProductIntroTitle = styled.h4`
  width: 100%;
  margin-block: 1.6rem;
  font-size: 2rem;
  font-weight: 500;
`;
const StProductContent = styled.div`
  width: 100%;
  font-size: 1.6rem;
  white-space: break-spaces;
`;
const StProductCategory = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-block: 4rem;
`;
const StCategoryTag = styled.li`
  width: fit-content;
  font-size: 1.6rem;
  font-weight: 600;
  color: #4f4f4f;
  list-style: none;
  border-radius: 6px;
`;

const StSelectChatBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1d1d1d90;
  z-index: 2;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    position: fixed;
  }
`;

const StChatList = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36rem;
  height: 25rem;
  background: var(--3-gray);
  color: var(--opc-100);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
    position: absolute;
  }
`;

const StChatListItem = styled.div`
  padding: 2rem 1rem;
  height: 100%;

  cursor: pointer;

  &:hover {
    color: var(--3-gray);
    background-color: var(--opc-100);
  }
`;

const StConfirmSellBtn = styled.button`
  padding: 1rem;
  background-color: transparent;
  border: none;
  outline: none;
  background-color: var(--opc-80);
  border-radius: 0.8rem;
  margin-block: 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--opc-100);
    color: var(--3-gray);
  }

  span {
    font-size: 2rem;
    font-weight: 600;
  }
`;

export {
  StDetailContainer,
  StDetailInfoSection,
  StImageWrapper,
  StProductInfo,
  StProductInfoHeader,
  StUserTitlebox,
  StUserImage,
  StProfileImages,
  StUserNickname,
  StAlertButton,
  StHeaderTitle,
  StHeaderPriceWrapper,
  StPrice,
  StTimeLeft,
  StProductInfoBody,
  ButtonWrapper,
  Button,
  StProductIntroSection,
  StProductIntroTitle,
  StProductContent,
  StProductCategory,
  StCategoryTag,
  StAlertIcon,
  FaHeartIcon,
  StSelectChatBg,
  StChatList,
  StChatListItem,
  StConfirmSellBtn
};
