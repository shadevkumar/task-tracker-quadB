import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaCircleHalfStroke } from "react-icons/fa6"; //inprogress icon
import { MdOutlineCircle } from "react-icons/md";
//todo icon
import { IoMdCheckmarkCircle } from "react-icons/io"; //completed icon
import { useMemo } from "react";
import { useTaskActions } from "../utils/taskActions";
import StatusSelect from "./StatusSelect";

const TaskListView = () => {
  const tasks = useSelector((state) => state.task.tasks);

  const { handleRemoveItem } = useTaskActions();

  // Reverse tasks for display purposes
  const reversedTasks = useMemo(() => {
    return tasks.slice().reverse();
  }, [tasks]); // Dependency array

  // Function to determine and return the appropriate status icon for each task
  const getStatusIcon = (status) => {
    switch (status) {
      case "todo":
        return <MdOutlineCircle />;
      case "inProgress":
        return <FaCircleHalfStroke className="text-orange-600" />;
      case "completed":
        return <IoMdCheckmarkCircle className="text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="px-6 py-6 md:m-4 justify-between ">
      <ul className="">
        {reversedTasks.map((task) => (
          <li
            key={task.taskid}
            className=" flex max-md:flex-col md:items-center justify-between  my-3 relative px-4 pt-8 py-4  bg-[#1c1c1c] rounded-md"
          >
            <div>
              <div className="flex items-center gap-2">
                {getStatusIcon(task.status)}
                {/* Display status icon */}
                <h3
                  className={`text-lg ${
                    task.status === "completed"
                      ? "line-through text-[#676767]"
                      : ""
                  }`}
                >
                  {task.title}
                </h3>
              </div>

              <p
                className={`pl-6 text-xs  md:text-sm  ${
                  task.status === "completed"
                    ? "line-through text-[#676767]"
                    : ""
                }`}
              >
                {task.description}
              </p>
            </div>

            <div className="flex items-center gap-2  max-md:flex justify-end">
              {/* Status selection FormControl */}
              <StatusSelect task={task} />
              <div>
                <MdDelete
                  className="text-xl font-semibold text-gray-300 hover:scale-150"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveItem(task?.taskid); // Delete task action
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
