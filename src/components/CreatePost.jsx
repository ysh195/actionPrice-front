/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState } from "react";
import axios from "axios";
import { Paper, Typography, Button, TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/slices/postSlice";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const CreatePost = ({ onPostCreated }) => {
  const [newPost, setNewPost] = useState("");
  const [title, setTitle] = useState(""); // For the post title
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const username = useSelector((state) => state.login.username); // Assuming you have a user slice

  const handleCreatePost = async () => {
    try {
      const postData = {
        title,
        content: newPost,
        username,
      };
      await dispatch(createPost(postData)).unwrap();
      setNewPost("");
      setTitle("");
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        문의 내용을 작성해주세요
      </Typography>
      <TextField
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ marginTop: 2 }}
      />
      <TextField
        label="문의 내용"
        multiline
        rows={5}
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ marginTop: 2, marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleCreatePost}>
        등록
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Post created successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreatePost;
