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
import {useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/images/logo.png";
import PostSearch from "../components/Post/PostSearch";
import { colors } from "../assets/assest";


const ContactUs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || ""; // Get keyword from searchParams
  const pageNum = parseInt(searchParams.get("pageNum")) || 1; // Get current page number from searchParams
  const { postList, loading, error, totalPageNum } =
    useSelector((state) => state.post);

  // Fetch posts when pageNum or keyword changes
  useEffect(() => {
    dispatch(fetchPosts({ pageNum: pageNum - 1, keyword })); // Adjust for API (0-based index)
  }, [dispatch, pageNum, keyword]);

  // Handle search submission
  const handleSearch = (searchKeyword) => {
    setSearchParams({ pageNum: 1, keyword: searchKeyword }); // Reset to first page and set keyword
    dispatch(fetchPosts({ pageNum: 0, keyword: searchKeyword }));
  };

  const handleResetSearch = () => {
    setSearchParams({ pageNum: 1 }); // Reset to the first page
  };

  const handlePageChange = (event, value) => {
    if (value < 1) return; // Prevent navigating to less than page 1
    setSearchParams({ pageNum: value, keyword }); // Update pageNum while retaining keyword
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
          sx={{ backgroundColor: colors.primary }}
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
        page={pageNum} // Current page
        onChange={handlePageChange}
        variant="outlined"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Paper>
  );
};

export default ContactUs;
