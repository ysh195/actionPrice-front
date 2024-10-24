import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, fetchPostById } from "../redux/slices/postSlice"; // Thunk to fetch post details
import { Button, CircularProgress, Typography } from "@mui/material";

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostById(postId)); // Fetch post details when the component mounts
  }, [dispatch, postId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await dispatch(deletePost(postId)); // Dispatch the delete action
      navigate("/"); // Redirect to the post list or desired page after deletion
    }
  };

  const handleEdit = () => {
    navigate(`/post/${postId}/update`); // Navigate to the edit page (you'll need to create this)
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{`Error: ${error}`}</Typography>;

  return (
    <div>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="body1">{post.content}</Typography>
      <Button variant="contained" color="primary" onClick={handleEdit}>
        Edit
      </Button>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default PostDetail;
