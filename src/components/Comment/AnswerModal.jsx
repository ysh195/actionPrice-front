/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { adminAnswers } from "../../assets/assest";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AnswerModal = ({ open, onClose, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);


  console.log("AnswerModal is rendered");

  const handleSubmit = () => {
    if (selectedAnswer) {
      onSubmit(selectedAnswer); // Pass the selected answer to parent component
      onClose();
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Select an Answer
        </Typography>

        <Select
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Choose an answer
          </MenuItem>
          {adminAnswers.map((answer) => (
            <MenuItem key={answer.id} value={answer.text}>
              {answer.answerType}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
        <Button variant="contained" onClick={onClose} sx={{ marginTop: 2 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default AnswerModal;
