import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import { getTaskStatus, statusMap } from "../utils/taskUtils";
import { useTaskActions } from "../utils/taskActions";

const StatusSelect = ({ task }) => {
  const { handleStatusChange } = useTaskActions();
  const currentStatus = getTaskStatus(task);

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
        onChange={(e) => handleStatusChange(task.taskid, e.target.value)}
        sx={{
          color: "#d1d1d1",
          height: "2rem",
          "& .MuiSvgIcon-root": { color: "#d1d1d1" },
        }}
      >
        {Object.entries(statusMap)
          .filter(([key]) => key !== currentStatus)
          .map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

StatusSelect.propTypes = {
  task: PropTypes.shape({
    taskid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
};

export default StatusSelect;
