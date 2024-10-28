/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/slices/commentSlice";
import { Box, Button, TextField, Typography } from "@mui/material";

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.comment);

  const username = useSelector((state) => state.login.username);

  const [content, setContent] = useState("");

  const handleAddComment = () => {
    event.preventDefault();
    console.log("sending addComment datas:", postId, username, content);
    dispatch(addComment({ postId, content, username }))
      .unwrap()
      .then(() => {
        setContent("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments: {error}</div>;

  return (
    <form onSubmit={handleAddComment}>
      <Box display="flex" flexDirection="column" gap={1}>
        <TextField
          multiline
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          placeholder="Write a comment..."
          rows={3}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          color="primary"
        >
          {loading ? "Loading..." : "Post"}
        </Button>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </Box>
    </form>
  );
};

export default CommentForm;
