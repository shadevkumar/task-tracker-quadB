// Utility function to determine a task's status
export const getTaskStatus = (task) => {
  if (task.todo) return 'todo'
  if (task.inProgress) return 'inProgress'
  if (task.completed) return 'completed'
  // Default to "todo"
  return 'todo'
}

export const statusMap = {
    todo: "Todo",
    inProgress: "In Progress",
    completed: "Completed",
  };