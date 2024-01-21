import { FaHeart } from 'react-icons/fa';
import { AiFillAlert } from 'react-icons/ai';
import styled, { keyframes } from 'styled-components';

const StDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1440px;
  max-height: 2828px;
  padding: 4.9rem 0;
  margin: auto;
  font-family: 'Pretendard-Regular';
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
`;

const StImageWrapper = styled.div`
  width: 100%;
  max-width: 430px;
  height: 43.5rem;
  border-radius: 12px;
  overflow: hidden;
  background-color: aliceblue;
`;

const StCarouselBox = styled.div`
  width: 300vw;
  height: 100%;
  overflow: hidden;
`;
const StImageList = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 1.2s ease;
  transform: translateX(0vw);

  div {
    width: 100%;
    height: 100%;
    background-color: blue;
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
const StProfileImages = styled.div`
  width: 22px;
  height: 22px;
  background-color: #eee;
  border-radius: 50%;
`;
const StUserNickname = styled.h4`
  color: var(--7, #878787);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 191.2%; /* 26.768px */
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
`;
const StHeaderPriceWrapper = styled.div`
  width: 100%;
  margin-block: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--fontSize-H2);
`;
const StPrice = styled.h3`
  font-family: 'Pretendard-Bold';
`;
const StTimeLeft = styled.div`
  max-width: 20%;
  font-size: var(--fontSize-H5);
  color: var(--6-gray);
  font-weight: var(--fontWeight-medium);
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
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  gap: 1.4rem;
  margin-block: 2rem;
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
`;

const FaHeartIcon = styled(FaHeart)`
  margin-block: 0.4rem;
  font-size: 2.2rem;
`;

// 상품 설명 섹션
const StProductIntroSection = styled.section`
  width: 100%;
  line-height: 3.1rem;
  color: var(--8-gray);
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
  cursor: pointer;
`;

export {
  StDetailContainer,
  StDetailInfoSection,
  StImageWrapper,
  StCarouselBox,
  StImageList,
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
  FaHeartIcon
};
