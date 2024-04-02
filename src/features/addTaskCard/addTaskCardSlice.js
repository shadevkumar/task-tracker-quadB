import { createSlice } from '@reduxjs/toolkit'

export const addTaskCardSlice = createSlice({
  name: 'addTaskCard',
  initialState: {
    flag: false, //initially displayAddTaskCard is false to display none
  },
  reducers: {
    addTaskCard: (state, action) => {
      state.flag = action.payload 
    },
  },
})

export const { addTaskCard } = addTaskCardSlice.actions
export default addTaskCardSlice.reducer
