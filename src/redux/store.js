import { configureStore } from '@reduxjs/toolkit';
import sideBarUpdateSlice from './side-bar-slice';
import actualfolderSlice from './actual-folder';
import userinfoSlice from './userinfo-slice';

export const store = configureStore({
  reducer: {
    sidebarupdate: sideBarUpdateSlice,
    actualfolder: actualfolderSlice,
    userinfo: userinfoSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
})