import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateTaskStatus } from "../features/taskCard/taskSlice";
import { RxCross2 } from "react-icons/rx";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const TaskCardsView = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();

  const handleRemoveItem = (taskid) => {
    dispatch(removeItem(taskid));
  };

  // Function to handle status change
  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTaskStatus({ taskId, newStatus }));
  };

  const categories = {
    todo: tasks.filter((task) => task.todo),
    inProgress: tasks.filter((task) => task.inProgress),
    completed: tasks.filter((task) => task.completed),
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description?.split(" ");
    if (words?.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  return (
    <div className="px-2 md:px-6 flex  py-6 m-2 md:m-4 justify-between ">
      {Object.entries(categories).map(([category, tasks]) => (
        <div className="md:mx-10 flex flex-col md:min-w-64" key={category}>
          <div className="flex items-center justify-center pb-4">
            {/* Category headers */}
            <h2 className="text-lg">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
          </div>
          {tasks.map((task) => (
            <div
              key={task.taskid}
              className="relative my-2 p-2 flex flex-col justify-center items-center"
            >
              <div className="task my-3 relative flex flex-col  pt-8  md:w-60 bg-[#1c1c1c] hover:bg-[#1B1B27] rounded-md">
                <h3
                  className={`px-4 ${
                    task.completed && "line-through text-[#676767]"
                  }`}
                >
                  {task.title}
                </h3>
                <p
                  className={`px-4 text-sm ${
                    task.completed
                      ? "line-through text-[#676767]"
                      : "text-[#959595]"
                  }`}
                >
                  {truncateDescription(task?.description, 9)}
                </p>

                <div>
                  <RxCross2
                    className="text-md font-semibold text-gray-300 absolute top-2 right-2 hover:scale-150"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveItem(task?.taskid);
                    }}
                  />
                </div>
                {/* Status selection FormControl */}
                <div className="w-full flex justify-end ">
                  <FormControl
                    variant="filled"
                    sx={{
                      m: 1,
                      width: 125,
                      backgroundColor: "#161616",
                      borderRadius: "6px",
                    }}
                  >
                    <InputLabel sx={{ color: "#d1d1d1" }}>
                      Change status
                    </InputLabel>
                    <Select
                      label="Status"
                      value={
                        task.todo
                          ? "todo"
                          : task.inProgress
                          ? "inProgress"
                          : "completed"
                      }
                      sx={{ color: "#d1d1d1", height: "2rem" }}
                      onChange={(e) =>
                        handleStatusChange(task.taskid, e.target.value)
                      }
                    >
                      {/* Dynamically generate MenuItem components */}
                      {!task.todo && <MenuItem value="todo">Todo</MenuItem>}
                      {!task.inProgress && (
                        <MenuItem value="inProgress">In Progress</MenuItem>
                      )}
                      {!task.completed && (
                        <MenuItem value="completed">Completed</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskCardsView;
