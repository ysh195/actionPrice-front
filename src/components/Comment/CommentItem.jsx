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
  const logined_username = localStorage.getItem("username");

  const dispatch = useDispatch();

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // yyyy-mm-dd format
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateComment = async () => {
    if (logined_username !== comment.username) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "댓글을 수정할 권한이 없습니다.",
        showConfirmButton: true,
      });
      return;
    }
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
      setErrorMessage("댓글 수정에 문제 생겼습니다. 다시 시도해주세요.");
    }
  };

  const handleDelete = async () => {
    if (logined_username !== comment.username) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "댓글을 삭제할 권한이 없습니다",
        showConfirmButton: true,
      });

      return;
    }
    const { isConfirmed } = await Swal.fire({
      text: "댓글을 삭제한 후에는 복구할 수 없습니다. 진행하시겠습니까?",
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
                {formatDate(comment.createdAt)}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {comment.content}
            </Typography>
          </Box>
          {logined_username === comment.username && (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" onClick={handleEditClick}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          )}
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
