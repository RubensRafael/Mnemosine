import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: false,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state,action) => {
      
      state.value = !(state.value)
    }
  },
})

// Action creators are generated for each case reducer function
export const {toggleTheme} = themeSlice.actions

export default themeSlice.reducer