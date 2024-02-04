import React, {
  ChangeEvent,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import {
  setSearchQuery,
  setSearchResults
} from '../../redux/modules/searchSlice';
import {
  ResearchResults,
  researchItems
} from '../../pages/searchResults/researchItem';

type SearchBarProps = {
  showSearchComp: boolean;
  setShowSearchComp: React.Dispatch<SetStateAction<boolean>>;
};

const SideSearchBar: React.FC<SearchBarProps> = ({
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
    <div style={{ position: 'relative' }}>
      <SearchInputBar
        onSubmit={() => {
          handleSearch();
          handleHideSearchComp();
        }}
        type="text"
        placeholder="검색어 입력 후 Enter키를 누르세요."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SideSearchBar;

const SlideLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(0%);
  }
  to {
    opacity: 1;
    transform: translateX(-10%);
  }
`;

const SearchInputBar = styled.input`
  width: 48.8rem;
  height: 5rem;
  border-radius: 1rem;
  padding-left: 20px;
  background: var(--opc-100);
  border: none;
  color: var(--6-gray, #717171);
  font-size: var(--fontSize-H5);
  font-weight: var(--fontWeight-medium);
  line-height: 2.4856rem;
  outline: none;
  position: absolute;
  z-index: -5;
  top: 22.9rem;
  right: 0;
  animation: ${SlideLeft} 0.3s forwards;
`;
