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
  const { pageNum: paramPageNum } = useParams();
  const [pageNum, setPageNum] = useState(Number(paramPageNum) || 1);
  const [keyword, setKeyword] = useState("");

  const selectPostState = (state) => state.post;

  const selectPostData = createSelector([selectPostState], (post) => ({
    postList: post.postList,
    loading: post.loading,
    error: post.error,
    totalPageNum: parseInt(post.totalPageNum, 10) || 1,
  }));

  const { postList, loading, error, totalPageNum } =
    useSelector(selectPostData);
  const [noResults, setNoResults] = useState(false);

  // Fetch posts when pageNum or keyword changes
  useEffect(() => {
    console.log("Fetching posts with:", { pageNum: pageNum - 1, keyword });

    dispatch(fetchPosts({ pageNum: pageNum - 1, keyword })); // Adjust for API
  }, [dispatch, pageNum, keyword]);

  useEffect(() => {
    // Update the URL only when the current page or keyword changes
    const currentPath = keyword
      ? `/api/contact-us/${pageNum}/${keyword}`
      : `/api/contact-us/${pageNum}`;

    if (currentPath !== window.location.pathname) {
      console.log("Navigating to:", currentPath);
      navigate(currentPath, { replace: true });
    }
  }, [pageNum, keyword, navigate]);

  useEffect(() => {
    if (postList.length === 0 && keyword) {
      setNoResults(true); // Set no results state if keyword is present
    } else {
      setNoResults(false); // Reset no results state
    }
  }, [postList, keyword]);

  const handleSearch = (searchKeyword) => {
    setKeyword(searchKeyword); // Set the keyword for searching
    setPageNum(1); // Reset to the first page
  };

  const handleResetSearch = () => {
    setKeyword(""); // Reset keyword
    setPageNum(1); // Reset to the first page
  };

  const handlePageChange = (event, value) => {
    if (value < 1) return; // Prevent navigating to less than page 1
    setPageNum(value); // Update the current page
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
          onSearch={handleSearch} // Ensure this is the function that sets the keyword
          onReset={handleResetSearch}
        />
      </Box>
      {noResults && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          No results found for: "{keyword}"
        </Typography>
      )}
      <PostListView postList={postList} />
      <Pagination
        count={totalPageNum} // Total number of pages from Redux state
        page={pageNum} // Current page
        onChange={handlePageChange}
        variant="outlined"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Paper>
  );
};

export default ContactUs;
