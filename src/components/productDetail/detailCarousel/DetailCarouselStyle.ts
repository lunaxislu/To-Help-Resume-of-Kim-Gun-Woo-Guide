import Slider from 'react-slick';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
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
  height: 43.5rem;
`;

const CarouselImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-height: 43.5rem;
  height: 100vh;

  @media screen and (max-width: 768px) {
    height: 100vh;
    max-height: 43.5rem;
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

export {
  CarouselContainer,
  StSlider,
  CarouselImage,
  CarouselButtons,
  ArrowButton,
  ColoredIcon
};
