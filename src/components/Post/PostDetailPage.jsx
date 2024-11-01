/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense, lazy, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById } from "../../redux/slices/postSlice";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import CreateCommentForm from "../Comment/CreateCommentForm";
import { CommentList } from "../Comment/CommentList";
import { fetchComments } from "../../redux/slices/commentSlice";

const PostHeader = React.memo(lazy(() => import("./PostHeader")));
const PostContent = React.memo(lazy(() => import("./PostContent")));
const PostActions = React.memo(lazy(() => import("./PostActions")));

const PostDetailPage = () => {
  const { postId, commentPageNum } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCommentForm, setShowCommentForm] = useState(false);

  const { post, loading, error } = useSelector((state) => state.post);

  const currentPageNum = parseInt(commentPageNum, 10) || 0; // Parse commentPageNum

  const handleShowCommentForm = () => {
    setShowCommentForm((prev) => !prev);
  };

  useEffect(() => {
    console.log("PostDetailPage mounted with postId:", postId);
    dispatch(fetchPostById(postId)); // Fetch the post
  }, [dispatch, postId]);

  useEffect(() => {
    // Fetch comments only if post data is available
    if (post) {
      console.log(
        "Fetching comments for postId:",
        postId,
        "Page:",
        currentPageNum
      );
      dispatch(fetchComments({ postId, page: currentPageNum, size: 10 }));
    }
  }, [dispatch, post, postId, currentPageNum]); // Depend on post

  // useEffect(() => {
  //   console.log(
  //     "PostDetailPage mounted with postId:",
  //     postId,
  //     "and commentPageNum:",
  //     commentPageNum
  //   );

  //   dispatch(fetchPostById({ postId, commentPageNum }));
  // }, [dispatch, postId, commentPageNum]);

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
          <PostActions
            postId={post.postId}
            post_owner={post.username}
            onCommentClick={handleShowCommentForm}
            onEdit={handleEdit}
          />
          <section>
            <div className="mt-4">
              {showCommentForm && <CreateCommentForm postId={postId} />}
              <CommentList postId={postId} />
            </div>
          </section>
        </Paper>
      </Box>
    </Suspense>
  );
};

export default PostDetailPage;
