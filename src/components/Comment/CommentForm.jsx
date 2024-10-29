/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/slices/commentSlice";
import { Box, Button, TextField, Typography } from "@mui/material";

const CommentForm = ({ postId, onNewComment }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.comment);
  const username = useSelector((state) => state.login.username);
  const [content, setContent] = useState("");

  const handleCreateComment = async () => {
    try {
       const newComment = await dispatch(
         createComment({ postId, content, username })
       ).unwrap();
      setContent("");
      onNewComment(newComment); // Notify parent about the new comment
    } catch (error) {
      console.error("Error adding comment:", error);
    }
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
          {loading ? "Loading..." : "Add Comment"}
        </Button>
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
