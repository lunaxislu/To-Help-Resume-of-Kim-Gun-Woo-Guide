import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

export const Container = styled.ul`
  max-width: 111.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  margin-top: 2.4rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }
`;
export const StPostSkeletonContainer = styled.li`
  background-color: #ebe8e8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 19.5rem;
  width: 100%;
  gap: 1rem;
  padding: 2rem;

  @media screen and (max-width: 768px) {
    height: fit-content;
    justify-content: none;
  }
`;

export const StPostSkeletonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StPostSkeletonContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const StPostSkeletonIconAndDate = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const TitleSkeleton = styled(Skeleton)`
  width: 80%;
  max-width: 19.5rem;
  height: 2.5rem;

  @media screen and (max-width: 768px) {
    height: 2rem;
  }
`;
export const ImgSkeleton = styled(Skeleton)`
  width: 4rem;
  height: 4rem;
`;
export const ContentsSkeleton = styled(Skeleton)`
  width: 10rem;
  height: 2.5rem;

  @media screen and (max-width: 768px) {
    height: 1.5rem;
  }
`;
export const ActionSkeleton = styled(Skeleton)`
  width: 6rem;
  height: 2.5rem;

  @media screen and (max-width: 768px) {
    height: 1.5rem;
  }
`;
