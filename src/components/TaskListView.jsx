import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus } from "../features/taskCard/taskSlice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MdDelete } from "react-icons/md";
import { removeItem } from "../features/taskCard/taskSlice";

const TaskListView = () => {
  const tasks = useSelector((state) => state.task.tasks)
    .slice()
    .reverse();

  const dispatch = useDispatch();

  const handleRemoveItem = (taskid) => {
    dispatch(removeItem(taskid));
  };

  // Function to handle status change
  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTaskStatus({ taskId, newStatus }));
  };

  return (
    <div className="px-6 py-6 m-4 justify-between ">
      <ul className="">
        {tasks.map((task) => (
          <li
            key={task.taskid}
            className=" flex items-center justify-between  my-3 relative px-4 pt-8 py-4  bg-[#1c1c1c] hover:bg-[#1B1B27] rounded-md"
          >
            <div>
              <h3
                className={`${task.completed && "line-through text-[#676767]"}`}
              >
                {task.title}
              </h3>
              <p
                className={`text-sm  ${
                  task.completed
                    ? "line-through text-[#676767]"
                    : "text-[#959595]"
                } `}
              >
                {task.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Status selection FormControl */}
              <FormControl
                variant="filled"
                sx={{
                  m: 1,
                  minWidth: 125,
                  backgroundColor: "#161616",
                  borderRadius: "6px",
                }}
              >
                <InputLabel sx={{ color: "#d1d1d1" }}>Change Status</InputLabel>
                <Select
                  label="Status"
                  value={
                    task.todo
                      ? "todo"
                      : task.inProgress
                      ? "inProgress"
                      : "completed"
                  }
                  sx={{ color: "#d1d1d1", height: "2.5rem" }}
                  onChange={(e) =>
                    handleStatusChange(task.taskid, e.target.value)
                  }
                >
                  {!task.todo && <MenuItem value="todo">Todo</MenuItem>}
                  {!task.inProgress && (
                    <MenuItem value="inProgress">In Progress</MenuItem>
                  )}
                  {!task.completed && (
                    <MenuItem value="completed">Completed</MenuItem>
                  )}
                </Select>
              </FormControl>
              <div>
                <MdDelete
                  className="text-xl font-semibold text-gray-300 hover:scale-150"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveItem(task?.taskid);
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListView;
