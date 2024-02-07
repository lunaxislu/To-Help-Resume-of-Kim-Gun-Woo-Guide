import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  ActionSkeleton,
  Container,
  ContentsSkeleton,
  ImgSkeleton,
  StPostSkeletonContainer,
  StPostSkeletonContentWrapper,
  StPostSkeletonIconAndDate,
  StPostSkeletonWrapper,
  TitleSkeleton
} from '../../styles/skeleton/Skeleton';

interface SkeletonCommunityCardProps {
  cards: number;
}

const SkeletonCommunityCard: React.FC<SkeletonCommunityCardProps> = ({
  cards
}) => {
  return (
    <Container>
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div key={index}>
            <SkeletonTheme baseColor="#eaedee" highlightColor="#fafeff">
              <StPostSkeletonContainer>
                <TitleSkeleton />

                <StPostSkeletonWrapper>
                  <ImgSkeleton />
                  <StPostSkeletonContentWrapper>
                    <ContentsSkeleton />
                    {/* <ContentsSkeleton /> */}
                  </StPostSkeletonContentWrapper>
                </StPostSkeletonWrapper>

                <StPostSkeletonIconAndDate>
                  <ActionSkeleton />
                  <ActionSkeleton />
                </StPostSkeletonIconAndDate>
              </StPostSkeletonContainer>
            </SkeletonTheme>
          </div>
        ))}
    </Container>
  );
};

export default SkeletonCommunityCard;
