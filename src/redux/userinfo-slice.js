import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const userinfoSlice = createSlice({
  name: 'mainfolder',
  initialState,
  reducers: {
    setMainFolder: (state,action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMainFolder } = userinfoSlice.actions

export default userinfoSlice.reducer