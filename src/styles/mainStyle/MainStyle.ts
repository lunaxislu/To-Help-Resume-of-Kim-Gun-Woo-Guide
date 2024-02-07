import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StFadeAni } from '../../pages/chat/style';

export const HomeContainer = styled.section`
  display: flex;
  max-width: 144rem;
  min-height: 100vh;
  flex-direction: column;
  margin: auto;
  animation: ${StFadeAni} 0.3s ease;
  @media screen and (max-width: 768px) {
    width: 100%;
    //min-width: 32rem;
  }
`;

export const IsLoadingStyle = styled.div`
  height: 60rem;
  text-align: center;
  line-height: 20;
  font-size: var(--fontSize-H1);
  font-weight: var(--fontWeight-bold);
  @media screen and (max-width: 1116px) {
    height: 55rem;
  }
  @media screen and (max-width: 768px) {
    height: 47rem;
    font-size: var(--fontSize-H3);
    line-height: 20;
  }
`;

// 배너
export const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60rem;
  @media screen and (max-width: 1116px) {
    height: 55rem;
  }

  @media screen and (max-width: 768px) {
    height: 47rem;
  }
`;
export const MainBannerpic = styled.picture`
  width: 100%;
  max-height: 63rem;
  @media screen and (max-width: 768px) {
    height: 40rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
export const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10rem;
  @media screen and (max-width: 1116px) {
    gap: 3rem;
    top: 50%;
    left: 50%;
    transform: translate(-35%, -50%);
  }
  @media screen and (max-width: 768px) {
    gap: 1rem;
  }
`;
export const BannerWrapper = styled.div`
  width: 82%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  gap: 10rem;
  @media screen and (max-width: 1116px) {
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    width: 82%;
    height: 50%;
  }
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 60%;
  }
  @media screen and (max-width: 768px) {
    width: 85%;
  }
  @media screen and (max-width: 650px) {
    width: 90%;
  }
  @media screen and (max-width: 550px) {
    width: 100%;
  }
  @media screen and (max-width: 430px) {
    width: 120%;
  }
`;
export const ProductsBannerImage = styled.picture`
  width: 45%;
  height: 100%;

  @media screen and (max-width: 768px) {
    width: 50%;
  }
  @media screen and (max-width: 650px) {
    width: 55%;
  }
  @media screen and (max-width: 550px) {
    width: 70%;
  }
  @media screen and (max-width: 430px) {
    width: 60%;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
export const CommunityBannerImage = styled.picture`
  width: 53%;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 60%;
  }
  @media screen and (max-width: 650px) {
    width: 65%;
  }
  @media screen and (max-width: 550px) {
    width: 70%;
  }
  @media screen and (max-width: 430px) {
    width: 70%;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
export const ButtonImage = styled.img`
  width: 90%;
  height: 50%;

  @media screen and (max-width: 1116px) {
    width: 80%;
  }
  @media screen and (max-width: 800px) {
    width: 60%;
  }
  @media screen and (max-width: 650px) {
    //width: 40%;
  }
`;
export const ScrollButton = styled.a`
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: white;
  margin: auto;
`;
// 본문
export const AllCardContainer = styled.div`
  width: 77.5%;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 93%;
  }
`;
export const ContentsContainer = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 5rem;
  @media screen and (max-width: 768px) {
    margin-top: 3rem;
  }
`;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 4rem 0;
  width: 100%;
  font-size: var(--fontSize-H3);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
    margin: 0 auto 1rem 0;
  }
`;
export const Title = styled.h2`
  font-size: var(--fontSize-H3);
  font-weight: var(--fontWeight-bold);
  vertical-align: baseline;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
  }
`;
export const ShowLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  width: 8.3rem;
  height: 3.2rem;
  background: var(--opc-20);
  border-radius: 4.5rem;
  color: var(--black);
  font-size: var(--fontSize-H6);
  font-weight: var(--fontWeight-bold);
  cursor: pointer;
  @media screen and (max-width: 768px) {
    background: none;
    width: 6rem;
    font-size: 1.1rem;
    gap: 0.3rem;
  }
  &:hover {
    background-color: var(--opc-100);
    color: var(--bgColor);
  }
`;
