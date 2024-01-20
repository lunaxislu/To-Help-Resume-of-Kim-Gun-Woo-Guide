import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLogin: boolean;
}

// slice 초기값 정의
const initialState: AuthState = {
  isLogin: false
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSuccessLogin: (state: AuthState) => {
      state.isLogin = true;
    },
    setSuccessLogout: (state: AuthState) => {
      state.isLogin = false;
    }
  }
});

export const { setSuccessLogin, setSuccessLogout } = authSlice.actions;
export default authSlice.reducer;
