import { useDispatch } from "react-redux";
import { displayAddTaskCard } from "../../features/displayAddTask/displayAddTaskCardSlice";
import { FaPlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

// Sidebar component for the application
const Sidebar = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  return (
    <>
      <div className="max-md:hidden sticky top-0 w-44 lg:w-2/12 min-h-screen flex flex-col justify-between items-center bg-[#1c1c1c] text-[#d1d1d1] self-start  ">
        <div className="w-full items-center justify-center my-2 py-2  flex flex-col ">
          <span className="pb-5 w-full flex items-center justify-center text-xl lg:text-2xl my-1 font-semibold cursor-pointer text-white border-b-[1px] border-[#474747]">
            TaskTracker
          </span>
          <div className=" "></div>
          {/* Add Task button */}
          <div>
            <button
              onClick={() => {
                dispatch(displayAddTaskCard(true)); // Dispatch action to show add task card
              }}
              className="text-base lg:text-l px-2 py-2 my-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5]  rounded-md hover:bg-[#2e2e2e] cursor-pointer sticky top-0 flex items-center gap-2"
            >
              <FaPlus />
              Add Task
              <i className="fa-solid fa-plus text-sm ml-1"></i>
            </button>
          </div>

          {/* Task categories list */}
          <ul className="mt-3 ">
            <div to="/">
              <li className="my-3 hover:text-slate-50 cursor-pointer">
                <a href="/">All Tasks</a>
              </li>
            </div>
          </ul>
        </div>
        <div className="mb-4 z-10 flex gap-2 items-center cursor-pointer hover:text-slate-50">
          <FaUserCircle className="text-[#d1d1d1] text-xl" />
          <button>Shadev Kumar</button>
        </div>
      </div>
      {/* Mobile view header */}
      <div className="sticky top-0  z-50 bg-[#1c1c1c] md:hidden">
        <span className="py-3 w-full flex items-center justify-center text-2xl my-1 font-semibold cursor-pointer text-white ">
          TaskTracker
        </span>
      </div>
    </>
  );
};

export default Sidebar;
