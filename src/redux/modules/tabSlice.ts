import { createSlice } from '@reduxjs/toolkit';

interface TabState {
  selectedTab: string;
}

const initialState: TabState = {
  selectedTab: ''
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setSelectedTab: (state: TabState, action) => {
      state.selectedTab = action.payload;
    }
  }
});

export const { setSelectedTab } = tabSlice.actions;
export default tabSlice.reducer;
