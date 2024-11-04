/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Pagination, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PostListView from "../Post/PostListView";
import { getMyPosts } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import PostSearch from "../Post/PostSearch";

const MyPosts = ({ username, myPosts, keyword, pageNum, handlePageChange }) => {
  const dispatch = useDispatch();

  console.log("myPosts:", myPosts);
  useEffect(() => {
    if (username) {
      dispatch(getMyPosts({ username, keyword: "", pageNum: pageNum -1 }));
    }
  }, [dispatch, username, keyword, pageNum]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        {username}님의 게시글 목록
      </Typography>
      <PostSearch
        keyword={keyword}
        // onSearch={handleSearch}
        // onReset={handleResetSearch}
      />

      <PostListView postList={myPosts} />
      <Pagination
        //  count={totalPageNum}
        page={pageNum}
        onChange={handlePageChange}
        variant="outlined"
        sx={{
          marginTop: 2,
          display: "flex",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

export default MyPosts;
