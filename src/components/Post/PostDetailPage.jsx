/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense, lazy, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../redux/slices/postSlice";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";

import { CommentList } from "../Comment/CommentList";
import CommentForm from "../Comment/CommentForm";

const PostHeader = lazy(() => import("./PostHeader"));
const PostContent = lazy(() => import("./PostContent"));
const PostActions = lazy(() => import("./PostActions"));
const CommentSection = lazy(() => import("../Comment/CommentForm"));

const PostDetailPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector((state) => state.post);
   const { commentList} = useSelector((state) => state.comment);
  const [commentPageNum, setCommentPageNum] = useState(0);

  console.log("post:",post)

  useEffect(() => {
    dispatch(fetchPostById({ postId, commentPageNum })); // Fetch the post details
  }, [dispatch, postId, commentPageNum]);


  const handleNextPage = () => {
    setCommentPageNum((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCommentPageNum((prev) => Math.max(prev - 1, 0));
  };

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
            post_owner={post.username}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
          />
          <PostContent content={post.content} />
          <PostActions postId={post.postId} post_owner={post.username} />
          <section>
            {/* <CommentForm loading={loading} error={error}/> */}

            <div className="mt-4">
              <CommentForm postId={postId} />
              <CommentList comments={commentList} postId={postId} />
            </div>
            <button
              onClick={handlePreviousPage}
              disabled={commentPageNum === 0}
            >
              Previous
            </button>
            <button onClick={handleNextPage}>Next</button>
          </section>
        </Paper>
      </Box>
    </Suspense>
  );
};

export default PostDetailPage;
