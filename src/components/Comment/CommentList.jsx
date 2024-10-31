/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import CommentItem from "./CommentItem";
import { useDispatch } from "react-redux";
import { fetchComments } from "../../redux/slices/commentSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function CommentList({ postId }) {
  const dispatch = useDispatch();
  const [localCommentList, setLocalCommentList] = useState([]);
  const { commentList, loading, error, totalPageNum, currentPageNum } =
    useSelector((state) => state.comment);

  console.log("check commentList in commentList component:", commentList);

  const validCurrentPage = Number.isInteger(currentPageNum)
    ? currentPageNum
    : 0;
  const validTotalPageNum = Number.isInteger(totalPageNum) ? totalPageNum : 0;
  // Fetch comments when the component mounts or when the postId changes
  useEffect(() => {
    dispatch(fetchComments({ postId, page: 0, size: 10 }));
  }, [dispatch, postId]);

  // Update local state when Redux state changes
  useEffect(() => {
    setLocalCommentList(commentList);
  }, [commentList]);

  const handlePageChange = (event, newPage) => {
    const pageToFetch = newPage - 1; // Convert to 0-based index for fetching
    if (pageToFetch >= 0 && pageToFetch < totalPageNum) {
      dispatch(fetchComments({ postId, page: pageToFetch, size: 10 }));
    }
  };

  // pass a callback function from the CommentList to the CommentItem to handle the deletion and update the local state
  const handleDeleteComment = (commentId) => {
    // Remove the comment from the local state immediately
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
        count={validTotalPageNum} // Total number of pages from Redux state
        page={validCurrentPage} // Display 1-based index to users
        onChange={handlePageChange}
        variant="outlined"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
}
