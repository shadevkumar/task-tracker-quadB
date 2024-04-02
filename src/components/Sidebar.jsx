import { useDispatch } from "react-redux";
import { addItemCard } from "../features/addItemCard/addItemCardSlice";
import { FaPlus } from "react-icons/fa6";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="max-md:hidden sticky top-0 w-2/12 min-h-screen flex flex-col justify-between items-center bg-[#1c1c1c] text-[#d1d1d1] self-start  ">
        <div className="w-full items-center justify-center my-2 py-2  flex flex-col ">
          <span className="pb-5 w-full flex items-center justify-center text-2xl my-1 font-semibold cursor-pointer text-white border-b-[1px] border-[#474747]">
            TaskTracker
          </span>
          <div className=" "></div>
          <div>
            <button
              onClick={() => {
                dispatch(addItemCard(true));
              }}
              className="text-l px-2 py-2 my-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5]  rounded-md hover:bg-[#2e2e2e] cursor-pointer sticky top-0 flex items-center gap-2"
            >
              <FaPlus />
              Add Task
              <i className="fa-solid fa-plus text-sm ml-1"></i>
            </button>
          </div>

          <ul className="mt-3 ">
            <div to="/">
              <li className="my-3 hover:text-slate-50 cursor-pointer">
                All Tasks
              </li>
            </div>
          </ul>
        </div>
        <div className="mb-4 z-10 flex items-center cursor-pointer hover:text-slate-50">
          <i className="far fa-user mr-1"></i>
          <button>Sign in</button>
        </div>
      </div>
      <div className="sticky top-0  z-50 bg-[#1c1c1c] md:hidden">
        <span className="pb-5 w-full flex items-center justify-center text-2xl my-1 font-semibold cursor-pointer text-white ">
          TaskTracker
        </span>
      </div>
    </>
  );
};

export default Sidebar;
