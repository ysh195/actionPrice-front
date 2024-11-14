/* eslint-disable react/prop-types */
import React from "react";
import { Typography, Divider, Box } from "@mui/material";
//prevent unnecessary re-renders when the props have not changed.
const PostHeader = React.memo(({ title, post_owner, createdAt, updatedAt }) => {
  //todo: edit date formatting, it gives error
  // const formatDate = (createdAt) => {
  //   const parsedDate = new Date(createdAt);
  //   if (isNaN(parsedDate)) {
  //     console.error("Invalid date:", createdAt);
  //     return "Invalid Date"; // Return a fallback message
  //   }
  //   return parsedDate.toISOString().split("T")[0]; // Return formatted date
  // };

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ margin: "16px 0" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: 1,
          paddingX: 2,
        }}
      >
        <Typography variant="subtitle1">작성자:{post_owner}</Typography>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
            작성일: {new Date(createdAt).toLocaleDateString()}
            {/* 작성일: {formatDate(createdAt)} */}
          </Typography>
          {updatedAt ? (
            <Typography variant="subtitle1">
              수정일: {new Date(updatedAt).toLocaleDateString()}
              {/* 수정일: {formatDate(updatedAt)} */}
            </Typography>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Divider sx={{ margin: "16px 0" }} />
    </div>
  );
});

// Set display name for easier debugging
PostHeader.displayName = "PostHeader";

export default PostHeader;
