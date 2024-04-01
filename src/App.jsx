import "./App.css";
import Sidebar from "./components/Sidebar";
import AllTasks from "./components/AllTasks";

function App() {
  return (
    <>
      <div className="flex bg-[#161616] min-h-screen text-white ">
        <Sidebar />
        <AllTasks />
      </div>
    </>
  );
}

export default App;
