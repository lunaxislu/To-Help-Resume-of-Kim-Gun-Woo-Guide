import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const infiniteCarousel = [images[images.length - 1], ...images, images[0]];
  const carouselRef = useRef<HTMLUListElement>(null);
  // 총 3개임. 인덱스는 0,1,2
  // 여기에 앞 뒤로 끝 슬라이드 추가함 -> 2,0,1,2,0 이런식 / 그걸 무한캐러셀 배열에 넣고 map을 돌림
  // 새로운 배열의 인덱스는 0,1,2,3,4가 됨. 인덱스 번호가 4가 되면 자연스럽게 1 슬라이드로 가게 하고
  // 인덱스 번호가 0이 되면 자연스럽게 3 슬라이드로 가도록 해야 함.

  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setCurrentIndex(index);
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = '';
      }
    }, 500);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === images.length - 1) {
        setTimeout(() => {
          setCurrentIndex(0);
        }, 0);
        return images.length;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return images.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // useEffect(() => {
  //   const intervalId = setInterval(goToNext, 10000);

  //   return () => clearInterval(intervalId);
  // }, [currentIndex, images.length]);

  return (
    <CarouselContainer>
      <CarouselContent
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {infiniteCarousel.map((image, index) => (
          <CarouselImage
            key={index}
            src={process.env.PUBLIC_URL + image}
            alt={`Slide ${index}`}
          />
        ))}
      </CarouselContent>
      <Button className="left" onClick={goToPrev}>
        <Icon src={'/assets/goprev.png'} alt="Previous" />
      </Button>
      <Button className="right" onClick={goToNext}>
        <Icon src={'/assets/gonext.png'} alt="Next" />
      </Button>
      <DotContainer>
        {images.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => goToImage(index)}
          />
        ))}
      </DotContainer>
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div`
  position: relative;
  /* max-width: 100%; */
  /* height: 400px; */
  overflow: visible;
`;

const CarouselContent = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const CarouselImage = styled.img`
  flex: 0 0 100%;
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
  /* background-repeat: no-repeat; */
  border: 2px solid red;
  box-sizing: border-box;
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#333' : '#ccc')};
  margin: 0 5px;
  cursor: pointer;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 20px;

  &.left {
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    left: 20px;
  }

  &.right {
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    right: 20px;
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
`;
