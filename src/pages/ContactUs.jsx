// PostPage.js
import React, { useEffect, useState } from "react";
import { Paper, Typography, CircularProgress, Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/postSlice";
import CreatePost from "../components/CreatePost";
import PostTable from "../components/PostTable";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postList = [], loading, error } = useSelector((state) => state.post);

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
    <Paper sx={{ marginTop: 10, padding: 2, textAlign: "center" }}>
      <img
        src={logo}
        alt="Logo"
        style={{
          maxHeight: "30px",
          marginBottom: "10px",
          display: "flex",
        }}
      />
      <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
        문의 상황
      </Typography>
      <PostTable postList={postList} />
      <Button onClick={() => navigate("/api/post/create")}>문의하기</Button>
      {/* <CreatePost onPostCreated={handlePostCreated} /> */}
    </Paper>
  );
};

export default PostPage;
