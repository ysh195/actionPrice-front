/* eslint-disable no-unused-vars */
// PostPage.js
import React, { useEffect} from "react";
import { Paper, Typography, CircularProgress, Box, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/postSlice";
import PostList from "../components/Post/PostList";

import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postList, loading, error } = useSelector((state) => state.post);

  console.log("postList:", postList);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          marginBottom: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/api/post/create")}
          sx={{ backgroundColor: "#2c3e50" }}
        >
          문의하기
        </Button>
      </Box>
      <PostList postList={postList} />
    </Paper>
  );
};

export default PostPage;
