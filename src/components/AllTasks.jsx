import TaskCardsView from "./TaskCards/TaskCardsView";
import TaskListView from "./TaskCards/TaskListView";
import { useState, useEffect } from "react";
import { FaList } from "react-icons/fa";
import { BsCardHeading } from "react-icons/bs";
// import ListIcon from '@mui/icons-material/List';
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { displayAddTaskCard } from "../features/displayAddTask/displayAddTaskCardSlice";

const AllTasks = () => {
  const dispatch = useDispatch();

  const [view, setView] = useState("cards"); // Default to cards view
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Displaying only ListView on small screen as of now will add Caraousel for CardView
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to determine the icon background color
  const viewType = (iconView) => {
    return view === iconView ? " bg-[#292929]" : "";
  };

  return (
    <>
      <div className="md:w-10/12 scrollbar-hide ">
        <div className="mt-4 mr-2 max-md:hidden px-9 py-2 w-full flex justify-end ">
          <div className={`px-1 py-1 rounded-md ${viewType("list")}`}>
            <FaList
              onClick={() => {
                setView("list");
              }}
              className={`mx-2 cursor-pointer `}
            />
          </div>
          <div className={`px-1 py-1 rounded-md ${viewType("cards")}`}>
            <BsCardHeading
              onClick={() => {
                setView("cards");
              }}
              className={`mx-2 cursor-pointer`}
            />
          </div>
        </div>
        {windowWidth < 768 ? (
          <TaskListView />
        ) : view === "list" ? (
          <TaskListView />
        ) : (
          <TaskCardsView />
        )}
        {/* {display only ListView on Small Screens and on large screen based on selected mode} */}

        <div
          onClick={() => {
            dispatch(displayAddTaskCard(true));
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
