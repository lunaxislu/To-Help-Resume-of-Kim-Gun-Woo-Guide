import { BsChatRightFill } from 'react-icons/bs';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
`;
export const Posts = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  padding: 3rem;
  width: 54.6rem;
  height: 19.5rem;
  gap: 1.6rem;
  border: none;
  border-radius: 1rem;
  background-color: #1f1f1f;
  justify-content: space-between;
  color: #d9d9d9;
  cursor: pointer;
  & h2 {
    font-size: var(--fontSize-H4);
    font-weight: var(--fontWeight-semiBold);
    margin-bottom: 1.6rem;
    overflow: hidden;
    /* white-space: nowrap; */
    text-overflow: ellipsis;
    width: 100%;
    max-width: 40rem;
    color: var(--12-gray);
  }
`;
export const ContentArea = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 48.6rem;
  height: 6.6rem;
  font-size: var(--fontSize-H5);
  font-weight: var(--fontWeight-medium);
  line-height: 2.2rem;
  color: var(--9-gray);
`;
export const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--fontSize-H6);
  color: var(--6-gray);
`;
export const CommentArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--8-gray);
  & img {
    margin-top: 0.3rem;
  }
`;
export const CommentIcon = styled(BsChatRightFill)`
  color: #dbff00;
  opacity: 50%;
`;
export const Title = styled.h2`
  color: white;
  font-size: 2.4rem;
`;
