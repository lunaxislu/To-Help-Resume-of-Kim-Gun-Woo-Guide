import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../modules/searchSlice';
import authSlice from '../modules/authSlice';
import countPostsAndItemsSlice from '../modules/countPostsAndItemsSlice';
import openFormSlice from '../modules/openForm';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authSlice,
    itemAndPost: countPostsAndItemsSlice,
    openForm: openFormSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
