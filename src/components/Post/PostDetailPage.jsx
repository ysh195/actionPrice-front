/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense, lazy, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchPostById } from "../../redux/slices/postSlice";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import CreateCommentForm from "../Comment/CreateCommentForm";
import { CommentList } from "../Comment/CommentList";

const PostHeader = React.memo(lazy(() => import("./PostHeader")));
const PostContent = React.memo(lazy(() => import("./PostContent")));
const PostActions = React.memo(lazy(() => import("./PostActions")));

const PostDetailPage = () => {
  const { postId } = useParams();
  console.log("Post ID:", postId);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    if (!postId) return; // Early return if no postId
    dispatch(fetchPostById({ postId, page: page - 1 }));
  }, [dispatch, postId, page]);

  const handleEdit = () => {
    console.log("Navigating to edit page...");
    navigate(`/api/post/${postId}/update/${post?.username}`);
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
          border: "1px solid blue",
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          {/* <Paper sx={{ padding: 2,}}> */}
            <PostHeader
              title={post.title}
              post_owner={post.username}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
            <PostContent content={post.content} />
            <PostActions
              postId={post.postId}
              post_owner={post.username}
              onEdit={handleEdit}
            />
          {/* </Paper> */}
        </Box>
        <Paper sx={{ padding: 2, border: "1px solid pink" }}>
          <section>
            <div className="mt-4">
              <CreateCommentForm postId={postId} />
              <CommentList postId={postId} />
            </div>
          </section>
        </Paper>
      </Box>
    </Suspense>
  );
};

export default PostDetailPage;
