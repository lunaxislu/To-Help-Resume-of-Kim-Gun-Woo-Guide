import Slider from 'react-slick';
import styled from 'styled-components';
import { StFadeAni } from '../../pages/chat/style';

// Carousel
const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70rem;
  max-height: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
  .dots_custom {
    display: inline-block;
    vertical-align: middle;
    margin: auto 0;
    padding: 0;
  }

  .dots_custom li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 0.6rem;
    padding: 0;
  }

  .dots_custom li button {
    border: none;
    background: #d1d1d1;
    color: transparent;
    cursor: pointer;
    display: block;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 100%;
    padding: 0;
  }

  .dots_custom li.slick-active button {
    background-color: #08c1ce;
  }

  @media screen and (max-width: 768px) {
    height: 100%;
    width: 100%;
  }
`;

const StSlider = styled(Slider)`
  width: 100%;
  height: 100%;
`;

const CarouselImage = styled.img`
  object-fit: contain;
  width: 100%;
  height: 75vh;

  @media screen and (max-width: 768px) {
    height: 50vh;
    max-height: 70rem;
  }
`;
const CarouselButtons = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  width: 5rem;
  height: 5rem;
`;

const ColoredIcon = styled.div`
  display: inline-block;
  position: relative;
  width: 5rem;
  height: 5rem;
  background-color: rgba(255, 255, 255, 0.6);

  border-radius: 50%;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: var(--opc-100);
    width: 2rem; /* 아이콘의 전체 크기를 설정합니다. */
    height: 2rem;
    cursor: pointer;
  }
`;

// Viewer
const StViewer = styled.div`
  width: 65%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  background-color: #1f1f1f;
  padding: 1.5rem;
  border-radius: 12px;
  @media screen and (max-width: 768px) {
    width: 100%;
    top: 40%;
  }
`;

const StCloseViewerBtn = styled.button`
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  top: 0;
  right: 5%;
  padding: 1rem;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 6rem;
  color: var(--opc-100);
  cursor: pointer;
  z-index: 7;

  @media screen and (max-width: 768px) {
    top: 0;
    right: 12%;
  }
`;

const StRowValue = styled.div`
  width: 100%;
  font-size: 1.6rem;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const StValueParagraph = styled.div`
  width: fit-content;
  font-size: 1.2rem;
  padding: 0.6rem;
  border-radius: 0.3rem;
  color: var(--11-gray);
  background-color: #a0f4b3;
`;

const StQualityInfo = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  background-color: transparent;
  color: var(--opc-100);
  line-height: 1.2;
  font-size: 2rem;
  cursor: pointer;
  position: relative;
`;

const StQualityInfoBox = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: var(--bgColor);
  position: absolute;
  border: 0.1rem solid var(--opc-100);
  left: -500px;
  bottom: -100px;
  color: white;
  border-radius: 12px;
  display: -webkit-flex; /* iOS Safari에서 Flexbox 지정 */
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem;
  animation: ${StFadeAni} 0.2s forwards;
  text-align: left;
  font-size: 1.6rem;
  font-weight: 500;

  p {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    color: black;
  }

  span {
    color: var(--opc-100);
    font-weight: 500;
    margin-left: 0.4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
    left: -300px;

    p {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    span {
      margin-bottom: 0.3rem;
      margin-left: 0.3rem;
    }
  }
`;

const StMapButton = styled.button.attrs({
  type: 'button'
})`
  width: 100px;
  height: 30px;
  background: transparent;
  border: none;
  color: var(--8-gray);
  text-decoration: underline;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StShippingCostInfoBox = styled.div`
  padding: 0.5rem;
  background-color: var(--opc-100);
  color: white;
  border-radius: 2px;
  font-size: 1.2rem;
  font-weight: 500;
`;

export {
  CarouselContainer,
  StSlider,
  CarouselImage,
  CarouselButtons,
  ArrowButton,
  ColoredIcon,
  StViewer,
  StCloseViewerBtn,
  StRowValue,
  StValueParagraph,
  StQualityInfo,
  StQualityInfoBox,
  StMapButton,
  StPriceContainer,
  StShippingCostInfoBox
};
