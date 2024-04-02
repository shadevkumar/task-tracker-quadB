import { createSlice } from '@reduxjs/toolkit'

function getInitialTasks() {
  try {
    const localStorageData = localStorage.getItem('taskItems')
    return localStorageData && localStorageData !== 'undefined'
      ? JSON.parse(localStorageData)
      : []
  } catch (error) {
    console.error('Failed to load tasks from local storage:', error)
    return []
  }
}

function updateLocalStorage(tasks) {
  try {
    localStorage.setItem('taskItems', JSON.stringify(tasks))
  } catch (error) {
    console.error('Failed to save tasks to local storage:', error)
  }
}

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: getInitialTasks(),
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
      updateLocalStorage(state.tasks)
    },
    removeItem: (state, action) => {
      const taskToRemoveId = action.payload
      state.tasks = state.tasks.filter((task) => task.taskid !== taskToRemoveId)
      updateLocalStorage(state.tasks)
    },
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload
      const taskIndex = state.tasks.findIndex((task) => task.taskid === taskId)
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = newStatus // Assuming tasks have a 'status' field
        updateLocalStorage(state.tasks)
      }
    },
  },
})

export const { addTask, removeItem, updateTaskStatus } = taskSlice.actions

export default taskSlice.reducer
