import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

const SkeletonCommunityDetail: React.FC = () => {
  return (
    <>
      <div>
        <SkeletonTheme baseColor="#eaedee" highlightColor="#fafeff">
          <StPostSkeletonContainer>
            <StPostSkeletonArea>
              <Skeleton width={300} />
              <Skeleton width={100} />
              <StPostSkeletonWrapper>
                {/* <Skeleton width={70} height={70} /> */}
                <StPostSkeletonContentWrapper>
                  <Skeleton width={300} />
                  <Skeleton width={300} height={200} />
                </StPostSkeletonContentWrapper>
              </StPostSkeletonWrapper>

              <StPostSkeletonIconAndDate>
                <Skeleton width={300} />
                <Skeleton width={300} />
              </StPostSkeletonIconAndDate>
            </StPostSkeletonArea>
          </StPostSkeletonContainer>
        </SkeletonTheme>
      </div>
    </>
  );
};

export default SkeletonCommunityDetail;

const StPostSkeletonContainer = styled.div`
  /* background-color: #e2e2e288; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  border-radius: 1rem;
  padding: 3rem;
`;
const StPostSkeletonArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 111.6rem;
  gap: 1.5rem;
`;

const StPostSkeletonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StPostSkeletonContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StPostSkeletonIconAndDate = styled.div`
  display: flex;
  justify-content: space-between;
`;
