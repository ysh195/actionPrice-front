/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import CommentEditView from "./CommentEditView";

const CommentItem = ({ comment, handleDelete, handleCommentUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    handleCommentUpdate(comment.commentId, content);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setContent(comment.content); // Reset to original content
    setIsEditing(false);
  };

  return (
    <Box
      sx={{ border: 1, borderColor: "grey.300", borderRadius: 2, p: 2, mb: 2 }}
    >
      {isEditing ? (
        <CommentEditView
          content={content}
          setContent={setContent}
          handleCommentUpdate={handleUpdate}
          handleCancel={handleCancel}
        />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                variant="subtitle1"
                color="primary.main"
                sx={{ mr: 2, color: "gray" }} // Add margin-right for spacing
              >
                {comment.username}
              </Typography>
              <Typography
                variant="subtitle1"
                color="primary.main"
                sx={{ mb: 1, color: "gray" }}
              >
                {new Date(comment.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {comment.content}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={handleEditClick}>
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(comment.commentId)}
            >
              Delete
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CommentItem;
