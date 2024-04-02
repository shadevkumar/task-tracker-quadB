import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskCard } from "../features/addTaskCard/addTaskCardSlice";
import { v4 as uuidv4 } from "uuid";
import { addTask, statusCheck } from "../features/taskCard/taskSlice";
import { BiSolidError } from "react-icons/bi";

// Component for adding a new task
const AddTask = () => {
  const dispatch = useDispatch(); // To dispatch actions
  const containerRef = useRef(); // Ref for the component container to handle clicks outside
  const displayAddTaskCard = useSelector((state) => state.addTaskCard.flag); // Flag to control display of the add task card

  // State for task details
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState(""); // Task status (todo, inProgress, completed)
  const [selectOpen, setSelectOpen] = useState(false); // State to handle select dropdown to not tackel with handleOutside
  const [error, setError] = useState(""); // State for error messages

  // Object to hold the new task details
  const taskItems = {
    taskid: uuidv4(), // Unique ID for each task
    title: taskTitle,
    description: taskDescription,
    todo: true,
    inProgress: false,
    completed: false,
  };

  // Handles changes to the task title input
  const handleTitleInput = (event) => {
    setTaskTitle(event.target.value);
  };

  // Handles the creation of a new task
  const handleCreateTask = (event) => {
    event.preventDefault();

    if (taskTitle.length === 0) {
      setError("Please enter a task title");
      return;
    }

    dispatch(addTask(taskItems));
    dispatch(addTaskCard(false)); // To hide/display Add Task Component UI
    dispatch(statusCheck(status));

    // Reset task details to empty
    setTaskTitle("");
    setTaskDescription("");
    setStatus("");
    setError("");
  };

  // Effect to clear error after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [error]);

  // Handles clicks outside the add task card to close it
  const handleClickOutside = (event) => {
    if (selectOpen) return;
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      dispatch(addTaskCard(false));
    }
  };

  // Effect to add/remove event listener for handling clicks outside
  useEffect(() => {
    if (displayAddTaskCard) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div
      ref={containerRef}
      className="fixed z-50 right-0 left-0 mx-auto justify-between flex flex-col backdrop-filter rounded-md bg-[#141414] top-[25%] md:top-[18%] w-[95%] md:w-[55%] h-[50%] md:h-[60%]"
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
            sx={{
              color: "#d1d1d1",
              height: "3rem",
              "& .MuiSvgIcon-root": {
                // Customize dropdown icon color
                color: "#d1d1d1",
              },
            }}
            onChange={(e) => setStatus(e.target.value)} // Update task status on change
            open={selectOpen}
            onOpen={() => setSelectOpen(true)} // Handle select dropdown open
            onClose={() => setSelectOpen(false)} // Handle select dropdown close
          >
            <MenuItem value={"todo"}>To Do</MenuItem>
            <MenuItem value={"inProgress"}>In Progress</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
          </Select>
        </FormControl>
        <button
          onClick={handleCreateTask} // Trigger task creation
          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>
      {error && ( // Display error message if any
        <span className="w-56 fixed bottom-10 mx-auto left-0 right-0 px-4 py-2 bg-red-800 rounded-md flex items-center justify-center text-white">
          <BiSolidError className="mr-3  text-white" />
          {error}
        </span>
      )}
    </div>
  );
};

export default AddTask;
