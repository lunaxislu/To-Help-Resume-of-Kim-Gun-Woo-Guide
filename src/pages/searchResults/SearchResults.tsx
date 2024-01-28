import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import styled from 'styled-components';
import parseDate from '../../util/getDate';
import { setSearchResults } from '../../redux/modules/searchSlice';
import { FaArrowRight } from 'react-icons/fa';
import { researchItems, ResearchResults } from './researchItem';
import DropDown from '../../styles/searchresults/Dropdown';

interface ListCount {
  usedItemCount: number;
  communityCount: number;
}

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

  //드롭다운메뉴 조건부렌더링
  const [productsSort, setProductsSort] = useState<
    '최신순' | '낮은가격순' | '높은가격순'
  >('최신순');
  const [communitySort, setCommunitySort] = useState<'최신순' | '인기순'>(
    '최신순'
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clickMenu, setClickMenu] = useState('최신순');
  const [selectedTab, setSelectedTab] = useState('중고물품');

  const handleProductsSort = (sort: '최신순' | '낮은가격순' | '높은가격순') => {
    setProductsSort(sort);
    setClickMenu(sort);
  };
  const handleCommunitySort = (sort: '최신순' | '인기순') => {
    setCommunitySort(sort);
    setClickMenu(sort);
  };

  const newSearchQuery = new URLSearchParams(location.search).get('q') || '';

  const checkWindowSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

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
    // 768px 이하에서 최초 렌더링 시에는 ProductsCount가 디폴트
    if (window.innerWidth <= 768) {
      setSelectedTab('ProductsCount');
    }
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

  const handleText = useCallback((content: string): string => {
    const textOnly = content.replace(/<[^>]*>|&nbsp;/g, ' ');
    return textOnly;
  }, []);

  return (
    <SearchResultsContainer>
      <SearchResultsCountContainer>
        <CheckImage src="/assets/checkresults.png" alt="검색결과" />
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
                  onClick={() => handleTabClick('커뮤니티')}
                >
                  커뮤니티({communityCount})
                </CommunityCount>
              </CountPost>
              <DropDown
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                clickMenu={clickMenu}
                setClickMenu={setClickMenu}
              />
            </CountBar>
          ) : (
            <CountBar>
              <CountList>{usedItemCount}개의 상품이 거래되고 있어요</CountList>
              <LinktoUsedProducts to="/products">
                <p>전체보기</p>

                <FaArrowRight />
              </LinktoUsedProducts>
            </CountBar>
          )}
          {isMobile && showClickedList ? (
            ''
          ) : (
            <UsedItemsList
              usedItemCount={usedItemCount}
              showClickedList={showClickedList}
            >
              {usedItemResults.slice(0, 5).map((item) => (
                <ToProductsPage
                  key={item.id}
                  to={`/products/detail/${item.id}`}
                >
                  <ProductList>
                    <div>
                      {item.image_url ? (
                        <img src={item.image_url[0]} alt="Item" />
                      ) : (
                        <svg
                          width="208"
                          height="208"
                          viewBox="0 0 208 208"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="208"
                            height="208"
                            rx="15"
                            fill="#F8F8F8"
                          />
                        </svg>
                      )}
                    </div>
                    <h1>{item.quality}</h1>
                    <h3>{item.title}</h3>
                    <p>{item.price}원</p>
                  </ProductList>
                </ToProductsPage>
              ))}
            </UsedItemsList>
          )}
        </UsedItemResultsContainer>

        <CommunityResultsContainer showClickedList={showClickedList}>
          <CommunityTitle showClickedList={showClickedList}>
            <CountList>{communityCount}개의 이야기가 있어요</CountList>
            <LinktoCommunityPosts to="/community">
              <p>전체보기</p>
              <FaArrowRight />
            </LinktoCommunityPosts>
          </CommunityTitle>
          {isMobile && !showClickedList ? (
            ''
          ) : (
            <CommunityPostsList>
              {communityResults.slice(0, 6).map((item) => (
                <ToCommunityPage
                  key={item.post_id}
                  to={`/community/detail/${item.post_id}`}
                >
                  <PostList>
                    <div className="commucontent">
                      <div className="ttitle">
                        <h3>{item.title}</h3>
                      </div>
                      <div className="commupic">
                        {item.main_image ? (
                          <img
                            className="community-pic"
                            src={item.main_image}
                            alt="Community Post"
                          />
                        ) : (
                          <img
                            className="nopicture"
                            src={
                              process.env.PUBLIC_URL +
                              '/assets/commudefault.png'
                            }
                            alt="Default User"
                          />
                        )}
                        <p>{handleText(item.content)}</p>{' '}
                      </div>
                    </div>
                    <div>
                      <svg
                        className="thumbs"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.00242571 5.92305C-0.00533256 5.83585 0.00556749 5.74802 0.0344343 5.66515C0.0633011 5.58227 0.109504 5.50616 0.170112 5.44164C0.23072 5.37711 0.304409 5.32559 0.386503 5.29034C0.468598 5.25508 0.557305 5.23686 0.646996 5.23684H1.88275C2.05438 5.23684 2.21899 5.30338 2.34036 5.42183C2.46172 5.54027 2.5299 5.70092 2.5299 5.86842V11.8684C2.5299 12.0359 2.46172 12.1966 2.34036 12.315C2.21899 12.4335 2.05438 12.5 1.88275 12.5H1.18187C1.0199 12.5 0.863797 12.4408 0.7444 12.334C0.625002 12.2272 0.55099 12.0805 0.536979 11.9231L0.00242571 5.92305ZM4.47138 5.67105C4.47138 5.40705 4.63964 5.17084 4.88394 5.05842C5.41753 4.81274 6.32646 4.31916 6.73643 3.65189C7.26484 2.79168 7.3645 1.23768 7.38068 0.881788C7.38295 0.831893 7.38165 0.781998 7.38845 0.732735C7.47614 0.115998 8.69571 0.836314 9.16328 1.598C9.41729 2.01105 9.44965 2.55389 9.42311 2.978C9.39432 3.43147 9.25809 3.86947 9.12445 4.30463L8.8397 5.23211H12.3528C12.4528 5.2321 12.5514 5.2547 12.641 5.29815C12.7305 5.34159 12.8085 5.40469 12.8688 5.48249C12.9292 5.56029 12.9702 5.65069 12.9888 5.74658C13.0073 5.84246 13.0028 5.94124 12.9757 6.03516L11.2381 12.0402C11.1997 12.1727 11.1181 12.2892 11.0056 12.3722C10.8931 12.4552 10.7559 12.5001 10.6149 12.5H5.11854C4.9469 12.5 4.78229 12.4335 4.66093 12.315C4.53956 12.1966 4.47138 12.0359 4.47138 11.8684V5.67105Z"
                          fill="#DBFF00"
                          fillOpacity="0.7"
                        />
                      </svg>
                      <span className="likescount">{item.likes}</span>

                      <svg
                        className="commentss"
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.8 0.5H7.2C8.47304 0.5 9.69394 1.01868 10.5941 1.94194C11.4943 2.86519 12 4.1174 12 5.42308C12 6.72876 11.4943 7.98096 10.5941 8.90422C9.81235 9.70602 8.7887 10.2027 7.69908 10.3195C7.42451 10.3489 7.2 10.57 7.2 10.8462V11.7544C7.2 12.11 6.8397 12.3527 6.51214 12.2142C3.59783 10.9824 0 9.12524 0 5.42308C0 4.1174 0.505713 2.86519 1.40589 1.94194C2.30606 1.01868 3.52696 0.5 4.8 0.5Z"
                          fill="#DBFF00"
                          fillOpacity="0.7"
                        />
                      </svg>
                      <span>{item.comment.length}</span>
                      <h4>{parseDate(item.created_at)}</h4>
                    </div>
                  </PostList>
                </ToCommunityPage>
              ))}
            </CommunityPostsList>
          )}
        </CommunityResultsContainer>
      </ResultListContainer>
    </SearchResultsContainer>
  );
};

export default SearchResults;

const SearchResultsContainer = styled.div`
  display: flex;
  width: 144rem;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  margin-bottom: 15rem;
  color: var(--12, #f8f8f8);
  background-color: var(--1, #0b0b0b);
  @media screen and (max-width: 1300px) {
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
  }
`;

const SearchResultsCountContainer = styled.div`
  margin: 0 auto;
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
`;
const CheckImage = styled.img`
  margin: 0 auto;
  width: 6.6rem;
  height: 6.6rem;
  @media screen and (max-width: 768px) {
    width: 4.4rem;
    height: 4.4rem;
    display: none;
  }
`;
const FullCounts = styled.div`
  margin-top: 2rem;
  font-size: var(--fontSize-H1);
  font-weight: var(--fontWeight-bold);
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const ResultListContainer = styled.div`
  width: 111.6rem;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #717171;
  margin: 0 auto;
  margin-top: 3rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const UsedItemResultsContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  margin-bottom: 4rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const CountBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 768px) {
    padding: 0 1.5rem;
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
const LinktoUsedProducts = styled(Link)`
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
    background-color: #83ad2e;
    color: #101d1c;
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
      usedItemCount !== 0 ? '4rem' : '2rem'};
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    margin-top: ${({ usedItemCount }) =>
      usedItemCount !== 0 ? '4rem' : '2rem'};
  }

  @media screen and (max-width: 768px) {
    column-gap: 1.5rem;
    row-gap: 1.8rem;
    grid-template-columns: repeat(3, 1fr);
    margin-top: ${({ usedItemCount }) =>
      usedItemCount !== 0 ? '10rem' : '2rem'};
  }
  @media screen and (max-width: 670px) {
    column-gap: 1.5rem;
    row-gap: 1.8rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: ${({ usedItemCount }) =>
      usedItemCount !== 0 ? '10rem' : '2rem'};
  }
  @media screen and (max-width: 520px) {
    row-gap: 1.8rem;
    grid-template-columns: repeat(2, 1fr);
    /* height: ${({ usedItemCount }) =>
      usedItemCount === 0 ? '0rem' : '6rem'}; */
  }

  @media screen and (max-width: 349px) {
    grid-template-columns: repeat(1, 1fr);
    /* height: ${({ usedItemCount }) =>
      usedItemCount === 0 ? '0rem' : '6rem'}; */
  }
`;
const ToProductsPage = styled(Link)`
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
  h1 {
    width: 9rem;
    padding: 0.8rem;
    color: var(--9-gray);
    text-align: center;
    background-color: var(--opc-20);
    border-radius: 0.3rem;
    margin-top: 1rem;
    font-size: var(--fontSize-H6);
    font-weight: var(--fontWeight-bold);
    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      width: 6.5rem;
      height: 2rem;
      font-size: 1rem;
      font-weight: 500;
      line-height: 191.2%;
      text-align: center;
      background-color: var(--opc-100);
      color: var(--2-gray);
      padding: 0;
    }
  }
  h3 {
    font-size: var(--fontSize-body);
    color: var(--11-gray);
    margin-top: 1rem;
    @media screen and (max-width: 768px) {
      width: 14rem;
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
      width: 6rem;
      height: 2.3rem;
      font-weight: var(--fontWeight-bold);
      font-size: var(--fontSize-H5);
    }
  }
`;

const CommunityResultsContainer = styled.div<{
  showClickedList: boolean;
}>`
  width: 111.6rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 8rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: ${({ showClickedList }) => (showClickedList ? 0 : '2rem')};
    padding: 0 1rem;
  }
  @media screen and (max-width: 530px) {
    width: 100%;

    padding: 0 1rem;
  }
  @media screen and (max-width: 349px) {
    width: 100%;

    margin-top: ${({ showClickedList }) => (showClickedList ? '5rem' : '')};
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
  /* padding: 0 1.5rem; */
  @media screen and (max-width: 768px) {
    display: none;
    margin-bottom: 1rem;
  }
  @media screen and (max-width: 530px) {
    display: none;
    margin-bottom: 1rem;
  }
  @media screen and (max-width: 349px) {
    display: none;
    margin-bottom: 1rem;
  }
`;
const LinktoCommunityPosts = styled(Link)`
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
    background-color: #83ad2e;
    color: #101d1c;
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
  background-color: #1f1f1f;
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
    margin-left: 1.5rem;
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
    overflow: hidden;
    font-size: var(--fontSize-H4);
    font-weight: var(--fontWeight-medium);
    color: var(--8-gray);
    max-width: 41rem;
    height: 6.6rem;
    line-height: 19rem;

    @media screen and (max-width: 768px) {
      font-size: var(--fontSize-H6);
      line-height: 1.92rem;
      height: 6rem;
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
