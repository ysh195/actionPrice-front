/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, Button, Divider, Snackbar, Typography } from "@mui/material";
import CommentEditView from "./CommentEditView";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../../redux/slices/commentSlice";
import { useSelector } from "react-redux";

const CommentItem = ({ comment, postId, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [errorMessage, setErrorMessage] = useState(null);
  const logined_username = useSelector((state) => state.login.username);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateComment = async () => {
    try {
      await dispatch(
        updateComment({
          postId,
          commentId: comment.commentId,
          username: logined_username,
          content,
        })
      ).unwrap(); // To handle resolved/rejected states
      setIsEditing(false);
    } catch (error) {
      setErrorMessage("Failed to update comment.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      try {
        await dispatch(
          deleteComment({
            postId,
            commentId: comment.commentId,
            username: logined_username,
          })
        ).unwrap();
        if (onDelete) {
          onDelete(comment.commentId); // Call the onDelete function to update the list
        }
      } catch (error) {
        setErrorMessage("Failed to delete comment.");
      }
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };
  return (
    <Box sx={{ border: 1, borderColor: "grey.300", borderRadius: 2, p: 2 }}>
      {isEditing ? (
        <CommentEditView
          content={content}
          setContent={setContent}
          onUpdate={handleUpdateComment}
          onCancel={() => setIsEditing(false)}
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
                sx={{ mb: 1, color: "gray" }}
              >
                {comment.username}
              </Typography>
              <Typography variant="caption" color="textSecondary">
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
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </>
      )}
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Box>
  );
};

export default CommentItem;
