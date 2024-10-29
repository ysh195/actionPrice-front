/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const CommentEditView = ({
  content,
  setContent,
  handleCommentUpdate,
  handleCancel,
}) => {

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "grey.300",
        borderRadius: 2,
        p: 2,
        bgcolor: "background.paper",
        boxShadow: 1,
        mb: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Edit Comment
      </Typography>
      <TextField
        multiline
        fullWidth
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder="Update your comment here..."
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentUpdate}
        >
          Update Comment
        </Button>
        <Button variant="outlined" color="error" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CommentEditView;
