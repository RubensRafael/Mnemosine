import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'view',
}

export const mainStatusSlice = createSlice({
  name: 'mainstatus',
  initialState,
  reducers: {
    setView: (state,action) => {
      state.value = 'view'
    },
    setCreate: (state,action) => {
      state.value = 'create'
    },
  }, 
})

// Action creators are generated for each case reducer function
export const { setView, setCreate } = mainStatusSlice.actions

export default mainStatusSlice.reducer