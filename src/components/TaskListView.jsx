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

  const reversedTasks = useMemo(() => {
    return tasks.slice().reverse();
  }, [tasks]); // Dependency array

  const getStatusIcon = (task) => {
    if (task.todo) return <MdOutlineCircle />;
    if (task.inProgress)
      return <FaCircleHalfStroke className="text-orange-600" />;
    if (task.completed)
      return <IoMdCheckmarkCircle className="text-blue-600" />;
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
                {getStatusIcon(task)}
                <h3
                  className={`text-lg ${
                    task.completed && "line-through text-[#676767]"
                  }`}
                >
                  {task.title}
                </h3>
              </div>

              <p
                className={`pl-6 text-xs  md:text-sm  ${
                  task.completed
                    ? "line-through text-[#676767]"
                    : "text-[#959595]"
                } `}
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
