import { configureStore } from '@reduxjs/toolkit';
import sideBarUpdateSlice from './side-bar-slice';
import actualfolderSlice from './actual-folder';

export const store = configureStore({
  reducer: {
    sidebarupdate: sideBarUpdateSlice,
    actualfolder: actualfolderSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
})