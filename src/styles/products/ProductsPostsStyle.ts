import { CgCloseO } from "react-icons/cg";
import { GoChevronLeft } from "react-icons/go";
import { GoInfo } from 'react-icons/go';
import styled from "styled-components";
import { StFadeAni } from "../../pages/productsDetail/style";

// ProductsPosts
export const EntireContainer = styled.div`
  max-width: 144rem;
  display: flex;
  margin: auto;
  animation: ${StFadeAni} 0.3s ease;
  @media screen and (max-width: 768px) {
    max-width: 76.8rem;
    min-width: 3.5rem;
  }
`;
export const ContentsContainer = styled.div`
  max-width: 111.6rem;
  margin: auto;
  @media screen and (max-width: 1180px) {
    max-width: 93%;
  }
`;
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
export const Hr = styled.hr`
  width: 100%;
  height: 0.1rem;
  border: none;
  background-color: var(--6-gray);
  margin-bottom: 2rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4.2rem;
  margin-bottom: 2rem;
  @media screen and (max-width: 768px) {
    max-width: 76.8rem;
    margin-top: 0.6rem;
    margin-bottom: 0.8rem;
  }
`;
export const Title = styled.h1`
  font-size: var(--fontSize-H2);
  margin-right: 1.7rem;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
    margin-right: 1rem;
  }
`;
export const TetleRequired = styled.p`
  color: var(--opc-100);
  font-size: var(--fontSize-H6);
  line-height: 200%;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

// ProductsImage(사진 업로드)
export const UpLoadImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5rem;
  gap: 3.2rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 1.6rem;
    flex-direction: column;
    gap: 0rem;
  }
`;
export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  gap: 2rem;
  @media screen and (max-width: 768px) {
    gap: 1rem;
  }
`;
export const ImageCard = styled.div`
  border-radius: 0.5rem;
  width: 18.5rem;
  height: 18.5rem;
  display: flex;
  flex-direction: row-reverse;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 9rem;
    height: 9rem;
  }
`;
export const Image = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`;
export const ImageOrderWrapper = styled.div`
  border: 0.15rem solid var(--opc-100);
  width: 18.5rem;
  height: 18.5rem;
  border-radius: 0.5rem;
  padding: 1.2rem 0 0 1.2rem;
  position: absolute;
  @media screen and (max-width: 768px) {
    width: 9rem;
    height: 9rem;
    padding: 0.6rem 0 0 0.6rem;
  }
`;
export const ImageOrder = styled.div`
  width: 4.9rem;
  height: 1.9rem;
  border-radius: 0.4rem;
  background-color: var(--opc-80);
  color: var(--1-gray);
  text-align: center;
  line-height: 2;
  font-size: 1rem;
  font-weight: var(--fontWeight-semiBold);
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 2.4rem;
    height: 0.9rem;
    border-radius: 0.3rem;
    line-height: 1.4;
    font-size: 0.6rem;
  }
`;
export const ImgCount = styled.span`
  height: 100%;
  margin-left: 2rem;
  color: var(--7-gray);
  font-size: var(--fontSize-H6);
  line-height: 2.7;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-left: 0.6rem;
  }
`;
export const ImageDeleteBtn = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  position: absolute;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 1rem;
    height: 1rem;
  }
`;
export const ImageDeleteIcon = styled(CgCloseO)`
  width: 100%;
  height: 100%;
  color: var(--5-gray);
  position: absolute;
`;
export const UpLoadBox = styled.label`
  width: 18.5rem;
  height: 18.5rem;
  border-radius: 0.5rem;
  border: 0.1rem solid var(--opc-20);
  background-color: var(--opc-10);
  color: var(--opc-100);
  font-size: 5rem;
  text-align: center;
  line-height: 3.5;
  position: relative;
    &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 9rem;
    height: 9rem;
    font-size: 2rem;
    line-height: 4.1;
  }
`;

// ProductsWriteForm
export const WrapperStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const SemiTitle = styled.h2`
  width: 18.8rem;
  display: flex;
  flex-direction: row;
  line-height: 2;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
    line-height: 1.5;
    margin-bottom: 0.9rem;
  }
`;
export const Required = styled.p`
  color: var(--opc-100);
  font-size: var(--fontSize-H6);
  line-height: 2.5;
  margin-left: 0.3rem;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
    line-height: 1.5;
  }
`;
export const InputStyle = styled.input`
  width: 80%;
  height: 5rem;
  background-color: var(--3-gray);
  font-family: 'Pretendard-Medium';
  font-size: var(--fontSize-H5);
  border: none;
  border-radius: 0.7rem;
  color: var(--12-gray);
  padding-left: 2rem;
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  /* Firefox */
  /* &input[type=number] {
    -moz-appearance: textfield;
  } */
  &::placeholder {
    color: var(--5-gray);
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 3rem;
    font-size: var(--fontSize-H6);
    border-radius: 0.6rem;
    color: var(--12-gray);
    padding-left: 1rem;
    &::placeholder {
      color: var(--5-gray);
    }
  }
`;
export const InputWrapperStyle = styled.div`
  width: 87%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const InputStyle2 = styled.input`
  width: 100%;
  height: 5rem;
  background-color: var(--3-gray);
  font-family: 'Pretendard-Medium';
  font-size: var(--fontSize-H5);
  border: none;
  border-radius: 0.7rem;
  color: var(--12-gray);
  padding-left: 2rem;
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  /* Firefox */
  /* &input[type=number] {
    -moz-appearance: textfield;
  } */
  &::placeholder {
    color: var(--5-gray);
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 3rem;
    font-size: var(--fontSize-H6);
    border-radius: 0.6rem;
    color: var(--12-gray);
    padding-left: 1rem;
    &::placeholder {
      color: var(--5-gray);
    }
  }
`;
export const MobileTextValidationWrapper = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.6rem;
  }
`;
export const MobileTitleCount = styled.span`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    color: var(--7-gray);
    font-size: var(--fontSize-H6);
    height: 100%;
    margin: 0.5rem 0 0 auto;
    font-size: 1rem;
    line-height: 1;
  }
`;
export const MobileTextValidation = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1rem;
    font-weight: var(--fontWeight-regular);
    height: 1rem;
    padding: 0.5rem 0 0 0;
  }
`;
export const TitleCount = styled.span`
  height: 100%;
  margin-left: 2rem;
  color: var(--7-gray);
  font-size: var(--fontSize-H6);
  line-height: 4;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const TextValidation = styled.div`
  display: flex;
  flex-direction: column;
  height: 5rem;
  padding: 1rem 0 0 19rem;
    @media screen and (max-width: 1240px) {
    padding: 1rem 0 0 18rem;
  }
  @media screen and (max-width: 950px) {
    padding: 1rem 0 0 17rem;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const ValidationText = styled.p`
  color: #EA4949;
  line-height: 1.8;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;
export const MobileWrapperStyle = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 3rem;
  }
`;
export const CategoryContainer = styled.div`
  height: 8rem;
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2.2rem;
  @media screen and (max-width: 940px) {
    height: 12rem;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  @media screen and (max-width: 768px) {
    height: 6rem;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }
  @media screen and (max-width: 520px) {
    height: 9rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  `;
export const InputCheckBoxLabel = styled.label`
  color: var(--11-gray);
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
  }
`;
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
  margin-left: 0rem;
  @media screen and (max-width: 768px) {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 0.5rem;
    margin-left: 0.7rem;
  }
  /* 체크 표시 스타일 */
  &:checked:before {
    content: '✔';
    position: absolute;
    top: 40%;
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
  gap: 2rem;
  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`;
export const RowValidation = styled.div`
  display: flex;
  flex-direction: row;
  height: 5rem;
  padding: 1rem 0 0 19rem;
  gap: 1rem;
  @media screen and (max-width: 1240px) {
    padding: 1rem 0 0 18rem;
  }
  @media screen and (max-width: 950px) {
    padding: 1rem 0 0 17rem;
  }
  @media screen and (max-width: 768px) {
    height: 3rem;
    padding: 0.5rem 0 0 0;
    gap: 0.5rem;
  }
`;
export const MobileDealTypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;
export const Validation = styled.div`
  display: flex;
  flex-direction: column;
  height: 5rem;
  padding: 1rem 0 0 19rem;
  @media screen and (max-width: 1240px) {
    padding: 1rem 0 0 18rem;
  }
  @media screen and (max-width: 950px) {
    padding: 1rem 0 0 17rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    font-weight: var(--fontWeight-regular);
    height: 1rem;
    padding: 0.5rem 0 0 0;
  }
`;
export const AddressBtn = styled.button`
  width: 10rem;
  height: 5rem;
  border: none;
  border-radius: 0.7rem;
  background-color: var(--3-gray);
  font-family: 'Pretendard-Medium';
  color: var(--10-gray);
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H6);
    width: 6.8rem;
    height: 3rem;
    border-radius: 0.6rem;
  }
`;
// 우편번호 넣는 칸 추가해야함..
export const AddressInputStyle = styled.input`
  width: 50%;
  height: 5rem;
  background-color: var(--3-gray);
  font-size: var(--fontSize-H5);
  font-family: 'Pretendard-Medium';
  border: none;
  border-radius: 0.7rem;
  color: var(--8-gray);
  padding-left: 2rem;
  &::placeholder {
    color: var(--5-gray);
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 3rem;
    padding-left: 1rem;
    font-size: var(--fontSize-H6);
  }
`;
export const GapStyle = styled.div`
  margin-bottom: 2.3rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 0.6rem;
  }
`;
export const GapStyle2 = styled.div`
  margin-bottom: 5rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;
export const QualityWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr 3fr);
  gap: 2.3rem;
  margin-right: 2rem;
  @media screen and (max-width: 910px) {
    grid-template-columns: repeat(1, 1fr 2fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin-right: 0.7rem;
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const QualityExplanation = styled.p`
  color: var(--6-gray);
  padding: 0.6rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const ChangableSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-bottom: 3rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;
export const TextAreaStyle = styled.textarea`
  width: 94%;
  height: 19.6rem;
  resize: none;
  background-color: var(--3-gray);
  font-size: var(--fontSize-H5);
  border: none;
  border-radius: 0.7rem;
  color: var(--12-gray);
  padding: 2rem;
  font-family: 'Pretendard-Medium';
  overflow: hidden;
  &::-moz-input-placeholder {
    line-height: 2;
  }
  &::-webkit-input-placeholder {
    line-height: 2;
  }
  &::placeholder {
    color: var(--5-gray);
  }
  @media screen and (max-width: 1130px) {
    width: 92%;
  }
  @media screen and (max-width: 890px) {
    width: 90%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: var(--fontSize-H6);
  }
`;
export const CountWrapper = styled.div`
  align-items: end;
`;
export const ContentsCount = styled.span`
  height: 100%;
  margin-left: 1rem;
  color: var(--7-gray);
  font-size: var(--fontSize-H6);
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const MobileTextAreaWrapperStyle = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const TagsExplanation = styled.p`
  font-size: var(--fontSize-H5);
  color: var(--7-gray);
  line-height: 1.5;
  margin-top: 0.7rem;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    gap: 0.4rem;
    line-height: 1.5;
  }
`;
export const CaveatBox = styled.div`
  background-color: var(--3-gray);
  border-radius: 1rem;
  padding: 3.5rem;
  @media screen and (max-width: 768px) {
    padding: 1.7rem;
  }
`;
export const CaveatText = styled.p`
  color: var(--7-gray);
  line-height: 2;
  margin-bottom: 2.7rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 2.2rem;
    font-size: 1rem;
  }
`;
export const TagsInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
export const TagsValidation = styled.div`
  display: flex;
  flex-direction: column;
  height: 5rem;
  padding: 1rem 0 0 19rem;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    font-weight: var(--fontWeight-regular);
    height: 3rem;
    padding: 0.5rem 0 0 0;
  }
`;
export const AgreementCheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`
export const AgreementCheckBoxStyle = styled.input`
  appearance: none;
  width: 2.8rem;
  height: 2.8rem;
  background-color: var(--5-gray);
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
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: var(--fontSize-H5);
    color: var(--opc-100);
  }
  @media screen and (max-width: 768px) {
    width: 2.2rem;
    height: 2.2rem;
  }
`;
export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.2rem;
`;
export const WriteBtn = styled.button`
  border: none;
  border-radius: 0.5rem;
  background-color: var(--opc-100);
  color: var(--2-gray);
  width: 10.3rem;
  height: 4.8rem;
  font-size: var(--fontSize-H4);
  font-weight: var(--fontWeight-bold);
  font-family: 'Pretendard-Medium';
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 6.5rem;
    height: 3rem;
    font-size: var(--fontSize-H5);
  }
`;

export const QualityInfoWrapper = styled.div`
  max-width: 29.7rem;
  height: 22.4rem;
  border-radius: 1rem;
  border: 0.1rem solid rgba(204, 255, 0, 0.50);
  background-color: var(--3-gray);
  padding: 1.4rem;
  position: absolute;
  margin-top: 2rem;
  z-index: 1;
`;
export const QualityDetail = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr 2fr);
  p {
    color: var(--12-gray);
    font-size: var(--fontSize-H6);
    margin-top: 0.2rem;
  }
  span {
    color: var(--7-gray);
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;
export const QualityInfoBtn = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    margin-left: auto;
    width: 1.6rem;
    height: 1.6rem;
    :hover {
      cursor: pointer;
    }
  }
  `;
  export const QualityInfoIcon = styled(GoInfo)`
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
      width: 100%;
      height: 100%;
      color: var(--opc-100);
      :hover { 
        cursor: pointer;
      }
    }
  `;