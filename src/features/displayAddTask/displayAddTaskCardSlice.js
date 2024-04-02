import { createSlice } from '@reduxjs/toolkit'

export const displayAddTaskCardSlice = createSlice({
  name: 'displayAddTaskCard',
  initialState: {
    flag: false, //initially displayAddTaskCard is false to display none
  },
  reducers: {
    displayAddTaskCard: (state, action) => {
      state.flag = action.payload
    },
  },
})

export const { displayAddTaskCard } = displayAddTaskCardSlice.actions
export default displayAddTaskCardSlice.reducer
