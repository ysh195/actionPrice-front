/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { Comment } from "./Comment"; // Make sure to import your Comment component

export function CommentList({ comments }) {
  return (
    <Box>
      {comments.map((comment) => (
        <Box key={comment.id} mb={2}>
          <Comment {...comment} />
        </Box>
      ))}
    </Box>
  );
}
