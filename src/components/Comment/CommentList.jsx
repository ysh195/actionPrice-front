/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import CommentItem from "./CommentItem";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../../redux/slices/commentSlice";


export function CommentList({ commentList, postId }) {
  const dispatch = useDispatch();

  const handleDelete = (commentId, logined_username) => {
    dispatch(deleteComment({ postId, commentId, logined_username }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      {Array.isArray(commentList) && commentList.length > 0 ? (
        commentList.map((comment) => (
          <Box
            key={comment.commentId}
            sx={{
              border: 1,
              borderColor: "grey.300",
              borderRadius: 2,
              p: 2,
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
              // handleCommentUpdate={handleCommentUpdate}
              handleDelete={handleDelete}
            />
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      )}
    </Box>
  );
}
