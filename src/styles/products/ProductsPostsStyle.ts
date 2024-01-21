import { VscCheck } from "react-icons/vsc";
import styled from "styled-components";

// ProductsPosts
export const EntireContainer = styled.div`
  width: 144rem;
  display: flex;
  margin: auto;
  margin-bottom: 15rem;
`
export const ContentsContainer = styled.div`
  width: 111.6rem;
  margin: auto;
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4.2rem;
  margin-bottom: 2rem;
  `

export const Title = styled.h1`
  font-size: var(--fontSize-H2);
  margin-right: 1.7rem;
`

export const TetleRequired = styled.p`
  color: var(--opc-100);
  font-size: var(--fontSize-H6);
  line-height: 200%;
`

export const Hr = styled.hr`
  height: 0.1rem;
  margin-bottom: 2rem;
`

// ProductsWriteForm
export const WrapperStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5rem;
`

export const SemiTitle = styled.h2`
  width: 18.8rem;
  display: flex;
  flex-direction: row;
  line-height: 2;
`

export const Required = styled.p`
color: var(--opc-100);
font-size: var(--fontSize-H6);
line-height: 2.5;
margin-left: 0.3rem;
`

export const InputStyle = styled.input`
  width: 85.7rem;
  height: 5rem;
  background-color: var(--3-gray);
  font-size: var(--fontSize-H5);
  border: none;
  border-radius: 0.7rem;
  color: var(--8-gray);
  padding-left: 2rem;
  &::placeholder {
    color: var(--5-gray);
  }
`

export const CountText = styled.span`
  height: 100%;
  margin-left: 2rem;
  color: var(--7-gray);
  font-size: var(--fontSize-H6);
  // 카운트 텍스트가 아래로 가지않음, 조건부 필요
  line-height: 3;
  vertical-align: bottom;
`

export const InputWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
`

export const CategoryContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  `;

export const InputCheckBoxLabel = styled.label`
  color: var(--11-gray);
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`

export const InputCheckBoxStyle = styled.input`
  appearance: none;
  width: 2.8rem;
  height: 2.8rem;
  background-color: var(--3-gray);
  border: none;
  border-radius: 0.4rem;
  position: relative;
  cursor: pointer;
  outline: none;
  margin-left: 1rem;
  /* 체크 표시 스타일 */
  &:checked:before {
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.4rem;
    color: var(--opc-100);
  }
`;

export const ShippingCostSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5rem;
`

export const ChangableSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3rem;
`

export const AddressInputStyle = styled.input`
  min-width: 47.7rem;
  height: 5rem;
  background-color: var(--3-gray);
  font-size: var(--fontSize-H6);
  border: none;
  border-radius: 0.7rem;
  color: var(--8-gray);
  padding-left: 2rem;
  &::placeholder {
    color: var(--5-gray);
  }
`

export const GapStyle = styled.div`
  margin-bottom: 2.3rem;
`

export const AddressBtn = styled.button`
  width: 10rem;
  height: 5rem;
  border: none;
  border-radius: 0.7rem;
  background-color: var(--3-gray);
  color: var(--10-gray);
  :hover {
    cursor: pointer;
  }
`

// 우편번호 넣는 칸 추가해야함..

export const QualityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.3rem;
  margin-right: 2rem;
`

export const QualityExplanation = styled.p`
  color: var(--6-gray);
`

export const TextAreaStyle = styled.textarea`
  width: 85.7rem;
  min-height: 19.6rem;
  resize: none;
  background-color: var(--3-gray);
  font-size: var(--fontSize-H6);
  border: none;
  border-radius: 0.7rem;
  color: var(--8-gray);
  padding: 2rem;
  &::-moz-input-placeholder {
    line-height: 2;
  }
  &::-webkit-input-placeholder {
    line-height: 2;
  }
  &::placeholder {
    color: var(--5-gray);
  }
`

export const TagsExplanation = styled.p`
  font-size: var(--fontSize-H5);
  color: var(--7-gray);
  line-height: 1.5;
`

export const CaveatBox = styled.div`
  background-color: var(--3-gray);
  border-radius: 1rem;
  padding: 3.5rem;
`

export const CaveatText = styled.p`
  color: var(--7-gray);
  line-height: 2;
  margin-bottom: 2.7rem;
`

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.2rem;
`

export const WriteBtn = styled.button`
  border: none;
  border-radius: 0.5rem;
  background-color: var(--opc-100);
  color: var(--2-gray);
  width: 10.3rem;
  height: 4.8rem;
  font-size: var(--fontSize-H4);
  font-weight: var(--fontWeight-bold);
  &:hover {
    cursor: pointer;
  }
`

// ProductsImage(사진 업로드)
export const UpLoadImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5rem;
  `

export const ImageWrapper = styled.div`
  width: 85.7rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  gap: 2rem;
`

export const ImageCard = styled.div`
  border-radius: 0.5rem;
  width: 18.5rem;
  height: 18.5rem;
  position: relative;
  :hover {
    cursor: pointer;
  }
`

export const Image = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  position: relative;
`

export const ImageDeleteBtn = styled.button`
  position: absolute;
`
// 사진 안으로 들어가도록 하고 꾸미기

export const UpLoadBox = styled.label`
  width: 18.5rem;
  height: 18.5rem;
  border-radius: 0.5rem;
  border: 0.1rem solid var(--opc-20);
  background-color: var(--opc-10);
  color: var(--opc-100);
  text-align: center;
  line-height: 11;
    &:hover {
    cursor: pointer;
  }
`
// 첫번째 사진만 테두리가 생기도록 조건부 걸어주기
// 대표사진 걸어놓기