import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import AllTasks from "./components/AllTasks";
import { useSelector } from "react-redux";
import AddTask from "./components/AddTask/AddTask";

function App() {
  const displayAddTaskCard = useSelector(
    (state) => state.displayAddTaskCard.flag
  );
  return (
    <>
      <div
        className={` flex max-md:flex-col bg-[#161616] min-h-screen text-white ${
          displayAddTaskCard && "blur-md"
        } `}
      >
        <Sidebar />
        <AllTasks />
      </div>
      {displayAddTaskCard && <AddTask />}
    </>
  );
}

export default App;
