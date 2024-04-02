import "./App.css";
import Sidebar from "./components/Sidebar";
import AllTasks from "./components/AllTasks";
import { useSelector } from "react-redux";
import AddTask from "./components/AddTask";

function App() {
  const displayAddTaskCard = useSelector((state) => state.addTaskCard.flag);
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
