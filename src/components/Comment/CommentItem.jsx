/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, Button, Divider, Snackbar, Typography } from "@mui/material";
import CommentEditView from "./CommentEditView";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../../redux/slices/commentSlice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

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
    if (logined_username !== comment.username) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "You are not allowed to delete this comment.",
        showConfirmButton: true,
      });

      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this comment!",
      icon: "warning",
      showCancelButton: true,
    });

    if (isConfirmed) {
      await dispatch(
        deleteComment({
          postId,
          commentId: comment.commentId,
          username: logined_username,
        })
      ).unwrap();
      onDelete(comment.commentId);
      Swal.fire({
        title: "Deleted",
        icon: "success",
        text: "게시글이 삭제 되었습니다.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
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
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />
    </Box>
  );
};

export default CommentItem;
