import ReactQuill from 'react-quill';
import styled from 'styled-components';
export const LayoutContentArea = styled.div`
  display: flex;
`;

export const LayoutFileArea = styled.div`
  display: flex;
`;
export const LayoutAnonArea = styled.div`
  display: flex;
`;

export const LayoutValueText = styled.div`
  width: 16rem;
  font-size: var(--fontSize-body);
  display: flex;
  align-items: center;
  & span {
    color: var(--opc-100);
  }
`;
export const LayoutTitleContainer = styled.div`
  display: flex;

  & input {
    height: 54px;
    width: 100%;
    max-width: 90.6rem;
    background-color: #1f1f1f;
    border: none;
    border-radius: 5px;
    padding-left: 16px;
    color: var(--12-gray);

    &::placeholder {
      color: var(--5-gray);
      font-size: var(--fontSize-H5);
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
    width: 10.3rem;
    height: 4.8rem;
    background-color: var(--opc-100);
    font-size: var(--fontSize-H5);
    font-weight: var(--fontWeight-bold);
  }
  & label {
    display: flex;
    align-items: center;
    font-size: var(--fontSize-H5);
  }
`;
export const LayoutContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  & select {
    width: 100px;
    height: 40px;
  }
  & button {
    width: 100px;
    height: 40px;
  }
  & h1 {
    font-size: 30px;
    margin-top: 50px;
    text-align: center;
  }
`;
export const LayoutCategoryContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;

  font-size: var(--fontSize-H5);
  & label {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-right: 3rem;
    cursor: pointer;
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

  & input {
    display: none;
  }
`;
export const LayoutQuillEditor = styled(ReactQuill)`
  background-color: #1f1f1f;
  border-radius: 5px;
  width: 100%;
  max-width: 906px;

  .ql-container {
    height: 70rem;
    overflow: scroll;
    border: none;

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
    font-size: 16px;
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
  width: 80%;
  & select {
    width: 100px;
    height: 40px;
  }
  & button {
    width: 100px;
    height: 40px;
  }
  & h1 {
    font-size: 30px;
    margin-top: 50px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--4-gray);
  }
`;
