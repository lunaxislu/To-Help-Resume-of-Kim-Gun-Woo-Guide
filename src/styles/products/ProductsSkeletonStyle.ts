import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

export const ContainerSkeleton = styled.div`
  max-width: 111.6rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: auto;
  column-gap: 1.5rem;
  row-gap: 2rem;
  margin: 2rem 0;
  @media screen and (max-width: 1220px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 950px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    column-gap: 1.3rem;
    row-gap: 1.5rem;
    margin: 1.5rem 0;
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 670px) {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 1.3rem;
  }
  @media screen and (max-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }
`
export const CardCotainerSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  border-radius: 0.6rem;
  transition: all 0.2s linear;
  background-color: var(--bgColor);
  border: 0.1rem solid #71717130;
  padding: 1.5rem;
  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`
export const CardImageSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  margin-bottom: 1rem;
  border-radius: 0.6rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 0.6rem;
  }
`;
export const ImageSkeleton = styled(Skeleton)`
  object-fit: cover;
  object-position: center;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.6rem;
`;

export const CardQualitySkeleton = styled(Skeleton)`
  height: 2rem;
  width: 7rem;
  border-radius: 0.4rem;
  margin-bottom: 0.6rem;
  @media screen and (max-width: 768px) {
    height: 1.8rem;
    width: 5rem;
  }
`;
export const CardTitleSkeleton = styled(Skeleton)`
  height: 2rem;
  width: 9rem;
  border-radius: 0.4rem;
  margin-bottom: 0.6rem;
  @media screen and (max-width: 768px) {
    height: 1.8rem;
    width: 7rem;
  }
`;

export const CardPriceSkeleton = styled(Skeleton)`
  height: 2rem;
  width: 6rem;
  border-radius: 0.4rem;
  @media screen and (max-width: 768px) {
    height: 1.8rem;
    width: 4rem;
  }
`;
export const LikesWrapperSkeleton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const LikesSkeleton = styled(Skeleton)`
  height: 2rem;
  width: 4rem;
  border-radius: 0.4rem;
  color: var(--gray);
  @media screen and (max-width: 768px) {
    height: 1.8rem;
    width: 2.5rem;
  }
`