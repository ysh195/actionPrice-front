// PostPage.js
import React, { useEffect, useState } from "react";
import { Paper, Typography, CircularProgress } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/postSlice";
import CreatePost from "../components/CreatePost";
import PostTable from "../components/PostTable";

const PostPage = () => {
  const dispatch = useDispatch();
  const { postList =[], loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handlePostCreated = () => {
    dispatch(fetchPosts()); // Refresh posts when a new post is created
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <CreatePost onPostCreated={handlePostCreated} />
      <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
        Other Users Posts
      </Typography>
      <PostTable postList={postList} />
    </Paper>
  );
};

export default PostPage;
