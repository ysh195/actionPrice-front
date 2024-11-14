/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense, lazy, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchPostById } from "../redux/slices/postSlice";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import CreateCommentForm from "../components/Comment/CreateCommentForm";
import { CommentList } from "../components/Comment/CommentList";

const PostHeader = React.memo(
  lazy(() => import("../components/Post/PostHeader"))
);
const PostContent = React.memo(
  lazy(() => import("../components/Post/PostContent"))
);
const PostActions = React.memo(
  lazy(() => import("../components/Post/PostActions"))
);

const PostDetailPage = () => {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading, error,  } = useSelector((state) => state.post);

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false); // State for comment form visibility

  console.log("PostDetailPage is rendered");

  useEffect(() => {
    if (!postId) return; // Early return if no postId
    console.log("api call for fetchPostById");
    dispatch(fetchPostById({ postId, page: page - 1 }));
  }, [dispatch, postId, page]);

    const handleClickCommentInput = () => {
      setIsCommentFormVisible(true); // Show comment form when input is clicked
    };

  const handleEdit = () => {
    console.log("Navigating to edit page...");
    navigate(`/api/post/${postId}/update/${post?.username}`);
  };


  if (error) return <Typography color="error">{`Error: ${error}`}</Typography>;

  return (
    <Suspense fallback={loading ? <CircularProgress /> : null}>
      <Container
        sx={{
          minHeight: "100vh",
          margin: "auto",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        {/* Post section */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            padding: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff", // Ensure background color remains intact
          }}
        >
          <Box sx={{ padding: 3, border: "1px solid #e0e0e0" }}>
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
              isCommentFormVisible={isCommentFormVisible}
              setIsCommentFormVisible={setIsCommentFormVisible}
            />

            {isCommentFormVisible && <CreateCommentForm postId={postId} />}
            {/* <CreateCommentForm postId={postId} /> */}
          </Box>
        </Box>

        {/* Comments section */}
        <Box
          sx={{
            padding: 3,
            width: "100%",
            maxHeight: "600px", // Limit the height of comments section
            overflowY: "scroll", // Enable scrolling
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: 2, // Add spacing between post content and comments
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar
            },
          }}
        >
          <CommentList postId={postId} />
        </Box>
      </Container>
    </Suspense>
  );
};

export default PostDetailPage;
