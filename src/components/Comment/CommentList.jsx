/* eslint-disable react/prop-types */
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, setCommentCurrentPage } from "../../redux/slices/commentSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CommentList({ postId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { commentList, loading, error, totalPageNum } = useSelector(
    (state) => state.comment
  );
  const [localCommentList, setLocalCommentList] = useState([]);
    const { currentPageNum } = useSelector((state) => state.comment);

  // Update local state when Redux state changes
  useEffect(() => {
    setLocalCommentList(commentList);
  }, [commentList]);

const handlePageChange = (event, newPage) => {
  navigate(`/api/post/${postId}/detail/${newPage}`); // Update URL with new page
  dispatch(fetchComments({ postId, page: newPage - 1 })); // Fetch comments for new page
  dispatch(setCommentCurrentPage(newPage - 1)); // Update current page in Redux
};


  const handleDeleteComment = (commentId) => {
     console.log("Deleting comment with ID:", commentId);
    setLocalCommentList((prevComments) =>
      prevComments.filter((comment) => comment.commentId !== commentId)
    );
      dispatch(fetchComments({ postId, page: currentPageNum - 1 }));

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
        page={currentPageNum} // Convert to 1-based index for display
        onChange={handlePageChange}
        variant="outlined"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
}
