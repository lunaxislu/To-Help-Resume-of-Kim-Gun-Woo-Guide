import styled from 'styled-components';

export const StPostSkeletonContainer = styled.div`
  background-color: #191919;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 19.5rem;
  width: 100%;
  gap: 1.5rem;
  padding: 3rem;
  border-radius: 1rem;
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
