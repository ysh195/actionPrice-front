import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, updatePost } from "../redux/slices/postSlice";
import { Paper, Typography, Button, Box, Snackbar, TextField, Alert } from "@mui/material";

import PostHeader from "../components/Post/PostHeader"; // Import the PostHeader component

// const Alert = React.forwardRef((props, ref) => (
//   <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
// ));

const EditPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading, error } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchPostById(postId)); // Fetch post details
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleUpdatePost = async () => {
    try {
      await dispatch(updatePost({ id: postId, title, content }));
      setOpenSnackbar(true);
      // Optionally navigate back to post detail
      navigate(`/api/post/${postId}/detail`);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{`Error: ${error}`}</Typography>;

  return (
    <Paper sx={{ padding: 3, width: "80%", margin: "auto" }}>
      <PostHeader
        title={title}
        username={post.username}
        createdAt={post.createdAt}
      />
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          variant="outlined"
          required
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdatePost}
          >
            Update Post
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Post updated successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default EditPost;
