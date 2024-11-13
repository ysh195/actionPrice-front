/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Backdrop,
  Box,
  CircularProgress,
  Pagination,
  Typography,

} from "@mui/material";
import React, { useEffect } from "react";
import PostListView from "../Post/PostListView";
import { getMyPosts} from "../../redux/slices/myPageSlice";
import { useDispatch, useSelector } from "react-redux";
import PostSearch from "../Post/PostSearch";
import { useSearchParams } from "react-router-dom";

const MyPosts = ({ username }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const pageNum = parseInt(searchParams.get("pageNum")) || 1;
  const { myPosts, loading, totalPageNum } = useSelector(
    (state) => state.myPage
  );

  useEffect(() => {
    if (username) {

      dispatch(getMyPosts({ username, keyword, pageNum: pageNum - 1 }));
    }
  }, [dispatch, username, keyword, pageNum]);

  const handleSearch = (searchKeyword) => {
    setSearchParams({ pageNum: 1, keyword: searchKeyword });
    dispatch(getMyPosts({ username, keyword: searchKeyword, pageNum: 0 }));
  };

  const handleResetSearch = () => {
    setSearchParams({ pageNum: 1, keyword: "" });
  };

  const handlePageChange = (event, value) => {
    if (value < 1 || value > totalPageNum) return;
    setSearchParams({ pageNum: value, keyword });
  };

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h5" gutterBottom>
        {username}님의 게시글 목록
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
      >
        <PostSearch
          keyword={keyword}
          onSearch={handleSearch}
          onReset={handleResetSearch}
        />
      </Box>

      <PostListView postList={myPosts} pageNum={pageNum} />
      <Pagination
        count={totalPageNum}
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
