import TaskCardsView from "./TaskCardsView";
import TaskListView from "./TaskListView";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { BsCardHeading } from "react-icons/bs";
// import ListIcon from '@mui/icons-material/List';
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addItemCard } from "../features/addItemCard/addItemCardSlice";

const AllTasks = () => {
  const dispatch = useDispatch();

  const [view, setView] = useState("list"); // Default to cards view

  return (
    <>
      <div className="md:w-10/12 scrollbar-hide ">
        <div className="mt-4 mr-2 max-md:hidden px-9 py-2 w-full flex justify-end ">
          <FaList
            onClick={() => {
              setView("list");
            }}
            className="mx-2 cursor-pointer"
          />
          <BsCardHeading
            onClick={() => {
              setView("cards");
            }}
            className="mx-2 cursor-pointer"
          />
        </div>
        {view === "list" ? <TaskListView /> : <TaskCardsView />}

        <div
          onClick={() => {
            dispatch(addItemCard(true));
          }}
          className="md:hidden w-16 h-16 flex justify-center items-center fixed bottom-10 right-4 z-50   px-2 py-2 text-center font-semibold border-[1px] border-[#1B1B1B] bg-[#292929] text-[#d5d5d5] rounded-full hover:bg-[#2e2e2e] cursor-pointer text-3xl shadow-lg shadow-grey-500/40 "
        >
          <FaPlus className="" />
        </div>
      </div>
    </>
  );
};

export default AllTasks;
