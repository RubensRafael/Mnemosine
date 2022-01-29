import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const folderlistSlice = createSlice({
  name: 'folderlist',
  initialState,
  reducers: {
    setFolderList: (state,action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFolderList } = folderlistSlice.actions

export default folderlistSlice.reducer