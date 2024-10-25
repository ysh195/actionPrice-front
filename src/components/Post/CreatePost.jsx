/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState } from "react";

import {
  Paper,
  Typography,
  Button,
  TextField,
  Snackbar,
  Container,
  Box,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const CreatePost = () => {
  const [newPost, setNewPost] = useState("");
  const [title, setTitle] = useState(""); // For the post title
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation

  const username = useSelector((state) => state.login.username);
  console.log(username);

  const handleCreatePost = async () => {
    try {
      
      const postData = {
        title,
        content: newPost,
        username,
      };
      const createdPost = await dispatch(createPost(postData)).unwrap();
      console.log("created post:", createdPost);
      navigate(`/api/post/${createdPost.postId}/detail`);

      setNewPost("");
      setTitle("");

      setOpenSnackbar(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const handleCancel = () => {
    setTitle("");
    setNewPost("");
  };

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column", // Stack items vertically
      }}
    >
      <Typography variant="h5" gutterBottom>
        문의 내용을 작성해주세요
      </Typography>
      <Paper sx={{ padding: 2, textAlign: "center" }}>
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
        >
          <TextField disabled id="outlined-disabled" value={username || ""} />
        </Box>
        <TextField
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          variant="outlined"
          required
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
          required
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <Button variant="outlined" onClick={handleCreatePost}>
          게시글 등록
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          style={{ marginLeft: "10px" }}
        >
          취소
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Snackbar at the top
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            게시글이 성공적으로 등록되었습니다!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default CreatePost;
