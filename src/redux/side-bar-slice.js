import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const sideBarUpdateSlice = createSlice({
  name: 'sidebarupdate',
  initialState,
  reducers: {
    update: (state) => {
      state.value += 1
    }
  },
})

// Action creators are generated for each case reducer function
export const { update } = sideBarUpdateSlice.actions

export default sideBarUpdateSlice.reducer