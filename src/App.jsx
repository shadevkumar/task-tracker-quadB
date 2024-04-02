import "./App.css";
import Sidebar from "./components/Sidebar";
import AllTasks from "./components/AllTasks";
import { useSelector } from "react-redux";
import AddTask from "./components/AddTask";

function App() {
  const showAddItemCard = useSelector((state) => state.addItemCard.flag);
  return (
    <>
      <div
        className={` flex max-md:flex-col bg-[#161616] min-h-screen text-white ${
          showAddItemCard && "blur-md"
        } `}
      >
        <Sidebar />
        <AllTasks />
      </div>
      {showAddItemCard && <AddTask />}
    </>
  );
}

export default App;
