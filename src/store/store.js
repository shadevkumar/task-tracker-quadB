import { configureStore } from '@reduxjs/toolkit'
import addItemCardReducer from '../features/displayAddTask/displayAddTaskCardSlice'
import taskReducer from '../features/taskCard/taskSlice'
export const store = configureStore({
  reducer: {
    task: taskReducer,
    displayAddTaskCard: addItemCardReducer,
  },
})
