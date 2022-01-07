import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const actualfolderSlice = createSlice({
  name: 'actualfolder',
  initialState,
  reducers: {
    change: (state,action) => {
      state.value = action.payload
    },
    nameChanged : (state,action) =>{
      state.value.name = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { change, nameChanged } = actualfolderSlice.actions

export default actualfolderSlice.reducer