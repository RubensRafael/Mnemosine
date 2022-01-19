import { configureStore } from '@reduxjs/toolkit';
import sideBarUpdateSlice from './side-bar-slice';
import actualfolderSlice from './actual-folder';
import userinfoSlice from './userinfo-slice';
import newNoteSlice from './new-note-slice';
import mainStatusSlice from './main-status-slice';

export const store = configureStore({
  reducer: {
    sidebarupdate: sideBarUpdateSlice,
    actualfolder: actualfolderSlice,
    userinfo: userinfoSlice,
    newnote: newNoteSlice,
    mainstatus: mainStatusSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})