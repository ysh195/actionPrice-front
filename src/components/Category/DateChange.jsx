/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { FormControl, TextField, Typography} from "@mui/material";
import Swal from "sweetalert2"; // Import SweetAlert

const DateChange = ({
  selectedStartDate,
  setSelectedStartDate,
  selectedEndDate,
  setSelectedEndDate,
}) => {
  // Set today's date as default for start and end date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Format as yyyy-mm-dd
    setSelectedStartDate(today);
    setSelectedEndDate(today);
  }, []); // This will only run once when the component mounts

  const today = new Date().toISOString().split("T")[0]; // Today's date in yyyy-mm-dd format

  // Validate if end date is before start date
  const validateEndDate = (startDate, endDate) => {
    if (endDate && endDate < startDate) {
      Swal.fire({
        icon: "error",
        title: "종료일 오류",
        text: "종료일은 시작일 이후여야 합니다.",
      });
      return false;
    }
    return true;
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setSelectedStartDate(newStartDate);
    // Validate the new start date

    // Ensure end date is valid after start date change
    validateEndDate(newStartDate, selectedEndDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setSelectedEndDate(newEndDate);
    // Validate the end date after start date is selected
    validateEndDate(selectedStartDate, newEndDate);
  };

  return (
    <div>
      <FormControl sx={{ width: "200px" }} margin="normal">
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: -20,
            fontSize: "0.75rem",
            color: "text.secondary",
            transition: "all 0.2s ease",
          }}
        >
          시작일
        </Typography>
        <TextField
          type="date"
          value={selectedStartDate}
          onChange={handleStartDateChange}
          InputProps={{
            inputProps: { max: today }, // Disable future dates
          }}
        />
      </FormControl>

      <FormControl sx={{ width: "200px" }} margin="normal">
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: -20,
            fontSize: "0.75rem",
            color: "text.secondary",
            transition: "all 0.2s ease",
          }}
        >
          종료일
        </Typography>
        <TextField
          type="date"
          value={selectedEndDate}
          onChange={handleEndDateChange}
          inputProps={{ max: today }}
        />
      </FormControl>
    </div>
  );
};

export default DateChange;
