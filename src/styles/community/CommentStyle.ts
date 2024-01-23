import { BsChatRightFill } from 'react-icons/bs';
import { FaRegThumbsUp } from 'react-icons/fa6';
import styled from 'styled-components';
export const Name = styled.p`
  font-size: var(--fontSize-H5);
`;
export const CommentContent = styled.p`
  font-size: var(--fontSize-H6);
  width: 45rem;
`;
export const CommentIcon = styled(BsChatRightFill)`
  color: #dbff00;

  /* opacity: 50%; */
`;
export const LikesIcon = styled(FaRegThumbsUp)`
  color: #dbff00;
  font-size: 1.7rem;

  /* opacity: 50%; */
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
`;
export const CountDivTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 0.1rem solid var(--12-gray);
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: var(--fontSize-H5);
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
export const Form = styled.form`
  width: 100%;
  max-width: 1116px;
  height: 7.1rem;
  margin-top: 6px;
  margin-bottom: 6px;
  background-color: #1f1f1f;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1.2rem;
  & button {
    height: 3rem;
    width: 4rem;
    border-radius: 0.5rem;
    border: none;
    background-color: var(--5-gray);

    font-weight: var(--fontWeight-semiBold);
  }
`;
export const CommentInput = styled.input`
  width: 80%;
  height: 38px;
  background-color: transparent;
  border: none;
  color: var(--12-gray);
  &::placeholder {
    color: var(--5-gray);
    font-size: 16px;
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
  & button {
    padding: 10px;
    border-radius: 20px;
    border: none;
    background-color: #f3f3f3;
  }
  & input {
    width: 30rem;
    background-color: var(--7-gray);
    border: none;
    height: 3.8rem;
    border-radius: 1rem;
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
`;
