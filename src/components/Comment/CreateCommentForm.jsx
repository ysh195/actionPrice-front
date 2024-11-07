/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createComment,
  fetchAdminAnswers,
} from "../../redux/slices/commentSlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import AnswerModal from "./AnswerModal";
import { adminAnswers } from "../../assets/assest";

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.comment);
  // const username = useSelector((state) => state.login.username);
  const username = localStorage.getItem("username");

  const [content, setContent] = useState("");
  // const role = useSelector((state) => state.login.role);
  const role = localStorage.getItem("role");
  const [modalOpen, setModalOpen] = useState(false);

  console.log("adminAnswers:", adminAnswers);

  const handleCreateComment = async () => {
    try {
      const newComment = await dispatch(
        createComment({ postId, content, username })
      ).unwrap();

      console.log("newComment", newComment);
      setContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAdminClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmitAnswer = (answertype) => {
    console.log("Selected Answer:", answertype);
    setContent(answertype);
    dispatch(fetchAdminAnswers({ postId, answertype })); //
  };

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "grey.300",
        borderRadius: 2,
        p: 2,
        mb: 2,
        bgcolor: "background.paper",
        transition: "0.2s",
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
        Add a Comment
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <TextField
          multiline
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          placeholder="Write a comment..."
          rows={1}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading || !content.trim()} // Disable if loading or input is empty
          color="primary"
          onClick={handleCreateComment}
        >
          {loading ? "Loading..." : "추가"}
        </Button>

        {role === "ROLE_ADMIN" && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdminClick}
            >
              Admin
            </Button>
            <AnswerModal
              open={modalOpen}
              onClose={handleModalClose}
              adminAnswers={adminAnswers}
              onSubmit={handleSubmitAnswer}
            />
          </>
        )}
      </Box>
      {error && (
        <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CommentForm;
