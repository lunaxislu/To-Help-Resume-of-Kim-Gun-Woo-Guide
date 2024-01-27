import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StPostContainer = styled.div<{ list: number }>`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media screen and (max-width: 1024px) {
    padding: 0 2rem;
    gap: 2rem;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
  }
`;

export const StPostWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 20rem;
  flex: 1 1 40%;
  gap: 1.5rem;
  background: var(--2-gray);
  border-radius: 1rem;
  padding: 3rem;
  text-decoration: none;

  & span {
    color: #9d9d9d;
    font-size: 1.2rem;
  }
`;

export const StPostTitle = styled.p`
  font-size: 1.8rem;
  color: #f8f8f8;
  font-weight: var(--fontWeight-bold);

  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
  }
`;

export const StPostContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const StPostImage = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 5px;
`;

export const StPostContent = styled.p`
  font-size: 1.4rem;
  color: var(--8-gray);

  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
  }
`;

export const StIconAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StIconContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  & span {
    margin-right: 0.5rem;
  }
`;

export const StPostDate = styled.p`
  color: var(--6-gray);
  font-size: var(--fontSize-H6);

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;
