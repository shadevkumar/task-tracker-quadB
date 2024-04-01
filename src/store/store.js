import { configureStore } from '@reduxjs/toolkit'
import addItemCardReducer from '../features/addItemCard/addItemCardSlice'
import taskReducer from '../features/taskCard/taskSlice'
export const store = configureStore({
  reducer: {
    task: taskReducer,
    addItemCard: addItemCardReducer,
  },
})
