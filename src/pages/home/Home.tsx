import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
import { useQuery } from 'react-query';
import { fetchData } from '../../components/main/DataFetch';
import { Link, useNavigate } from 'react-router-dom';
import InfiniteCarousel from '../../components/slider/InfiniteCarousel';
import parseDate from '../../util/getDate';
import { FaArrowRight } from 'react-icons/fa6';
import { StFadeAni } from '../../pages/productsDetail/style';
import * as St from '../../styles/products/productsList/StProductsList';
import CommunityList from '../../components/community/CommunityList';
import { Posts } from '../../styles/community/CommunityListStyle';
import ProductsCard from '../../components/prducts/ProductsCard';
import SkeletonCommunityCard from '../../components/skeleton/SkeletonCommunityCard';
import ProductsSkeleton from '../../components/skeleton/ProductsSkeleton';
import { Post } from '../community/api/model';
type UsedItemsCountData = {
  count: number | null;
  data: {
    length: number;
  } | null;
};
const Home = () => {
  const navigate = useNavigate();

  const carouselImages: string[] = [
    process.env.PUBLIC_URL + '/assets/bannerMain.jpg',
    process.env.PUBLIC_URL + '/assets/carousel0.png',
    process.env.PUBLIC_URL + '/assets/carousel1.png',
    process.env.PUBLIC_URL + '/assets/carousel2.png',
    process.env.PUBLIC_URL + '/assets/carousel3.png'
  ];
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // 처음 홈화면이 로딩되었을때 현 사용자의 ID를 가져와 로컬스토리지에 담는 로직 시작 (중감자동무)//
  const getUserId = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data && data.user) {
      localStorage.setItem('userId', data.user.id);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);
  // 처음 홈화면이 로딩되었을때 현 사용자의 ID를 가져와 로컬스토리지에 담는 로직 시작 끝 (중감자동무)//

  // 전체 데이터 개수를 가져오는 쿼리

  // 중고게시물 전체 데이터 개수를 가져오는 쿼리
  const {
    data: usedItemsCountData,
    isLoading: usedItemsCountLoading,
    isError: usedItemsCountError
  } = useQuery<UsedItemsCountData>('usedItemsCount', async () => {
    const count = await supabase.from('products').select('*');
    return count;
  });

  const {
    data: { usedItems = [], communityItems = [] } = {},
    isLoading,
    isError
  } = useQuery('data', fetchData);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오기를 실패했습니다.</div>;
  }

  const handleText = (content: string): string => {
    // 정규 표현식을 사용하여 태그를 제외한 텍스트만 추출
    const textOnly = content.replace(/<[^>]*>|&nbsp;/g, ' ');
    return textOnly;
  };

  const scrollToSection = (height: number) => {
    window.scrollTo({ top: height, behavior: 'smooth' });
  };

  // 중고목록 map 돌리기 위한 변수 선언(하빈 추가)
  const productsPosts = usedItems.slice(0, isMobile ? 6 : 10);

  // 커뮤니티 목록 좋아요 순 정렬

  const CommunitySortByLikes = <T extends { likes: number | null }>(
    list: T[]
  ): T[] => {
    return [...list].sort((a, b) => {
      if (a.likes === null && b.likes !== null) {
        return 1;
      } else if (a.likes !== null && b.likes === null) {
        return -1;
      } else {
        return (b.likes || 0) - (a.likes || 0);
      }
    });
  };
  const sortedCommunityResults: Post[] = CommunitySortByLikes(communityItems);

  return (
    <HomeContainer>
      <BannerContainer>
        <MainBannerpic src="/assets/mainbannerpicture.png" alt="메인배너사진" />

        <ButtonContainer>
          <BannerWrapper>
            <ProductsBannerImage src="/assets/중고거래.svg" alt="중고거래" />
            <ScrollButton href="#product">
              <ButtonImage src="/assets/중고거래버튼.svg" alt="중고거래버튼" />
            </ScrollButton>
          </BannerWrapper>
          <BannerWrapper>
            <CommunityBannerImage src="/assets/커뮤니티.svg" alt="커뮤니티" />
            <ScrollButton href="#community">
              <ButtonImage src="/assets/커뮤버튼.svg" alt="커뮤니티버튼" />
            </ScrollButton>
          </BannerWrapper>
        </ButtonContainer>
      </BannerContainer>

      <AllCardContainer>
        <ContentsContainer id="product">
          <TitleWrapper>
            <Title>
              {usedItemsCountData?.data?.length}개의 물품이 거래되고 있어요!
            </Title>
            <ShowLink to="/products">
              전체보기
              <FaArrowRight />
            </ShowLink>
          </TitleWrapper>
          {/* 하빈 수정 */}
          {isLoading ? (
            <ProductsSkeleton count={10} />
          ) : (
            <ProductsCard posts={productsPosts} />
          )}
        </ContentsContainer>

        <ContentsContainer id="community">
          <TitleWrapper>
            <Title>작업자들의 커뮤니티에 함께해볼까요?</Title>
            <ShowLink to="/community">
              전체보기
              <FaArrowRight />
            </ShowLink>
          </TitleWrapper>
          {/* <ComunityWrapper></ComunityWrapper> */}
          {isLoading ? (
            <SkeletonCommunityCard cards={6} />
          ) : (
            <CommunityList posts={sortedCommunityResults} />
          )}
        </ContentsContainer>
      </AllCardContainer>
    </HomeContainer>
  );
};
export default Home;

const HomeContainer = styled.section`
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
// 배너
const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  @media screen and (max-width: 768px) {
    height: 40rem;
  }
`;
const MainBannerpic = styled.img`
  width: 100%;
  max-height: 63rem;
  @media screen and (max-width: 768px) {
    height: 40rem;
  }
`;
const ButtonContainer = styled.div`
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
const BannerWrapper = styled.div`
  width: 82%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  gap: 10rem;
  @media screen and (max-width: 1116px) {
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    width: 93%;
    height: 55%;
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
const ProductsBannerImage = styled.img`
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
`;
const CommunityBannerImage = styled.img`
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
`;
const ButtonImage = styled.img`
  width: 90%;
  height: 50%;

  @media screen and (max-width: 1116px) {
    width: 80%;
  }
  @media screen and (max-width: 800px) {
    width: 50%;
  }
  @media screen and (max-width: 650px) {
    //width: 40%;
  }
`;
const ScrollButton = styled.a`
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: white;
  margin: auto;
`;
// 본문
const AllCardContainer = styled.div`
  width: 77.5%;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 93%;
  }
`;
const ContentsContainer = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 5rem;
  @media screen and (max-width: 768px) {
    margin-top: 2rem;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 4rem 0;
  width: 100%;
  font-size: var(--fontSize-H3);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
    margin: 0 auto 2rem 0;
  }
`;
const Title = styled.h2`
  font-size: var(--fontSize-H3);
  vertical-align: baseline;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
  }
`;
const ShowLink = styled(Link)`
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
