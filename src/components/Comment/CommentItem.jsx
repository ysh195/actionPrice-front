/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import CommentEditView from "./CommentEditView";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../../redux/slices/commentSlice";
import Swal from "sweetalert2";
import { colors } from "../../assets/assest";

const CommentItem = ({ comment, postId, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [errorMessage, setErrorMessage] = useState(null);
  const logined_username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const dispatch = useDispatch();

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      console.error("Invalid date:", date);
      return "Invalid Date"; // Return a fallback message
    }
    return parsedDate.toISOString().split("T")[0]; // Return formatted date
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateComment = async () => {
    if (logined_username !== comment.username && role !== "ROLE_ADMIN") {
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
    if (logined_username !== comment.username && role !== "ROLE_ADMIN") {
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
    <>
      {isEditing ? (
        <CommentEditView
          content={content}
          setContent={setContent}
          onUpdate={handleUpdateComment}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              p: 2,
              border: "1px solid #E0E0E0",
              boxShadow: 1,
            }}
          >
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ color: colors.green }}>
                {comment.username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatDate(comment.createdAt)}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 2, mb: 1 }}>
                {comment.content}
              </Typography>
              {(logined_username === comment.username ||
                role === "ROLE_ADMIN") && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    onClick={handleEditClick}
                    sx={{ border: "none" }}
                  >
                    수정
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                    sx={{ border: "none" }}
                  >
                    삭제
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>
        </>
      )}
    </>
  );
};

export default CommentItem;
