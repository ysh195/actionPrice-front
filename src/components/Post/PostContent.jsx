/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Typography } from "@mui/material";

const PostContent = React.memo(({ content }) => {
  return (
    <Typography
      variant="body1"
      sx={{
        marginTop: 2,
        minHeight: "100px", 
        overflowY: "auto", // Enable vertical scrolling if content exceeds height
        overflowX: "hidden", // Hide horizontal overflow
      }}
    >
      {content}
    </Typography>
  );
})
PostContent.displayName = "PostContent";
export default PostContent;
