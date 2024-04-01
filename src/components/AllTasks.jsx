import { useSelector } from "react-redux";
import AddTask from "./AddTask";
import TaskCardsView from "./TaskCardsView";
import TaskListView from "./TaskListView";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { BsCardHeading } from "react-icons/bs";
// import ListIcon from '@mui/icons-material/List';

const AllTasks = () => {
  const displayAddTask = useSelector((state) => state.addItemCard.flag);

  const [view, setView] = useState("cards"); // Default to cards view

  return (
    <>
      <div className="md:w-10/12">
        <div className="mt-4 mr-2 px-9 py-2 w-full flex justify-end ">
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
        {view === "cards" ? <TaskCardsView /> : <TaskListView />}
        {displayAddTask && <AddTask />}
      </div>
    </>
  );
};

export default AllTasks;
