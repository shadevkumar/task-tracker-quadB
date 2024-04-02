import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import { statusMap } from "../utils/taskUtils";
import { useTaskActions } from "../utils/taskActions";

//Update Status Select MUI Component
const StatusSelect = ({ task }) => {
  const { handleStatusChange } = useTaskActions(); // Hook to handle status change actions
  const currentStatus = task.status; // Retrieve the current status of the task

  return (
    <FormControl
      variant="filled"
      sx={{
        m: 1,
        minWidth: 120,
        backgroundColor: "#292929",
        borderRadius: "6px",
      }}
    >
      <InputLabel sx={{ color: "#d1d1d1" }}>Change Status</InputLabel>
      <Select
        value={currentStatus}
        onChange={(e) => handleStatusChange(task.taskid, e.target.value)} // Handle status change on selection
        sx={{
          color: "#d1d1d1",
          height: "2rem",
          "& .MuiSvgIcon-root": { color: "#d1d1d1" },
        }}
      >
        {Object.entries(statusMap) // Map status options to menu items
          .filter(([key]) => key !== currentStatus) // Exclude the current status from options
          .map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

// PropType validation for the task prop
StatusSelect.propTypes = {
  task: PropTypes.shape({
    taskid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default StatusSelect;
