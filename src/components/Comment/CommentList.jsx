/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../redux/slices/commentSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function CommentList({ postId }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { commentList, loading, error, totalPageNum } = useSelector(
    (state) => state.comment
  );
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(fetchComments({ postId, page: page - 1 })); // Adjust for 0-based index in API
  }, [dispatch, postId, page]);

  const handlePageChange = (event, newPage) => {
    setSearchParams({ page: newPage });
  };

  const handleDeleteComment = (commentId) => {
    console.log("Deleting comment with ID:", commentId);
    dispatch(fetchComments({ postId, page: page - 1 }));
  };

  // Render loading spinner
  if (loading) return <CircularProgress />;
  // Render error message
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      {commentList.length > 0 ? (
        commentList.map((comment) => (
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
        count={totalPageNum}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </>
  );
}
