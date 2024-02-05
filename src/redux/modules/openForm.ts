import { createSlice } from '@reduxjs/toolkit';

interface OpenFromState {
  isOpen: boolean;
}

const initialState: OpenFromState = {
  isOpen: false
};

export const openFormSlice = createSlice({
  name: 'openForm',
  initialState,
  reducers: {
    setIsOpenForm: (state: OpenFromState) => {
      state.isOpen = true;
    },
    setIsCloseForm: (state: OpenFromState) => {
      state.isOpen = false;
    }
  }
});

export const { setIsOpenForm, setIsCloseForm } = openFormSlice.actions;
export default openFormSlice.reducer;
