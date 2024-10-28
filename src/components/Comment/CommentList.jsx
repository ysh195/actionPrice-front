/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

import Comment from "./Comment";


export function CommentList({ CommentList }) {
  // Ensure postId is passed as a prop
  return (
    <Box>
      {CommentList && CommentList.length > 0 ? (
        CommentList.map((comment) => (
          <Box key={comment.id} mb={2}>
            <Comment {...comment} />
            {/* Assuming Comment takes props for rendering */}
          </Box>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </Box>
  );
}
