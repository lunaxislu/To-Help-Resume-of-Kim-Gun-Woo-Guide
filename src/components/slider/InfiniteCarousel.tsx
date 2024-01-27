import React, { useCallback, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
interface InfiniteCarouselProps {
  carouselImages: string[];
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
  carouselImages
}) => {
  const slickRef = useRef<Slider | null>(null);
  const previous = useCallback(() => slickRef.current?.slickPrev(), []);
  const next = useCallback(() => slickRef.current?.slickNext(), []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    draggable: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    appendDots: (dots: any) => (
      <div
        style={{
          width: '100%',
          position: 'absolute',
          bottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom'
  };

  return (
    <CarouselContainer>
      <Slider {...settings} ref={slickRef}>
        {carouselImages.map((image, index) => (
          <CarouselImage
            key={index}
            src={image}
            alt={`Carousel ${index + 1}`}
          />
        ))}
      </Slider>
      <CarouselButtons>
        <ArrowButton onClick={previous}>
          <ColoredIcon>
            <FaChevronLeft />
          </ColoredIcon>
        </ArrowButton>
        <ArrowButton onClick={next}>
          <ColoredIcon>
            <FaChevronRight className="rightarrow" />
          </ColoredIcon>
        </ArrowButton>
      </CarouselButtons>
    </CarouselContainer>
  );
};

export default InfiniteCarousel;

const CarouselContainer = styled.div`
  position: relative;
  width: 144rem;
  height: 40.1rem;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
  }
  .slick-list {
    @media screen and (max-width: 530px) {
      width: 100%;
    }
  }

  .dots_custom {
    display: inline-block;
    vertical-align: middle;
    margin: auto 0;
    padding: 0;
    @media screen and (max-width: 1024px) {
    }
    @media screen and (max-width: 768px) {
    }
    @media screen and (max-width: 400px) {
    }
  }

  .dots_custom li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 0.6rem;
    padding: 0;
    @media screen and (max-width: 1024px) {
    }
    @media screen and (max-width: 768px) {
      margin: 0 0.6rem;
    }
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
    @media screen and (max-width: 768px) {
      width: 4px;
      height: 4px;
    }
  }

  .dots_custom li.slick-active button {
    background-color: #08c1ce;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  max-height: 40.1rem;
  object-fit: cover;
  box-sizing: border-box;
  @media screen and (max-width: 1024px) {
    max-width: 100%;
  }
  @media screen and (max-width: 768px) {
    object-fit: cover;
    width: 100%;
    max-height: 21rem;
  }
`;
const CarouselButtons = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  width: 5rem;
  height: 5rem;
  @media screen and (max-width: 1024px) {
    max-width: 76%;
    max-height: 76%;
  }
  @media screen and (max-width: 320px) {
    max-width: 48%;
    max-height: 48%;
  }
`;
const ColoredIcon = styled.div`
  display: inline-block;
  position: relative;
  width: 5rem;
  height: 5rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  @media screen and (max-width: 1024px) {
    max-width: 76%;
    max-height: 76%;
  }
  @media screen and (max-width: 320px) {
    max-width: 48%;
    max-height: 48%;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: var(--opc-100);
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    @media screen and (max-width: 320px) {
      max-width: 48%;
      max-height: 48%;
    }
  }
`;
