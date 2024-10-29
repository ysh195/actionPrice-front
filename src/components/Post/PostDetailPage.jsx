/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense, lazy, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById } from "../../redux/slices/postSlice";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import CommentForm from "../Comment/CommentForm";
import { CommentList } from "../Comment/CommentList";

const PostHeader = lazy(() => import("./PostHeader"));
const PostContent = lazy(() => import("./PostContent"));
const PostActions = lazy(() => import("./PostActions"));

const PostDetailPage = () => {
  // retrieves the postId from the URL.
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [commentPageNum, setCommentPageNum] = useState(0);

  const [showCommentForm, setShowCommentForm] = useState(false);
  const { post, loading, commentList, error } = useSelector(
    (state) => state.post
  );
  const [localCommentList, setLocalCommentList] = useState(commentList);

  const handleShowCommentForm = () => {
    setShowCommentForm((prev) => !prev);
  };



  console.log("check post in PostDetailPage component:", post);
  console.log("check commentList in PostDetailPage component:", commentList);

  useEffect(() => {
    dispatch(fetchPostById({ postId, commentPageNum }));
  }, [dispatch, postId, commentPageNum]);

  useEffect(() => {
    setLocalCommentList(commentList); // Sync local state with Redux state
  }, [commentList]); // Update local state whenever Redux state changes

    const handleNewComment = (newComment) => {
      console.log("New comment added:", newComment);
          setLocalCommentList((prevComments) => [...prevComments, newComment]);

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
          />
          <section>
            <div className="mt-4">
              {showCommentForm && (
                <CommentForm postId={postId} onNewComment={handleNewComment} />
              )}
              <CommentList commentList={commentList} postId={postId} />
            </div>
            {/* <button
              onClick={handlePreviousPage}
              disabled={commentPageNum === 0}
            >
              Previous ||
            </button>
            <button onClick={handleNextPage}>Next</button> */}
          </section>
        </Paper>
      </Box>
    </Suspense>
  );
};

export default PostDetailPage;
