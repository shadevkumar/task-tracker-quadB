import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaCircleHalfStroke } from "react-icons/fa6"; //inprogress icon
import { MdOutlineCircle } from "react-icons/md"; //todo icon
import { IoMdCheckmarkCircle } from "react-icons/io"; //completed icon
import { useMemo } from "react";
import { useTaskActions } from "../../utils/taskActions";
import StatusSelect from "../../shared/StatusSelect";

const TaskCardsView = () => {
  const tasks = useSelector((state) => state.task.tasks); // Fetch tasks from Redux store
  const { handleRemoveItem } = useTaskActions(); // Custom hook for task actions

  // Memoize the categories to prevent unnecessary recalculations
  const categories = useMemo(
    () => ({
      todo: tasks.filter((task) => task.status === "todo"),
      inProgress: tasks.filter((task) => task.status === "inProgress"),
      completed: tasks.filter((task) => task.status === "completed"),
    }),
    [tasks]
  );

  // Icons based on category
  const categoryIcons = {
    todo: <MdOutlineCircle />,
    inProgress: (
      <FaCircleHalfStroke className="text-orange-600 hover:animate-spin" />
    ),
    completed: <IoMdCheckmarkCircle className="text-blue-600" />,
  };

  // Function to truncate task description to a word limit
  const truncateDescription = (description, wordLimit) => {
    const words = description?.split(" ");
    if (words?.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  return (
    <div className="max-md:hidden px-2 lg:px-6 flex  py-6 m-2 lg:m-4 md:justify-center max-lg:gap-12  xl:justify-between  ">
      {Object.entries(categories).map(([category, tasks]) => (
        <div
          className="lg:mx-10 flex flex-col md:min-w-44 lg:min-w-56 xl:min-w-64 2xl:min-w-72 overflow-y-scroll max-h-[82vh] scrollbar-hide"
          key={category}
        >
          <div className="flex items-center justify-center pb-4  sticky top-0 bg-[#161616] z-50">
            {/* Category headers */}
            <h2 className="text-xl flex items-center gap-2">
              {categoryIcons[category]} {/* Render the icon */}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
          </div>
          {tasks.map((task) => (
            <div
              key={task.taskid}
              className="relative lg:my-1  xl:my-2  xl:p-2 flex flex-col justify-center items-center  "
            >
              <div className="task my-3 relative flex flex-col pt-4 xl:pt-8 md:w-44  lg:w-60 xl:w-64 2xl:w-72 bg-[#1c1c1c]  rounded-md ">
                <h3
                  className={`md:px-2 lg:px-4 text-sm lg:text-base ${
                    task.status === "completed" && "line-through text-[#676767]"
                  }`}
                >
                  {task.title}
                </h3>
                <p
                  className={`md:px-2 lg:px-4 text-xs lg:text-sm ${
                    task.status === "completed"
                      ? "line-through text-[#676767]"
                      : "text-[#959595]"
                  }`}
                >
                  {truncateDescription(task?.description, 9)}
                </p>

                <div>
                  <MdDelete
                    className="text-md font-semibold text-gray-300 absolute top-2 right-4 xl:right-2 hover:scale-125"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveItem(task?.taskid);
                    }}
                  />
                </div>
                {/* Status selection FormControl */}
                <div className="w-full flex justify-end ">
                  <StatusSelect task={task} />
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
