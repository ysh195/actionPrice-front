/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const CommentEditView = ({ content, setContent, onUpdate, onCancel }) => {
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
      <Typography variant="h6" sx={{ mb: 1 }}>
        댓글 수정
      </Typography>
      <TextField
        multiline
        fullWidth
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        required
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button color="primary" onClick={onUpdate} sx={{ border: "none" }}>
          저장
        </Button>
        <Button color="error" onClick={onCancel} sx={{ border: "none" }}>
          취소
        </Button>
      </Box>
    </Box>
  );
};

export default CommentEditView;
