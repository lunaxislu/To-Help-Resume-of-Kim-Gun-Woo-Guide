import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchInputContainer>
      <SearchInputBar
        type="text"
        placeholder="찾으시는 내용을 검색해보세요"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SearchBtnContainer>
        <button onClick={handleSearch}>
          <SearchBtn src={'/assets/searchbtn.png'} alt="searchbutton" />
        </button>
      </SearchBtnContainer>
    </SearchInputContainer>
  );
};

export default SearchBar;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInputBar = styled.input`
  width: 488px;
  height: 37px;
  margin-right: 8px;
  border-radius: 15px;
  padding-left: 10px;
`;

const SearchBtnContainer = styled.div``;

const SearchBtn = styled.img`
  width: 37px;
  height: 37px;
`;
