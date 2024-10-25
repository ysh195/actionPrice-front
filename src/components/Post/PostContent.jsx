/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Typography } from "@mui/material";

const PostContent = React.memo(({ content }) => {
  return (
    <Typography
      variant="body1"
      sx={{
        maxHeight: "400px",
        display: "flex", // Enable flexbox
        alignItems: "flex-start", // Align items to the start
        margin: 2,
        minHeight: "200px",
        overflowY: "auto", // Enable vertical scrolling if content exceeds height
        overflowX: "auto", // Hide horizontal overflow
      }}
    >
      {content}
    </Typography>
  );
});
PostContent.displayName = "PostContent";
export default PostContent;
