/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
  Pagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/postSlice";
import PostListView from "../components/Post/PostListView";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import PostSearch from "../components/Post/PostSearch";
import { createSelector } from "@reduxjs/toolkit";

const ContactUs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const selectPostState = (state) => state.post;

  const selectPostData = createSelector([selectPostState], (post) => ({
    postList: post.postList,
    loading: post.loading,
    error: post.error,
    totalPageNum: parseInt(post.totalPageNum, 10) || 1,
    currentPageNum: parseInt(post.currentPageNum) || 1,
  }));

  const { postList, loading, error, totalPageNum, currentPageNum } =
    useSelector(selectPostData);

  // Fetch posts when currentPageNum or keyword changes
  useEffect(() => {
    dispatch(fetchPosts({ pageNum: currentPageNum - 1, keyword })); // Adjust for API
  }, [dispatch, currentPageNum, keyword]);

  // Update URL when keyword changes
  useEffect(() => {
    const currentPath = keyword
      ? `/api/contact-us/${currentPageNum}/${keyword}`
      : `/api/contact-us/${currentPageNum}`;

    navigate(currentPath, { replace: true });
  }, [currentPageNum, keyword, navigate]);

  const handleSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
    navigate(`/api/contact-us/1/${searchKeyword}`); // Reset to the first page with keyword
  };

  const handleResetSearch = () => {
    setKeyword(""); // Reset keyword
    navigate(`/api/contact-us/1`); // Reset to the first page
  };

  const handlePageChange = (event, value) => {
    if (value < 1) return; // Prevent navigating to less than page 1
    navigate(`/api/contact-us/${value}/${keyword}`); // Update URL on page change

    dispatch(fetchPosts({ pageNum: value - 1, keyword })); // Adjust for API (0-based)
  };

  // Render loading spinner
  if (loading) {
    return (
      <Paper sx={{ marginTop: 2, padding: 2, textAlign: "center" }}>
        <CircularProgress />
      </Paper>
    );
  }

  // Render error message
  if (error) {
    return (
      <Paper sx={{ marginTop: 2, padding: 2, textAlign: "center" }}>
        <Typography color="error">{`Error: ${error}`}</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ marginTop: 2, padding: 2, textAlign: "center" }}>
      <img
        src={logo}
        alt="Logo"
        style={{ maxHeight: "30px", marginBottom: "10px", display: "flex" }}
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
        <PostSearch
          keyword={keyword}
          onSearch={handleSearch}
          onReset={handleResetSearch}
        />
      </Box>
      <PostListView postList={postList} />
      <Pagination
        count={totalPageNum} // Total number of pages from Redux state
        page={currentPageNum} // Current page
        onChange={handlePageChange}
        variant="outlined"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Paper>
  );
};

export default ContactUs;
