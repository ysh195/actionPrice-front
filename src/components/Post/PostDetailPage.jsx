/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../redux/slices/postSlice";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";

const PostHeader = lazy(() => import("./PostHeader"));
const PostContent = lazy(() => import("./PostContent"));
const PostActions = lazy(() => import("./PostActions"));
const CommentSection = lazy(() => import("../Comment/CommentSection"));

const PostDetailPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{`Error: ${error}`}</Typography>;

  return (
    <Suspense fallback={<CircularProgress />}>
      <Box
        sx={{
          width: "80%",
          margin: "auto",
          marginTop: "30px",
          padding: 2,
          textAlign: "center",
          boxShadow: 2,
          backgroundColor: "white",
        }}
      >
        <Paper sx={{ padding: 2 }}>
          <PostHeader
            title={post.title}
            username={post.username}
            createdAt={post.createdAt}
          />
          <PostContent content={post.content} />
          <PostActions postId={post.postId} username={post.username} />
          {/* <CommentSection comments={comments} /> */}
        </Paper>
      </Box>
    </Suspense>
  );
};

export default PostDetailPage;
