import { useDispatch } from 'react-redux'
import { removeItem, updateTaskStatus } from '../features/taskCard/taskSlice'

export const useTaskActions = () => {
  const dispatch = useDispatch()

  const handleRemoveItem = (taskId) => {
    dispatch(removeItem(taskId))
  }

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTaskStatus({ taskId, newStatus }))
  }

  return { handleRemoveItem, handleStatusChange }
}
