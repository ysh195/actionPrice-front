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
          답변 선택하세요
        </Typography>

        <Select
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            답변 목록
          </MenuItem>
          {adminAnswers.map((answer) => (
            <MenuItem key={answer.id} value={answer.answerType}>
              {answer.answerType}
            </MenuItem>
          ))}
        </Select>
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            sx={{ marginTop: 2, marginRight: 1 }} // optional: adds spacing between buttons
          >
            등록
          </Button>
          <Button color="secondary" onClick={onClose} sx={{ marginTop: 2 }}>
            취소
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AnswerModal;
