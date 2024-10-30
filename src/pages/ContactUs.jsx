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
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/images/logo.png";
import PostSearch from "../components/Post/PostSearch";
import { createSelector } from "@reduxjs/toolkit";

const ContactUs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageNum: paramPageNum, keyword: paramKeyword } = useParams();
  const [pageNum, setPageNum] = useState(Number(paramPageNum) || 1);
  const [keyword, setKeyword] = useState(
    paramKeyword && paramKeyword !== ":keyword" ? paramKeyword : ""
  );

  // Base selector to get post state
  const selectPostState = (state) => state.post;

  // Memoized selector
  const selectPostData = createSelector([selectPostState], (post) => ({
    postList: post.postList,
    loading: post.loading,
    error: post.error,
    totalPageNum: parseInt(post.totalPageNum, 10) || 1,
    currentPageNum: parseInt(post.currentPageNum, 10) || 1,
  }));
      const { postList, loading, error, totalPageNum, currentPageNum } =
        useSelector(selectPostData);
  //frontend expects pageNum starting from 1, its 0 in backend
  // Fetch posts based on pageNum and keyword
  useEffect(() => {
    console.log("Fetching posts with:", { pageNum: pageNum - 1, keyword });

    dispatch(fetchPosts({ pageNum: pageNum - 1, keyword })); // Adjust for API
  }, [dispatch, pageNum, keyword]);

  // Update the URL when pageNum or keyword changes
  useEffect(() => {
    console.log("Navigating to:", `/api/contact-us/${pageNum}/${keyword}`);
    navigate(`/api/contact-us/${pageNum}/${keyword}`, { replace: true });
  }, [pageNum, keyword, navigate]);

  const handleSearch = (searchKeyword) => {
    const safeKeyword = searchKeyword || ""; // Default to empty if no search
    setKeyword(safeKeyword);
    setPageNum(1); // Reset to the first page
    navigate(`/api/contact-us/1/${safeKeyword}`); // Navigate with the new keyword
  };

  const handlePageChange = (event, value) => {
    if (value < 1) return; // Prevent navigating to less than page 1

    setPageNum(value); // Update the current page
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
