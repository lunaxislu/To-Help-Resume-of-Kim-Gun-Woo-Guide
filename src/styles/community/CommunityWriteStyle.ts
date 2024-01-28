import { GoChevronLeft } from 'react-icons/go';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
export const LayoutContentArea = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const LayoutFileArea = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
export const LayoutAnonArea = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const LayoutValueText = styled.div`
  width: 16rem;
  font-size: var(--fontSize-body);
  display: flex;
  align-items: center;
  & span {
    color: var(--opc-100);
  }
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
  }
`;
export const LayoutTitleContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;

  & input {
    height: 54px;
    width: 100%;
    max-width: 90.6rem;
    background-color: #1f1f1f;
    border: none;
    border-radius: 5px;
    padding-left: 16px;
    color: var(--12-gray);
    font-family: 'Pretendard-Medium';
    font-size: var(--fontSize-body);
    &::placeholder {
      color: var(--5-gray);
      font-size: var(--fontSize-H5);
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    & input {
      height: 3rem;
      font-size: var(--fontSize-H6);
      &::placeholder {
        font-size: var(--fontSize-H6);
      }
    }
  }
`;
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;

  & strong {
    font-weight: bold;
  }
  & em {
    font-style: italic;
  }
  & p {
    display: flex;
  }
`;
export const LayoutBottom = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 90.6rem;
  justify-content: space-between;
  & button {
    border: none;
    border-radius: 1rem;
    width: 10rem;
    height: 4rem;
    background-color: var(--opc-100);
    font-size: var(--fontSize-H5);
    font-weight: var(--fontWeight-bold);
  }
  & label {
    display: flex;
    align-items: center;
    font-size: var(--fontSize-H5);
  }
  @media screen and (max-width: 768px) {
    & button {
      width: 6.5rem;
      height: 3rem;
      font-size: var(--fontSize-H6);
    }
    & label {
      font-size: var(--fontSize-H6);
    }
  }
`;
export const LayoutContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 2rem; */
  width: 100%;

  & h1 {
    font-size: 30px;
    margin-top: 50px;
    text-align: center;
  }
`;
export const LayoutCategoryContainer = styled.div`
  /* height: 30px; */
  display: flex;
  align-items: center;
  font-size: var(--fontSize-H5);
  white-space: nowrap;
  margin-bottom: 2rem;
  & label {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-right: 3rem;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: start;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: var(--fontSize-H6);
    & label {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      cursor: pointer;
      margin-bottom: 1rem;
    }
    & div {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;
export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const LayoutFileUploader = styled.label`
  background-color: #1f1f1f;
  border-radius: 5px;
  height: 54px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-size: var(--fontSize-H5);
  width: 100%;
  max-width: 90.6rem;
  color: var(--5-gray);
  margin-bottom: 1.5rem;
  & input {
    display: none;
  }
  @media screen and (max-width: 768px) {
    height: 3rem;

    font-size: var(--fontSize-H6);
  }
`;
export const LayoutQuillEditor = styled(ReactQuill)`
  background-color: #1f1f1f;
  border-radius: 5px;
  width: 100%;
  max-width: 906px;
  margin-bottom: 2rem;

  .ql-container {
    height: 70rem;
    overflow: scroll;
    border: none;
    font-family: 'Pretendard-Medium';
    font-size: var(--fontSize-H6);
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .ql-toolbar {
    border: none;
    border-bottom: 1px solid var(--4-gray);
  }
  .ql-editor strong {
    font-weight: bold;
  }
  .ql-editor em {
    font-style: italic;
  }
  .ql-editor ::placeholder {
    color: white;
  }
  .ql-editor p {
    display: flex;
    line-height: 30px;
    font-size: var(--fontSize-body);
  }
  .ql-editor img {
    width: 60%;
  }
  @media screen and (max-width: 768px) {
    .ql-container {
      height: 250rem;
    }
    & img {
      max-width: 80%;
    }
    .ql-editor p {
      line-height: 2rem;
      font-size: var(--fontSize-H6);
    }
  }
`;
export const CheckBoxs = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: var(--6-gray);
  border: none;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  outline: none;
  margin-right: 5px;

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
export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
  color: #f3f3f3;
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1066px;
  width: 90%;
`;

export const Topper = styled.div`
  display: flex;
  margin-top: 50px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--4-gray);
  /* gap: 1rem; */

  & p {
    font-size: var(--fontSize-H6);
    color: var(--opc-100);
  }
  & h1 {
    font-size: var(--fontSize-H1);
  }
  @media screen and (max-width: 768px) {
    & h1 {
      font-size: var(--fontSize-H5);
      margin-right: 1rem;
    }
    & p {
      font-size: 1rem;
    }
  }
`;
export const Validate = styled.p`
  color: #ea4949;
  font-size: var(--fontSize-H6);
  font-weight: var(--fontWeight-regular);
  margin-bottom: 2rem;
  margin-left: 18%;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    margin-left: 0;
  }
`;

// export const BackIcon = styled(GoChevronLeft)`
//   color: var(--opc-100);
//   display: none;
//   width: 2rem;
//   height: 1.5rem;
//   :hover {
//     cursor: pointer;
//   }
//   @media screen and (max-width: 768px) {
//     display: block;
//   }
// `;
export const BackBtnBox = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    width: 2rem;
    height: 1.5rem;
    :hover {
      cursor: pointer;
    }
  }
`;
export const BackIcon = styled(GoChevronLeft)`
  width: 100%;
  height: 100%;
  color: var(--opc-100);
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
