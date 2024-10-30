/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense, lazy, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById } from "../../redux/slices/postSlice";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import CommentForm from "../Comment/CommentForm";
import { CommentList } from "../Comment/CommentList";

const PostHeader = React.memo(lazy(() => import("./PostHeader")));
const PostContent = React.memo(lazy(() => import("./PostContent")));
const PostActions = React.memo(lazy(() => import("./PostActions")));

const PostDetailPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentPageNum, setCommentPageNum] = useState(0);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const { post, loading, commentList, error } = useSelector(
    (state) => state.post
  );
  const [localCommentList, setLocalCommentList] = useState(commentList);

  const handleShowCommentForm = () => {
    setShowCommentForm((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchPostById({ postId, commentPageNum }));
  }, [dispatch, postId, commentPageNum]);

  useEffect(() => {
    setLocalCommentList(commentList); // Sync local state with Redux state
  }, [commentList]);

  const handleNewComment = (newComment) => {
    setLocalCommentList((prevComments) => [...prevComments, newComment]);
  };

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
              {showCommentForm && (
                <CommentForm postId={postId} onNewComment={handleNewComment} />
              )}
              <CommentList commentList={localCommentList} postId={postId} />
            </div>
          </section>
        </Paper>
      </Box>
    </Suspense>
  );
};

export default PostDetailPage;
