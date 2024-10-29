/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, setCurrentPage } from "../redux/slices/postSlice";
import PostListView from "../components/Post/PostListView";

import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/images/logo.png";
import PostSearch from "../components/Post/PostSearch";

const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postList, loading, error } = useSelector((state) => state.post);
  const [pageNum, setPageNum] = useState(1);

  console.log("check postList in PostPage:", postList);

  // Fetch posts on component mount or pageNum changes
  useEffect(() => {
    dispatch(fetchPosts({ pageNum, keyword: "" })); // Initial fetch without keyword
  }, [dispatch, pageNum]);

  const handleSearch = (keyword) => {
    setPageNum(1);
    dispatch(fetchPosts({ pageNum: 1, keyword }));
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <Paper sx={{ marginTop: 2, padding: 2, textAlign: "center" }}>
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
          width: "100%",
          marginBottom: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/api/post/create")}
          sx={{ backgroundColor: "#2c3e50" }}
        >
          문의하기
        </Button>
        <PostSearch onSearch={handleSearch} />
      </Box>
      <PostListView postList={postList} />
    </Paper>
  );
};

export default PostPage;
