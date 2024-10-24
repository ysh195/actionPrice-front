import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById, updatePost } from "../redux/slices/postSlice";
import { Button, TextField, Typography } from "@mui/material";

const EditPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(fetchPostById(postId)); // Fetch the post when component mounts
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleUpdate = async () => {
    const updatedPost = { title, content };
    await dispatch(updatePost({ postId, updatedPost })); // Dispatch update action
    navigate(`/post/${postId}/detail`); // Redirect to post details
  };

  return (
    <div>
      <Typography variant="h5">Edit Post</Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Post
      </Button>
    </div>
  );
};

export default EditPost;
