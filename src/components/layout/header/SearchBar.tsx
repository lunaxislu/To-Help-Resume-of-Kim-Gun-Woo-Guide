import React, { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
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

const SearchBar: React.FC = () => {
  const { searchQuery } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    }
  };

  return (
    <SearchInputContainer>
      <SearchInputBar
        type="text"
        placeholder="검색어를 입력하세요."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <SearchBtn onClick={handleSearch}>
        <SearchBtnImg src={'/assets/searchbtn.png'} alt="searchbutton" />
      </SearchBtn>
    </SearchInputContainer>
  );
};

export default SearchBar;

const SearchInputContainer = styled.div`
  /* display: flex; */
  align-items: center;
  position: relative;

  @media screen and (max-width: 768px) {
    display: none;
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
