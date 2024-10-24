import React from "react";
import { Typography, Divider, Box } from "@mui/material";
//prevent unnecessary re-renders when the props have not changed.
const PostHeader = React.memo(({ title, username, createdAt }) => {
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ margin: "16px 0" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: 1,
          paddingX:3,
        }}
      >
        <Typography variant="subtitle1">작성자: {username}</Typography>
        <Typography variant="subtitle1">
          작성일: {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </Box>
      <Divider sx={{ margin: "16px 0" }} />
    </div>
  );
});

// Set display name for easier debugging
PostHeader.displayName = "PostHeader";

export default PostHeader;
