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
import { supabase } from '../../../api/supabase/supabaseClient';
import { Communityy, UsedItem } from '../../../pages/home/usedtypes';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';

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

  const handleHideSearchComp = () => {
    setShowSearchComp(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSearch = async () => {
    // 로컬 스토리지 지우는 로직(엔터키, 검색버튼 눌렀을 때 모두 지워지도록)
    localStorage.removeItem('usedItems');
    localStorage.removeItem('communityItems');

    // 공란 일 때 실행 안함.
    if (!searchQuery.trim()) {
      return;
    }

    try {
      const { data: usedItemData, error: usedItemError } = await supabase
        .from('products')
        .select('*')
        .or(
          `title.ilike.%${searchQuery}%, contents.ilike.%${searchQuery}%, tags.cs.{${searchQuery}}`
        );

      const { data: communityData, error: communityError } = await supabase
        .from('community')
        .select('*')
        .or(`title.ilike.%${searchQuery}%, content.ilike.%${searchQuery}%`);

      if (usedItemError || communityError) {
        console.error(
          '데이터 베이스에 요청을 실패하였습니다:',
          usedItemError || communityError
        );
        return;
      }

      // 중고 게시물 이미지 가져오기
      const usedItemsWithImages = await Promise.all(
        usedItemData.map(async (item: UsedItem) => {
          const pathToImage = `pictures/${item.image_Url}.png`;
          const { data } = await supabase.storage
            .from('picture')
            .getPublicUrl(pathToImage);
          return { ...item, data };
        })
      );

      // 커뮤 게시물 이미지 가져오기
      const communityItemsWithImages = await Promise.all(
        communityData.map(async (item: Communityy) => {
          const pathToImage = `pictures/${item.image_Url}.png`;
          const { data } = await supabase.storage
            .from('community_picture')
            .getPublicUrl(pathToImage);
          return { ...item, data };
        })
      );

      dispatch(
        setSearchResults({
          usedItemResults: usedItemsWithImages || [],
          communityResults: communityItemsWithImages || []
        })
      );

      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error('수파베이스에 요청 중 실패:', error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSearchComp(false);
    }
  };

  const checkWindowSize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkWindowSize();
    window.addEventListener('DOMContentLoaded', checkWindowSize);
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('DOMContentLoaded', checkWindowSize);
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
          <IoIosArrowBack
            style={{
              color: 'var(--opc-100)',
              fontSize: '2.2rem',
              cursor: 'pointer'
            }}
            onClick={handleHideSearchComp}
          />
        )}

        <SearchInputBar
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <SearchBtn onClick={handleSearch}>
          {isMobile && <StMagnifyGlass />}
          {!isMobile && (
            <SearchBtnImg src={'/assets/searchbtn.png'} alt="searchbutton" />
          )}
        </SearchBtn>
      </div>
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
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    transition: all 0.3s ease;
    ${(props) => {
      if (props.$position === true) {
        return css`
          opacity: 1;
          transform: translateX(0%);
        `;
      } else {
        return css`
          opacity: 0;
          transform: translateX(100%);
        `;
      }
    }};
    background-color: var(--3-gray);
    padding: 2rem;
  }
`;

const SearchInputBar = styled.input`
  width: 48.8rem;
  height: 3.7rem;
  border-radius: 1.9rem;
  padding-left: 20px;
  background: var(--3-gray, #2c2c2c);
  border: none;
  color: var(--6-gray, #717171);
  font-size: var(--fontSize-H5);
  font-weight: var(--fontWeight-medium);
  line-height: 2.4856rem;
  outline: none;

  @media screen and (max-width: 768px) {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    background-color: var(--2-gray);
  }
`;

const StMagnifyGlass = styled(FaMagnifyingGlass)`
  position: absolute;
  top: 32%;
  right: 55%;
  z-index: 3;
  color: var(--opc-100);
`;

const SearchBtn = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  right: 10px;
  width: 37px;
  height: 37px;
  cursor: pointer;
`;

const SearchBtnImg = styled.img`
  width: 3.7rem;
  height: 3.7rem;
`;
