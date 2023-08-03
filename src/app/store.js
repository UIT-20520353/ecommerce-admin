import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './toggleSidebarSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer
  }
});
