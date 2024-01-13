import React, { useState } from 'react';
import styled from 'styled-components';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContainer>
      <CarouselContent
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <CarouselImage
            key={index}
            src={process.env.PUBLIC_URL + image}
            alt={`Slide ${index}`}
          />
        ))}
      </CarouselContent>
      <Button className="left">
        <Icon src={'/assets/goprev.png'} alt="Previous" onClick={goToPrev} />
      </Button>
      <Button className="right">
        <Icon src={'/assets/gonext.png'} alt="Next" onClick={goToNext} />
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
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

const CarouselContent = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
