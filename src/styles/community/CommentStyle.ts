import { BsArrowReturnLeft } from 'react-icons/bs';
import { FaComment, FaThumbsUp } from 'react-icons/fa';
import { FaRegThumbsUp } from 'react-icons/fa6';
import styled from 'styled-components';
import { FormProps } from '../../pages/community/model';
export const Name = styled.p`
  font-size: var(--fontSize-body);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
  }
`;
export const Time = styled.p`
  font-size: var(--fontSize-H5);
  color: var(--9-gray);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
  }
`;

export const CommentContent = styled.p`
  font-size: var(--fontSize-H5);
  max-width: 45rem;
  /* width: 30rem; */
  @media screen and (max-width: 768px) {
    /* width: 17rem; */
  }
`;
export const LeftCommentSide = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;
export const CommentIcon = styled(FaComment)`
  color: var(--opc-100);
  transform: scaleX(-1);
  font-size: 1.7rem;
`;
export const LikesIcon = styled(FaRegThumbsUp)`
  color: var(--opc-100);
  font-size: 1.7rem;
  cursor: pointer;
`;
export const LikesIconOn = styled(FaThumbsUp)`
  color: var(--opc-100);
  font-size: 1.7rem;
  cursor: pointer;
`;
export const SendIcon = styled(BsArrowReturnLeft)`
  color: var(--opc-100);
  font-size: 1.9rem;
  font-weight: var(--fontWeight-semiBold);
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    font-weight: var(--fontWeight-bold);
  }
`;
export const CountDiv = styled.div`
  width: 100%;
  margin: 2rem;
  font-size: var(--fontSize-H5);
`;

export const AnonLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: var(--fontSize-H5);
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
  }
`;
export const CountDivTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
  font-size: var(--fontSize-H5);
  @media screen and (max-width: 768px) {
    /* border-bottom: 0.1rem solid var(--5-gray); */
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
export const Form = styled.form<FormProps>`
  width: 100%;
  max-width: 111.6rem;
  height: 12.8rem;
  margin-top: 6px;
  margin-bottom: 6px;
  background-color: #1f1f1f;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  & button {
    height: 5.3rem;
    width: 5.3rem;
    border-radius: 0.5rem;
    border: none;
    background-color: var(--opc-10);
    font-weight: var(--fontWeight-semiBold);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & div {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1rem solid var(--5-gray);
    align-items: end;
    padding-bottom: 1.5rem;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 9rem;
    ${({ isFocused: isFocused }) =>
      isFocused &&
      `position: fixed;
      bottom: 0;
      margin: 0;
      flex-direction: row-reverse;
      height: 4rem;
      justify-content: start;
    `}
    & button {
      height: 2.4rem;
      width: 2.4rem;
    }
    & div {
      /* border-bottom: none; */
      align-items: center;
      padding-bottom: 0.8rem;
      width: 100%;
      ${({ isFocused: isFocused }) =>
        isFocused &&
        `border-bottom: none;
    `}
    }
  }
`;
export const CommentInput = styled.input`
  width: 80%;
  height: 38px;
  background-color: transparent;
  border: none;
  color: var(--12-gray);
  font-size: var(--fontSize-body);
  &::placeholder {
    color: var(--5-gray);
    font-size: var(--fontSize-body);
  }
  @media screen and (max-width: 768px) {
    height: 24px;
    font-size: var(--fontSize-H6);
    &::placeholder {
      font-size: var(--fontSize-H6);
    }
  }
`;
export const CheckBoxs = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: var(--5-gray); /* 선택되지 않은 상태의 배경 색상 */
  border: none;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  outline: none;
  margin-right: 5px; /* 여백을 조절할 수 있습니다. */

  /* 체크 표시 스타일 */
  &:checked:before {
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    color: var(--opc-100);
  }
  @media screen and (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;
export const CommentContainer = styled.div`
  margin-top: 10px;
  background-color: #1f1f1f;
  width: 100%;
  min-height: 9.4rem;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  /* white-space: nowrap; */
  & button {
    padding: 10px;
    border-radius: 20px;
    border: none;
    background-color: #f3f3f3;
  }
  & input {
    background-color: var(--7-gray);
    border: none;
    height: 3.8rem;
    border-radius: 1rem;
    min-width: 20rem;
  }
`;
export const LeftSide = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  & p {
    margin-bottom: 20px;
  }
`;
export const UpdateBtnContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  cursor: pointer;
  font-size: var(--fontSize-H6);

  @media screen and (max-width: 768px) {
  }
  & p {
    white-space: nowrap;
  }
`;
