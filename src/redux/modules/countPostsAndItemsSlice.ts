import { createSlice } from '@reduxjs/toolkit';

interface CountState {
  myItems: number;
  purchasedItems: number;
  favItems: number;
  myPosts: number;
  favPosts: number;
}

// slice 초기값 정의
const initialState: CountState = {
  myItems: 0,
  purchasedItems: 0,
  favItems: 0,
  myPosts: 0,
  favPosts: 0
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setMyItem: (state: CountState, action) => {
      state.myItems = action.payload;
    },
    setPurchasedItem: (state: CountState, action) => {
      state.purchasedItems = action.payload;
    },
    setFavItem: (state: CountState, action) => {
      state.favItems = action.payload;
    },
    setMyPost: (state: CountState, action) => {
      state.myPosts = action.payload;
    },
    setFavPost: (state: CountState, action) => {
      state.favPosts = action.payload;
    }
  }
});

export const {
  setMyItem,
  setPurchasedItem,
  setFavItem,
  setMyPost,
  setFavPost
} = itemSlice.actions;
export default itemSlice.reducer;
