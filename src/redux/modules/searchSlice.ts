// searchSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../pages/community/api/model';
import { UsedItem } from '../../pages/home/usedtypes';

interface SearchState {
  searchQuery: string;
  searchResults: {
    usedItemResults: UsedItem[];
    communityResults: Post[];
  };
}

const initialState: SearchState = {
  searchQuery: '',
  searchResults: {
    usedItemResults: [],
    communityResults: []
  }
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (
      state,
      action: PayloadAction<{
        usedItemResults: UsedItem[];
        communityResults: Post[];
      }>
    ) => {
      state.searchResults = action.payload;
    }
  }
});

export const { setSearchQuery, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
