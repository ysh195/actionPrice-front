/* eslint-disable no-unused-vars */
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const CreatePostView = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isSecret, setIsSecret] = useState(false); // State for secret mode

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation

  // const username = useSelector((state) => state.login.username);
  const username = localStorage.getItem("username");

  const handleCreatePost = async () => {
    if (title && content && username) {
      try {
        const postData = {
          title,
          content,
          username,
          published: !isSecret,
        };
        const createdPost = await dispatch(createPost(postData)).unwrap();
        console.log("createdPost:", createdPost);
        navigate(`/api/post/${createdPost.postId}/detail`);
        setOpenSnackbar(true);
      } catch (error) {
        setError(error.message);
      }
    }
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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
        minHeight: "100vh",
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          fullWidth
          required
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isSecret}
              onChange={(e) => setIsSecret(e.target.checked)}
              color="primary"
            />
          }
          label="비밀 모드 (다른 사용자가 볼 수 없습니다)"
        />

        <Button variant="outlined" onClick={handleCreatePost}>
          게시글 등록
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => window.history.back()}
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

export default CreatePostView;
