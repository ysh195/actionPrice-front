/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";

const Comment = ({ username, commentContent }) => {
  return (
    <Box border={1} borderColor="grey.300" p={2}>
      <Typography variant="subtitle1" fontWeight="bold">
        {username}
      </Typography>
      <Typography variant="body1">{commentContent}</Typography>
    </Box>
  );
};

export default Comment;
