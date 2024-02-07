import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowDown } from 'react-icons/fa6';
import { FiArrowUp } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import CommunityList from '../../components/community/CommunityList';
import ProductsCard from '../../components/prducts/ProductsCard';
import ProductsSkeleton from '../../components/skeleton/ProductsSkeleton';
import SkeletonCommunityCard from '../../components/skeleton/SkeletonCommunityCard';
import { setSearchResults } from '../../redux/modules/searchSlice';
import { RootState } from '../../redux/store/store';
import Dropdown from '../../styles/searchresults/Dropdown';
import { ResearchResults, researchItems } from './researchItem';

interface ListCount {
  usedItemCount: number;
  communityCount: number;
}

type CommonItemProps = {
  id: number;
  image_url: string[]; // 이미지 배열로 가정
  quality: string;
  title: string;
  price: number;
};

const SearchResults: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showClickedList, setShowClickedList] = useState<boolean>(false);
  const { usedItemResults, communityResults } = useSelector(
    (state: RootState) => state.search.searchResults
  );
  const handleTabClick = (tab: string) => {
    if (tab === '중고물품') {
      setShowClickedList(false);
    } else if (tab === '커뮤니티') {
      setShowClickedList(true);
    }
  };
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clickMenu, setClickMenu] = useState('최신순');
  const [selectedTab, setSelectedTab] = useState<'중고물품' | '커뮤니티'>(
    '중고물품'
  );
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showAllCommunity, setShowAllCommunity] = useState(false);

  const handleToggleShowAllProducts = () => {
    setShowAllProducts(!showAllProducts);
  };
  const handleToggleShowAllCommunity = () => {
    setShowAllCommunity(!showAllCommunity);
  };

  const naviagate = useNavigate();

  const handleProductsSort = (sort: '최신순' | '인기순') => {
    setClickMenu(sort);
  };

  const newSearchQuery = new URLSearchParams(location.search).get('q') || '';

  const checkWindowSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // 정렬 함수
  const ProductsSortByLikes = <T extends { likes: number }>(list: T[]): T[] => {
    return [...list].sort((a, b) => b.likes - a.likes);
  };

  const CommunitySortByLikes = useCallback(
    <T extends { likes: number | null }>(list: T[]): T[] => {
      return [...list].sort((a, b) => {
        if (a.likes === null && b.likes !== null) {
          return 1;
        } else if (a.likes !== null && b.likes === null) {
          return -1;
        } else {
          return (b.likes || 0) - (a.likes || 0);
        }
      });
    },
    []
  );

  // 정렬된 결과
  const sortedUsedItemResults =
    clickMenu === '인기순'
      ? ProductsSortByLikes(usedItemResults)
      : usedItemResults;

  const sortedCommunityResults =
    clickMenu === '인기순'
      ? CommunitySortByLikes(communityResults)
      : communityResults;
  useEffect(() => {
    // 데이터의 개수가 5개 이하이면 showAllData를 false로 설정
    if (usedItemResults.length <= 5) {
      setShowAllProducts(false);
    }
  }, [usedItemResults]);
  useEffect(() => {
    checkWindowSize();
    window.removeEventListener('DOMContentLoaded', checkWindowSize);
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('DOMContentLoaded', checkWindowSize);
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!newSearchQuery.trim()) {
        return;
      }
      setIsLoading(true);
      const results: ResearchResults | undefined = await researchItems(
        newSearchQuery
      );
      if (!results) {
        console.error('수파베이스에 요청 중 실패:');
        return;
      }

      const { usedItemsWithImages, communityItemsWithImages } = results;

      dispatch(
        setSearchResults({
          usedItemResults: usedItemsWithImages || [],
          communityResults: communityItemsWithImages || []
        })
      );
      setIsLoading(false);
    }

    fetchData();
  }, [newSearchQuery, dispatch]);

  const usedItemCount = usedItemResults.length;
  const communityCount = communityResults.length;

  useEffect(() => {
    // 768px 이하에서 최초 렌더링 시에는 ProductsCount가 디폴트
    if (window.innerWidth <= 768) {
      if (usedItemCount === 0 && communityCount !== 0) {
        setSelectedTab('중고물품');
      } else {
        setSelectedTab('커뮤니티');
      }
    }
  }, [usedItemCount, communityCount]);

  const handleText = useCallback((content: string): string => {
    const textOnly = content.replace(/<[^>]*>|&nbsp;/g, ' ');
    return textOnly;
  }, []);
  const slicedCommunityResults = communityResults.slice(
    0,
    showAllCommunity ? sortedCommunityResults.length : 6
  );

  // productsCard map 돌리기 위한 변수 선언(하빈 추가)
  const productsData = sortedUsedItemResults?.slice(
    0,
    showAllProducts ? sortedUsedItemResults.length : 5
  );

  return (
    <>
      <SearchResultsContainer>
        <SearchResultsCountContainer>
          <CheckImage src="/assets/checkcheck.svg" alt="검색결과" />
          <FullCounts>
            {isLoading
              ? '검색 중...'
              : usedItemCount === 0 && communityCount === 0
              ? '해당 검색어에 대한 결과를 찾을 수 없어요'
              : `${usedItemCount + communityCount}개의 결과가 검색되었어요`}
          </FullCounts>
        </SearchResultsCountContainer>
        <ResultListContainer>
          <UsedItemResultsContainer>
            {/* TAB */}
            {isMobile ? (
              <CountBar>
                <CountPost>
                  <ProductsCount
                    showClickedList={showClickedList}
                    onClick={() => handleTabClick('중고물품')}
                  >
                    중고거래({usedItemCount})
                  </ProductsCount>
                  <CommunityCount
                    showClickedList={showClickedList}
                    onClick={() => {
                      handleTabClick('커뮤니티');
                    }}
                  >
                    커뮤니티({communityCount})
                  </CommunityCount>
                </CountPost>
                <Dropdown
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  clickMenu={clickMenu}
                  setClickMenu={setClickMenu}
                />
              </CountBar>
            ) : (
              // 데스크탑
              <CountBar>
                <CountList>
                  {usedItemCount}개의 상품이 거래되고 있어요
                </CountList>
                <LinktoUsedProducts
                  onClick={handleToggleShowAllProducts}
                  style={{
                    display:
                      usedItemResults.length <= 5 && !showAllProducts
                        ? 'none'
                        : 'flex'
                  }}
                >
                  {showAllProducts ? <p>숨기기</p> : <p>전체보기</p>}

                  {showAllProducts ? <FiArrowUp /> : <FaArrowDown />}
                </LinktoUsedProducts>
              </CountBar>
            )}
            {/* 검색 결과 */}
            {isMobile && !showClickedList && (
              <ProductsCard posts={sortedUsedItemResults} />
            )}{' '}
            {!isMobile && (
              // 중고 데스크탑
              <ProductsProtecter>
                {/* productsCard 컴포넌트 props넘기기 */}

                {isLoading ? (
                  <ProductsSkeleton count={5} />
                ) : (
                  <ProductsCard posts={productsData} />
                )}
              </ProductsProtecter>
            )}
          </UsedItemResultsContainer>

          {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* 커뮤니티 */}
          <CommunityResultsContainer showClickedList={showClickedList}>
            <CommunityTitle showClickedList={showClickedList}>
              <CountList>{communityCount}개의 이야기가 있어요</CountList>
              <LinktoCommunityPosts
                onClick={handleToggleShowAllCommunity}
                style={{
                  display: communityResults.length <= 6 ? 'none' : 'flex'
                }}
              >
                {showAllCommunity ? <p>숨기기</p> : <p>전체보기</p>}

                {showAllCommunity ? <FiArrowUp /> : <FaArrowDown />}
              </LinktoCommunityPosts>
            </CommunityTitle>
            {/* 커뮤니티 모바일 */}
            {isMobile && showClickedList && (
              <CommunityList posts={sortedCommunityResults} />
            )}
            {!isMobile &&
              (isLoading ? (
                // 커뮤니티 데스크탑
                <SkeletonCommunityCard cards={6} />
              ) : (
                <CommunityList posts={slicedCommunityResults} />
              ))}
          </CommunityResultsContainer>
        </ResultListContainer>
      </SearchResultsContainer>
    </>
  );
};

export default SearchResults;

const SearchResultsContainer = styled.div`
  display: flex;
  max-width: 144rem;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  margin-bottom: 15rem;
  /* @media screen and (max-width: 1300px) {
    width: 100%;
    max-width: 130rem;
  }
  @media screen and (max-width: 1100px) {
    width: 100%;
    max-width: 110rem;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    max-width: 90rem;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 76.8rem;
    min-width: 32rem;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
    max-width: 53rem;
    min-width: 32rem;
  }
  @media screen and (max-width: 349px) {
    width: 100%;
    max-width: 34.9rem;
    min-width: 32rem;
  } */
`;

const SearchResultsCountContainer = styled.div`
  margin: 0 auto;
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-top: 2rem;
  }
`;
const CheckImage = styled.img`
  margin: 0 auto;
  width: 6.6rem;
  height: 6.6rem;
  @media screen and (max-width: 768px) {
    width: 4.4rem;
    height: 4.4rem;
  }
`;
const FullCounts = styled.div`
  margin-top: 2rem;
  font-size: var(--fontSize-H1);
  font-weight: var(--fontWeight-bold);
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H4);
  }
`;
const ResultListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #717171;
  margin: 0 auto;
  margin-top: 3rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 2rem;
    border-top: none;
  }
`;

const ProductsProtecter = styled.div`
  margin-top: 2rem;
`;

const UsedItemResultsContainer = styled.div`
  margin-top: 2rem;
  width: 77.5%;
  margin: 0 auto;
  margin-bottom: 4rem;
  @media screen and (max-width: 768px) {
    width: 93%;
    min-width: 32rem;
    margin-top: 2rem;
  }
`;
const CountBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 0 1.5rem;
  @media screen and (max-width: 768px) {
    padding: 0 1.5rem;
    margin-top: '';
  }
`;
const CountPost = styled.div`
  display: flex;
  width: 100%;
  font-size: var(--fontSize-H3);
  align-items: center;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    gap: 1rem;
    font-size: var(--fontSize-H5);
  }
`;

const ProductsCount = styled.h1<{
  showClickedList: boolean;
}>`
  width: 10rem;
  cursor: pointer;
  font-weight: ${({ showClickedList }) =>
    !showClickedList ? 'var(--fontWeight-bold)' : 'var(--fontWeight-medium)'};
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const CommunityCount = styled.h1<{
  showClickedList: boolean;
}>`
  width: 10rem;
  cursor: pointer;
  font-weight: ${({ showClickedList }) =>
    showClickedList ? 'var(--fontWeight-bold)' : 'var(--fontWeight-medium)'};
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CountList = styled.h1`
  display: flex;
  font-size: var(--fontSize-H3);
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: var(--fontSize-H5);
  }
`;
const LinktoUsedProducts = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8.3rem;
  height: 3.2rem;
  text-decoration: none;

  cursor: pointer;
  font-weight: var(--fontWeight-bold);
  gap: 0.8rem;
  background: var(--opc-20);
  border-radius: 4.5rem;
  font-size: var(--fontSize-H6);
  font-weight: var(--fontWeight-medium);
  color: var(--11-gray);
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
  svg {
    width: 1rem;
    height: 0.9rem;
    @media screen and (max-width: 768px) {
      width: 1rem;
      height: 0.9rem;
      color: var(--opc-100);
    }
  }
`;
const UsedItemsList = styled.ul<{
  usedItemCount: number;
  showClickedList: boolean;
}>`
  width: 100%;

  max-height: 100vh;
  display: grid;
  margin: auto;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 2rem;
  row-gap: 1.5rem;
  column-gap: 1.8rem;
  align-items: flex-start;
  justify-content: center;
  place-items: center;
  margin-top: 2rem;

  @media screen and (max-width: 1160px) {
    grid-template-columns: repeat(4, 1fr);
    margin-top: ${({ usedItemCount }) =>
      usedItemCount !== 0 ? '5rem' : '2rem'};
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    margin-top: ${({ usedItemCount }) => (usedItemCount !== 0 ? '5rem' : '')};
  }

  @media screen and (max-width: 768px) {
    column-gap: 1.5rem;
    row-gap: 1.8rem;
    grid-template-columns: repeat(3, 1fr);
    margin-top: ${({ usedItemCount }) => (usedItemCount !== 0 ? '3rem' : '')};
  }
  @media screen and (max-width: 670px) {
    column-gap: 1.5rem;
    row-gap: 1.8rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: ${({ usedItemCount }) => (usedItemCount !== 0 ? '2rem' : '')};
  }
  @media screen and (max-width: 520px) {
    row-gap: 1.8rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: ${({ usedItemCount }) => (usedItemCount !== 0 ? '2rem' : '')};
  }

  @media screen and (max-width: 349px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top: ${({ usedItemCount }) => (usedItemCount !== 0 ? '2rem' : '')};
  }
`;
const ToProductsPage = styled.div`
  text-decoration: none;
  cursor: pointer;
  color: var(--11-gray);
`;
const ProductList = styled.li`
  width: 20.8rem;
  /* height: 31.5rem; */
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 520px) {
    width: 100%;
  }
  div {
    width: 20.8rem;
    height: 20.8rem;
    object-fit: cover;
    justify-content: center;
    border-radius: 0.6rem;
    @media screen and (max-width: 768px) {
      width: 14rem;
      height: 14rem;
      margin-bottom: 1rem;
    }
  }

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    border-radius: 0.6rem;
    border-style: none;
    @media screen and (max-width: 768px) {
      width: 14rem;
      height: 14rem;
      border-radius: 0.6rem;
    }
  }

  h3 {
    font-size: var(--fontSize-body);
    color: var(--11-gray);
    margin-top: 1rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
    overflow: hidden;
    height: 2.5rem;
    white-space: wrap;
    text-overflow: ellipsis;
    line-height: 1.5;
    @media screen and (max-width: 768px) {
      width: 14rem;
      height: 2rem;
      margin-top: 0.6rem;
      color: var(--11-gray, #f8f8f8);
      font-weight: var(--fontWeight-medium);
      font-size: var(--fontSize-H5);
    }
  }

  p {
    font-size: var(--fontSize-body);
    font-weight: var(--fontWeight-bold);
    color: var(--11-gray);
    margin-top: 1rem;
    text-align: left;
    @media screen and (max-width: 768px) {
      height: 2.3rem;
      font-weight: var(--fontWeight-bold);
      font-size: var(--fontSize-H5);
    }
  }
`;

interface QualityProps {
  $quality: string;
}

const ProductsCardQuality = styled.h1<QualityProps>`
  width: 9rem;
  padding: 0 0.8rem;
  text-align: center;
  line-height: 1.7;
  border-radius: 0.3rem;
  margin-top: 1rem;
  background-color: #fcfcfc;

  color: var(--2-gray);
  margin-bottom: 0.6rem;
  font-size: var(--fontSize-H6);
  // 배경색 조건부 렌더링
  ${(props) => {
    if (props.children === '새상품(미사용)') {
      return css`
        background-color: var(--opc-100);
        color: var(--2-gray);
      `;
    }
    if (props.children === '고장/파손 상품') {
      return css`
        background-color: var(--4-gray);
        color: var(--11-gray);
      `;
    }
  }}
  @media screen and (max-width: 768px) {
    margin-top: 1rem;
    width: 8rem;
    height: 2rem;
    font-size: 1rem;
    font-weight: 500;
    line-height: 191.2%;
    text-align: center;
  }
`;

const CommunityResultsContainer = styled.div<{
  showClickedList: boolean;
}>`
  width: 77.5%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 8rem;
  @media screen and (max-width: 768px) {
    width: 93%;
    margin-bottom: ${({ showClickedList }) => (showClickedList ? 0 : '2rem')};
    padding: 0 1rem;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
    margin-top: 0;
    padding: 0 1rem;
  }
  @media screen and (max-width: 349px) {
    width: 100%;

    margin-top: 0;
    padding: 0 1rem;
  }
`;
const CommunityTitle = styled.div<{
  showClickedList: boolean;
}>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 2.2rem;
  padding: 0 1.5rem;
  @media screen and (max-width: 768px) {
    display: none;
    margin-bottom: 1rem;
    padding: '';
  }
  @media screen and (max-width: 530px) {
    display: none;
    margin-bottom: 1rem;
    padding: '';
  }
  @media screen and (max-width: 349px) {
    display: none;
    margin-bottom: 1rem;
    padding: '';
  }
`;
const LinktoCommunityPosts = styled.div`
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8.3rem;
  height: 3.2rem;
  text-decoration: none;
  cursor: pointer;
  font-weight: var(--fontWeight-bold);
  gap: 0.8rem;
  background: var(--opc-20);
  border-radius: 4.5rem;
  font-size: var(--fontSize-H6);
  font-weight: var(--fontWeight-medium);
  color: var(--11-gray);
  @media screen and (max-width: 768px) {
    display: flex;
    background: none;
    width: 6rem;
    font-size: 1.1rem;
    gap: 0.3rem;
  }
  &:hover {
    background-color: var(--opc-100);
    color: var(--bgColor);
  }
  svg {
    width: 1rem;
    height: 0.9rem;
    @media screen and (max-width: 768px) {
      width: 9px;
      height: 8px;
      color: var(--opc-100);
    }
  }
`;
const CommunityPostsList = styled.ul`
  width: 100%;
  margin-top: 2.2rem;
  background-color: transparent;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 0 auto;
    /* margin-top */
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  @media screen and (max-width: 520px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;
const ToCommunityPage = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: var(--11-gray);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const PostList = styled.li`
  width: 54.6rem;
  height: 19.5rem;
  display: inline-block;
  position: relative;
  align-items: center;
  border-radius: 1rem;
  background-color: var(--3-gray);
  padding: 2rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
  @media screen and (max-width: 520px) {
    width: 100%;
    padding: 1rem;
  }
  .nopicture {
    width: 6.6rem;
    height: 6.6rem;
    object-fit: cover;
    @media screen and (max-width: 768px) {
      width: 4rem;
      height: 4rem;
    }
  }
  .commupic {
    display: flex;
    gap: 1.2rem;
    @media screen and (max-width: 768px) {
    }
  }
  .commucontent {
    /* margin-left: 1.5rem; */
    /* margin-bottom: 3rem; */
    /* gap: 10px; */
  }
  .community-pic {
    width: 6.6rem;
    height: 6.6rem;
    object-fit: cover;
    @media screen and (max-width: 768px) {
      width: 4rem;
      height: 4rem;
    }
  }
  h3 {
    color: var(--11-gray);
    font-size: var(--fontSize-H4);
    margin-bottom: 1.6rem;
    font-weight: var(--fontWeight-bold);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 48rem;
    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      font-size: var(--fontSize-H5);
      font-weight: var(--fontWeight-bold);
      width: 20rem;
    }
  }

  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: normal;
    overflow: hidden;
    font-size: var(--fontSize-H4);
    font-weight: var(--fontWeight-medium);
    color: var(--8-gray);
    height: 6.6rem;
    line-height: 1.2;

    @media screen and (max-width: 768px) {
      font-size: var(--fontSize-H6);
      -webkit-line-clamp: 2;
      line-height: 1.92;
      height: 4rem;
    }
  }

  .thumbs {
    position: absolute;
    bottom: 1.5rem;
    left: 3.5rem;
    width: 2rem;
    height: 2rem;
    @media screen and (max-width: 768px) {
      width: 1.3rem;
      height: 1.2rem;
      left: 3rem;
      bottom: 1.5rem;
    }
  }
  .likescount {
    position: absolute;
    text-decoration: none;
    bottom: 1.5rem;
    left: 7rem;
    color: var(--6, #717171);
    @media screen and (max-width: 768px) {
      font-size: 1.1rem;
      left: 5.5rem;
    }
  }
  .commentss {
    position: absolute;
    bottom: 1.5rem;
    left: 12rem;
    width: 2rem;
    height: 2rem;
    @media screen and (max-width: 768px) {
      width: 1.3rem;
      height: 1.2rem;
      left: 8.5rem;
      bottom: 1.5rem;
    }
  }

  span {
    position: absolute;
    text-decoration: none;
    bottom: 1.5rem;
    left: 15rem;
    color: var(--6, #717171);
    @media screen and (max-width: 768px) {
      font-size: 1.1rem;
      left: 11rem;
    }
  }
  h4 {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    color: var(--6, #717171);
    font-size: var(--fontSize-H6);
    @media screen and (max-width: 768px) {
      font-size: 1rem;
      right: 1.5rem;
    }
  }
`;
