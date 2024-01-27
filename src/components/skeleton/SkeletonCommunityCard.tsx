import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  StPostSkeletonContainer,
  StPostSkeletonContentWrapper,
  StPostSkeletonIconAndDate,
  StPostSkeletonWrapper
} from '../../styles/skeleton/Skeleton';

interface SkeletonCommunityCardProps {
  cards: number;
}

const SkeletonCommunityCard: React.FC<SkeletonCommunityCardProps> = ({
  cards
}) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((item) => (
          <div key={item.id}>
            <SkeletonTheme baseColor="#191919" highlightColor="#1d1d1d">
              <StPostSkeletonContainer>
                <Skeleton width={300} height={25} />

                <StPostSkeletonWrapper>
                  <Skeleton width={70} height={70} />
                  <StPostSkeletonContentWrapper>
                    <Skeleton width={300} />
                    <Skeleton width={300} />
                  </StPostSkeletonContentWrapper>
                </StPostSkeletonWrapper>

                <StPostSkeletonIconAndDate>
                  <Skeleton width={100} />
                  <Skeleton width={100} />
                </StPostSkeletonIconAndDate>
              </StPostSkeletonContainer>
            </SkeletonTheme>
          </div>
        ))}
    </>
  );
};

export default SkeletonCommunityCard;
