import React, {
  ChangeEvent,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import {
  setSearchQuery,
  setSearchResults
} from '../../../redux/modules/searchSlice';
import {
  ResearchResults,
  researchItems
} from '../../../pages/searchResults/researchItem';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoIosClose } from 'react-icons/io';
import { GrPrevious } from 'react-icons/gr';

type SearchBarProps = {
  showSearchComp: boolean;
  setShowSearchComp: React.Dispatch<SetStateAction<boolean>>;
};

const SearchBar: React.FC<SearchBarProps> = ({
  showSearchComp,
  setShowSearchComp
}) => {
  const { searchQuery } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);

  // 인풋창 최대 입력 글자 제한
  const maxInputLength = 20;

  const handleHideSearchComp = () => {
    setShowSearchComp(false);
  };

  // 인풋창에 작성되는 내용을 인식해서 스토어로 보내주고, 입력 내용 지울 수 있는 state 삽입
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch(setSearchQuery(e.target.value));
    setIsInputEmpty(!inputValue.trim());
    if (inputValue.length > maxInputLength) {
      alert(`최대 ${maxInputLength}까지 입력이 가능합니다.`);
    }
  };

  const handleClearInput = () => {
    dispatch(setSearchQuery(''));
    setIsInputEmpty(true);
  };

  const handleSearch = async () => {
    // 공란 일 때 실행 안함.
    if (!searchQuery.trim()) {
      return;
    }

    const rresults: ResearchResults | undefined = await researchItems(
      searchQuery
    );
    if (!rresults) {
      console.error('수파베이스에 요청 중 실패:');
      return;
    }

    const { usedItemsWithImages, communityItemsWithImages } = rresults;

    dispatch(
      setSearchResults({
        usedItemResults: usedItemsWithImages || [],
        communityResults: communityItemsWithImages || []
      })
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
      handleSearch();
      setShowSearchComp(false);
    }
  };

  const checkWindowSize = () => {
    if (window.matchMedia('(max-width:768px)').matches) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  });

  return (
    <SearchInputContainer $position={showSearchComp}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {isMobile && (
          <GrPrevious
            style={{
              color: 'var(--opc-100)',
              fontSize: '1.6rem',
              cursor: 'pointer'
            }}
            onClick={handleHideSearchComp}
          />
        )}
        <SearchInputBar
          type="text"
          placeholder={
            isMobile
              ? '검색어 입력 후 Enter키를 누르세요.'
              : '검색어를 입력하세요.'
          }
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          maxLength={maxInputLength}
        />
        {isMobile && !isInputEmpty && (
          <ClearInputButton onClick={handleClearInput}>
            <IoIosClose />
          </ClearInputButton>
        )}
        <SearchBtn onClick={handleSearch}>
          <StMagnifyGlass />

          <SearchBtnImg src={'/assets/searchbtn.png'} alt="searchbutton" />
        </SearchBtn>
      </div>
      {isMobile ? (
        <div>
          <div></div>
        </div>
      ) : (
        ''
      )}
    </SearchInputContainer>
  );
};

export default SearchBar;

type MobileProps = {
  $position: boolean;
};

const SearchInputContainer = styled.div<MobileProps>`
  /* display: flex; */
  align-items: center;
  /* position: relative; */

  @media only screen and (max-width: 768px) {
    width: 90vw;
    height: 90vh;
    position: fixed;
    margin-top: 7rem;
    top: 0;
    right: 0;
    z-index: 3000;

    transition: all 0.3s ease;
    ${(props) => {
      if (props.$position === true) {
        return css`
          display: block;
          opacity: 1;
          transform: translateX(0%);
        `;
      } else {
        return css`
          display: none;
          opacity: 0;
          transform: translateX(100%);
        `;
      }
    }};
    background-color: var(--bgColor);
    border: 0.1rem solid var(--opc-100);
    border-radius: 0.5rem;
    padding: 2rem;
  }
`;

const SearchInputBar = styled.input`
  width: 33rem;
  height: 3.7rem;
  padding-left: 2rem;
  border-radius: 1.9rem;
  background: var(--opc-50);
  border: none;
  color: var(--black);
  font-size: var(--fontSize-H5);
  font-weight: var(--fontWeight-medium);
  line-height: 2.5rem;
  outline: none;
  &::placeholder {
    padding-left: 1rem;
  }
  @media screen and (max-width: 1300px) {
    width: 48.8rem;
  }
  @media screen and (max-width: 1100px) {
    width: 40rem;
  }

  @media screen and (max-width: 900px) {
    width: 30rem;
  }
  @media screen and (max-width: 768px) {
    position: relative;
    left: 40%;
    transform: translateX(-50%);
    width: 70%;
    /* background-color: var(--2-gray); */
    border: none;
    border-radius: 0;
    padding-left: 0.5rem;
  }
  @media screen and (max-width: 400px) {
    position: relative;
    margin-left: 1rem;
    left: 40%;
    transform: translateX(-50%);
    width: 80%;
    /* background-color: var(--2-gray); */
    border: none;
    border-radius: 0;
    padding-left: 0.5rem;
  }
`;

const ClearInputButton = styled.div`
  @media screen and (max-width: 768px) {
    position: absolute;
    top: 50%;
    right: 70px;
    transform: translate(-50%, -50%);
    color: #878787;
    font-size: 3rem;
    cursor: pointer;
  }
  @media screen and (max-width: 400px) {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(-50%, -50%);
    color: #878787;
    font-size: 3rem;
    cursor: pointer;
  }
`;
const StMagnifyGlass = styled(FaMagnifyingGlass)`
  position: absolute;
  top: 32%;
  right: 55%;
  z-index: 3;
  color: var(--opc-100);
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const SearchBtn = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  right: 10px;
  width: 37px;
  height: 37px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    position: relative;
    display: none;
  }
`;

const SearchBtnImg = styled.img`
  width: 3.7rem;
  height: 3.7rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
