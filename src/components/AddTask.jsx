import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemCard } from "../features/addItemCard/addItemCardSlice";
import { v4 as uuidv4 } from "uuid";
import { addTask, statusCheck } from "../features/taskCard/taskSlice";
import { BiSolidError } from "react-icons/bi";

const AddTask = () => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const showAddItemCard = useSelector((state) => state.addItemCard.flag);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);
  const [error, setError] = useState("");

  const taskItems = {
    taskid: uuidv4(),
    title: taskTitle,
    description: taskDescription,
    todo: true,
    inProgress: false,
    completed: false,
  };

  const handleTitleInput = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleCreateTask = (event) => {
    event.preventDefault();

    if (taskTitle.length === 0) {
      setError("Please enter a task title");
      return;
    }

    dispatch(addTask(taskItems));
    dispatch(addItemCard(false));
    setTaskTitle("");
    setTaskDescription("");
    dispatch(statusCheck(status));
    setStatus("");
    setError("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleClickOutside = (event) => {
    if (selectOpen) return;
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      dispatch(addItemCard(false));
    }
  };

  useEffect(() => {
    if (showAddItemCard) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div
      ref={containerRef}
      className="fixed z-50 right-0 left-0 mx-auto justify-between flex flex-col backdrop-filter rounded-md bg-[#161616] top-[25%] md:top-[18%] w-[95%] md:w-[55%] h-[50%] md:h-[60%]"
    >
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={handleTitleInput}
          className="bg-transparent my-8 mx-8 mt-16 text-2xl font-bold focus:outline-none text-white"
          placeholder="Task Title"
        ></input>
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-[90%] ml-8 bg-transparent focus:outline-none resize-none text-[#d1d1d1]"
          placeholder="Add Description..."
        ></textarea>
      </div>

      <div className="flex  items-center justify-between mb-10 ml-8">
        <FormControl
          variant="filled"
          sx={{
            m: 1,
            minWidth: 120,
            backgroundColor: "#292929",
            borderRadius: "6px",
          }}
        >
          <InputLabel sx={{ color: "#d1d1d1" }} id="demo-simple-select-label">
            Status
          </InputLabel>
          <Select
            label="Status"
            value={status}
            sx={{ color: "#d1d1d1", height: "3rem" }}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            onOpen={() => setSelectOpen(true)}
            onClose={() => setSelectOpen(false)}
          >
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <div className="items-center">
          <button
            onClick={handleCreateTask}
            className=" h-[3rem] flex gap-2 text-sm sm:text-lg items-center  px-6 mx-6 py-2 border-[1px] border-[#1B1B1B] bg-[#292929] rounded-md hover:bg-[#2e2e2e] transition duration-300  text-[#d5d5d5] "
          >
            Create Task
          </button>
        </div>
      </div>

      {error && (
        <span className="w-56 fixed bottom-10 mx-auto left-0 right-0 px-4 py-2 bg-red-800 rounded-md flex items-center justify-center">
          <BiSolidError className="mr-3 text-black" />
          {error}
        </span>
      )}
    </div>
  );
};

export default AddTask;
