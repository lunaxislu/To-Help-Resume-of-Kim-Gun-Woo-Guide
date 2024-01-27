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
    // autoplay: true,
    autoplaySpeed: 8000,
    draggable: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 350,
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
      {/* <Slider {...settings} ref={slickRef}>
        {carouselImages.map((image, index) => (
          <CarouselImage
            key={index}
            src={image}
            alt={`Carousel ${index + 1}`}
          />
        ))}
      </Slider> */}
      <MainImage src="/assets/carouselmain.png" alt="메인화면" />
      {/* <CarouselButtons>
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
      </CarouselButtons> */}
    </CarouselContainer>
  );
};

export default InfiniteCarousel;

const MainImage = styled.img`
  width: 100%;
  min-height: 40.1rem;
  object-fit: cover;
  object-position: center;
  @media screen and (max-width: 768px) {
    max-height: 41rem;
    min-height: 20rem;
  }
  @media screen and (max-width: 500px) {
    max-height: 41rem;
    min-height: 15rem;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  /* max-height: 40.1rem; */
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    /* height: 28.5rem; */
  }

  /* @media screen and (max-width: 768px) {
    max-width: 76.8rem;
    width: 100%;
    height: 21rem;
  }

  @media screen and (max-width: 530px) {
    max-width: 53rem;
    width: 100%;
    height: 20rem;
  }
  @media screen and (max-width: 400px) {
    max-width: 40rem;
    width: 100%;
    height: 15.3rem;
  } */
  /* .slick-list {
    @media screen and (max-width: 530px) {
      width: 100%;
    }
  } */

  .dots_custom {
    display: inline-block;
    vertical-align: middle;
    margin: auto 0;
    padding: 0;
    position: absolute;
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
  height: 100%;
  object-fit: cover;
  object-position: center;
  box-sizing: border-box;
  @media screen and (max-width: 1024px) {
    max-height: 28.5rem;
  }
  @media screen and (max-width: 768px) {
    max-height: 21rem;
  }

  @media screen and (max-width: 530px) {
    max-height: 14.3rem;
  }
`;
const CarouselButtons = styled.div`
  /* position: absolute; */
  top: 45%;
  /* transform: translateY(-50%); */
  display: flex;
  position: absolute;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  margin: auto 0;
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
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    max-width: 76%;
    max-height: 76%;
  }
  @media screen and (max-width: 768px) {
    max-width: 50%;
    max-height: 50%;
  }
  @media screen and (max-width: 530px) {
    max-width: 40%;
    max-height: 40%;
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
    width: 4rem;
    height: 4rem;
  }
  @media screen and (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
  @media screen and (max-width: 530px) {
    width: 2rem;
    height: 2rem;
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
    /* @media screen and (max-width: 320px) {
      max-width: 48%;
      max-height: 48%;
    } */
  }
`;
