import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemCard } from "../features/addItemCard/addItemCardSlice";
import { v4 as uuidv4 } from "uuid";
import { addTask, statusCheck } from "../features/taskCard/taskSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const showAddItemCard = useSelector((state) => state.addItemCard.flag);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);

  const handleTitleInput = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleCreateTask = (event) => {
    event.preventDefault();

    dispatch(addTask(taskItems));
    dispatch(addItemCard(false));
    setTaskTitle("");
    setTaskDescription("");
    dispatch(statusCheck(status));
    setStatus("");
  };

  const taskItems = {
    taskid: uuidv4(),
    title: taskTitle,
    description: taskDescription,
    todo: true,
    inProgress: false,
    completed: false,
  };

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
      className="absolute z-10 right-0 left-0 mx-auto justify-between flex flex-col backdrop-filter rounded-md bg-[#1c1c1c]/60 backdrop-blur-xl top-[18%] w-[55%] h-[60%]"
    >
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={handleTitleInput}
          className="bg-transparent my-8 mx-8 mt-16 text-2xl font-bold focus:outline-none"
          placeholder="Task Title"
        ></input>
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-[90%] ml-8 bg-transparent focus:outline-none resize-none"
          placeholder="Add Description..."
        ></textarea>
      </div>

      <div className="flex  items-center justify-between mb-10 ml-8">
        <FormControl
          variant="filled"
          sx={{
            m: 1,
            minWidth: 120,
            backgroundColor: "#3F3E51",
            borderRadius: "6px",
          }}
        >
          <InputLabel sx={{ color: "#d1d1d1" }} id="demo-simple-select-label">
            Status
          </InputLabel>
          <Select
            label="Status"
            value={status}
            sx={{ color: "#d1d1d1" }}
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
            className="bg-[#575AC6] shadow-inner shadow-[#000000]/40 text-sm font-bold mx-4 mr-14 px-4 py-2  rounded-md"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
