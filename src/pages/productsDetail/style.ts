import styled from 'styled-components';

const StDetailContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: auto;
  font-family: 'Pretendard-Regular';
`;

const StDetailInfoSection = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 1rem;
  align-items: start;
  border-bottom: 6px solid #eee;
  padding: 2rem 0 0 0;
`;

const StImageWrapper = styled.div`
  width: 65%;
  height: 550px;
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
  width: 100%;
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
  padding: 0 1rem 0 1rem;
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
  width: 28px;
  height: 28px;
  background-color: #eee;
  border-radius: 50%;
`;
const StUserNickname = styled.h4`
  width: 100%;
  font-size: 0.875rem;
`;
const StAlertButton = styled.button`
  width: fit-content;
`;

const StHeaderTitle = styled.div`
  width: 100%;
  font-family: 'Pretendard-Medium';
  font-size: 1.375rem;
  margin-block: 2rem;
`;
const StHeaderPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 2rem;
`;
const StPrice = styled.h3`
  font-family: 'Pretendard-Bold';
  font-size: 1.375rem;
`;
const StTimeLeft = styled.div`
  max-width: 20%;
`;

const StProductInfoBody = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #eeeeee70;
  border-radius: 9px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  margin-block: 2rem;
`;

type ButtonProps = {
  $role: string;
};

const Button = styled.div<ButtonProps>`
  width: ${(props) => (props.$role === 'like' ? '40%' : '60%')};
  padding: ${(props) =>
    props.$role === 'like' ? '1.063rem 7.188rem' : '1.063rem 5.813rem'};
  font-size: 1.125rem;
  border-radius: 5px;
  background-color: #eee;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

// 상품 설명 섹션
const StProductIntroSection = styled.section`
  width: 100%;
`;
const StProductIntroTitle = styled.h4`
  width: 100%;
  font-weight: 600;
  font-size: 1.4rem;
  margin-block: 2rem;
`;
const StProductContent = styled.div`
  width: 100%;
  margin-block: 2rem;
  white-space: break-spaces;
`;
const StProductCategory = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const StCategoryTag = styled.li`
  width: fit-content;
  padding: 0.3rem;
  font-weight: 600;
  color: #4f4f4f;
  list-style: none;
  background-color: #eee;
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
  StCategoryTag
};
