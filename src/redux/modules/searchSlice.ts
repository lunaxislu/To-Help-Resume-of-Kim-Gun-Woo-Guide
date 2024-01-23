// searchSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Communityy, UsedItem } from '../../pages/home/usedtypes';

interface SearchState {
  searchQuery: string;
  searchResults: {
    usedItemResults: UsedItem[];
    communityResults: Communityy[];
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
        communityResults: Communityy[];
      }>
    ) => {
      state.searchResults = action.payload;
    },
    updateUsedItems: (state, action: PayloadAction<UsedItem>) => {
      const updatedUsedItems = state.searchResults.usedItemResults.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.searchResults.usedItemResults = updatedUsedItems;
    },
    updateCommunityItems: (state, action: PayloadAction<Communityy>) => {
      const updatedCommunityItems = state.searchResults.communityResults.map(
        (item) =>
          item.post_id === action.payload.post_id ? action.payload : item
      );
      state.searchResults.communityResults = updatedCommunityItems;
    }
  }
});

export const {
  setSearchQuery,
  setSearchResults,
  updateUsedItems,
  updateCommunityItems
} = searchSlice.actions;
export default searchSlice.reducer;
