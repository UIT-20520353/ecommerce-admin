import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCollapsed: false
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    expand: (state) => {
      state.isCollapsed = false;
    },
    collapse: (state) => {
      state.isCollapsed = true;
    }
  }
});

export const { expand, collapse } = sidebarSlice.actions;

export default sidebarSlice.reducer;
