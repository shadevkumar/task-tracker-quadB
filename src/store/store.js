import { configureStore } from '@reduxjs/toolkit'
import addItemCardReducer from '../features/addTaskCard/addTaskCardSlice'
import taskReducer from '../features/taskCard/taskSlice'
export const store = configureStore({
  reducer: {
    task: taskReducer,
    addTaskCard: addItemCardReducer,
  },
})
