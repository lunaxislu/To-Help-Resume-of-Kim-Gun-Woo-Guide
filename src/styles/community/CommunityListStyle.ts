import { BsChatRightFill } from 'react-icons/bs';
import { FaRegThumbsUp } from 'react-icons/fa6';
import styled from 'styled-components';
import { PageBtnProps } from '../../pages/community/model';
export const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;
export const MainImg = styled.div`
  width: 6.6rem;
  height: 6.6rem;

  & img {
    width: 6.6rem;
    height: 6.6rem;
    border-radius: 0.5rem;
  }
  @media screen and (max-width: 768px) {
    width: 4rem;
    height: 4rem;
    & img {
      width: 4rem;
      height: 4rem;
      border-radius: 0.5rem;
    }
  }
`;
export const ContentsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
export const Posts = styled.li`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  padding: 3rem;
  max-width: 54.6rem;
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
    font-weight: var(--fontWeight-medium);
    margin-bottom: 1.6rem;
    overflow: hidden;
    width: 100%;
    max-width: 40rem;
    color: var(--12-gray);
    height: 1.8rem;
  }
  @media screen and (max-width: 768px) {
    height: 13.3rem;
    padding: 1.5rem;
    max-width: none;
    & h2 {
      font-size: var(--fontSize-H5);
      height: 1.4rem;
    }
  }
`;
export const ContentArea = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  height: 6.6rem;
  font-size: var(--fontSize-H5);
  font-weight: var(--fontWeight-medium);
  line-height: 2.2rem;
  color: var(--9-gray);
  @media screen and (max-width: 768px) {
    height: 3.8rem;
    font-size: var(--fontSize-H6);
  }
`;
export const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--fontSize-H6);
  color: var(--6-gray);
`;
export const CommentArea = styled.div`
  display: flex;
  /* align-items: center; */
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
export const LikesIcon = styled(FaRegThumbsUp)`
  color: #dbff00;
  opacity: 50%;
`;
export const Title = styled.h2`
  color: white;
  font-size: 2.4rem;
`;
export const PageNumber = styled.div`
  text-align: center;
  margin-top: 9.2rem;
  display: flex;
  justify-content: center;
  gap: 5rem;
  @media screen and (max-width: 768px) {
    gap: 2rem;
  }
`;
export const PageBtn = styled.button<PageBtnProps>`
  background-color: transparent;
  border: none;
  color: ${(props) =>
    props.$currentPage === props.pageNumber ? 'var(--opc-100)' : '#f8f8f8'};
`;
