import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  value: 
    { title: '' , content: '', date: "" , time: "00:00", never: true}
  
}

export const newNoteSlice = createSlice({
  name: 'newnote',
  initialState,
  reducers: {
    setNoteTitle: (state,action) => {
      state.value.title = action.payload
    },
    setNoteContent: (state,action) => {
      state.value.content = action.payload
    },
    setNoteDate: (state,action) => {
      state.value.date = action.payload
    },
    setNoteTime: (state,action) => {
      state.value.time = action.payload
    },
    setNoteNever: (state,action) => {
      state.value.never = action.payload
    },
    clearNewNote: (state,action) => {
      state.value = { title: '' , content: '', date: "" , time: "00:00", never: true}
    },

    
  },
})

// Action creators are generated for each case reducer function
export const { setNoteTitle, setNoteContent, setNoteDate, setNoteTime , setNoteNever, clearNewNote } = newNoteSlice.actions

export default newNoteSlice.reducer
