/* eslint-disable react/prop-types */
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  resetComments,
  setCommentCurrentPage,
} from "../../redux/slices/commentSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CommentList({ postId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { commentList, loading, error, totalPageNum, currentPageNum } =
    useSelector((state) => state.comment);

  const [localCommentList, setLocalCommentList] = useState([]);

  // Fetch comments when postId changes
  useEffect(() => {
    if (postId) {
      dispatch(resetComments());
      dispatch(setCommentCurrentPage(0)); // Reset to page 0 when postId changes
      console.log("Fetching comments for postId:", postId);
      dispatch(fetchComments({ postId, page:0, size: 10 })); // Fetch comments for the first page
    }
  }, [dispatch, postId]);

  // Update local state when Redux state changes
  useEffect(() => {
    setLocalCommentList(commentList);
  }, [commentList]);

  const handlePageChange = (event, newPage) => {
    const pageToFetch = newPage - 1; // Convert to 0-based index for fetching
    if (pageToFetch >= 0 && pageToFetch < totalPageNum) {
      console.log("Changing to page:", newPage); // Log page change

      // Update the URL with the new page number
      navigate(`/api/post/${postId}/detail/${newPage}`);

      // Dispatch action to set the current page
      dispatch(setCommentCurrentPage(pageToFetch)); // Set the current page in Redux

      // Fetch comments for the new page
      dispatch(fetchComments({ postId, page: pageToFetch, size: 10 }));
    }
  };

  const handleDeleteComment = (commentId) => {
    setLocalCommentList((prevComments) =>
      prevComments.filter((comment) => comment.commentId !== commentId)
    );
  };

  // Render loading spinner
  if (loading) return <CircularProgress />;
  // Render error message
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      {localCommentList.length > 0 ? (
        localCommentList.map((comment) => (
          <Box
            key={comment.commentId}
            sx={{
              borderRadius: 2,
              mb: 2,
              bgcolor: "background.paper",
              transition: "0.2s",
              "&:hover": {
                boxShadow: 2,
              },
            }}
          >
            <CommentItem
              comment={comment}
              postId={postId}
              onDelete={handleDeleteComment}
            />
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      )}
      <Pagination
        count={totalPageNum} // Total number of pages from Redux state
        page={currentPageNum + 1} // Convert to 1-based index for display
        onChange={handlePageChange}
        variant="outlined"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
}
