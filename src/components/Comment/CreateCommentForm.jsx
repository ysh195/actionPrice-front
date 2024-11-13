/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  createComment,
  fetchAdminAnswers,
} from "../../redux/slices/commentSlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import AnswerModal from "./AnswerModal";
import { adminAnswers, colors } from "../../assets/assest";
import Swal from "sweetalert2";

const CreateCommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.comment);
  const username = localStorage.getItem("username");
  const [content, setContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const role = localStorage.getItem("role");

  console.log("CreateCommentForm is rendered");

  const commentButtonStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      color: "white",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
    "&:focus": {
      outline: "none", // Remove focus outline
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
    },
  };

  const handleCreateComment = async () => {
    if (!content.trim()) {
      Swal.fire({
        icon: "warning",
        title: "내용 필수입니다.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    try {
      const newComment = await dispatch(
        createComment({ postId, content, username })
      ).unwrap();

      console.log("newComment", newComment);

      setContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAdminClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmitAnswer = (answertype) => {
    console.log("Selected Answer:", answertype);
    dispatch(fetchAdminAnswers({ postId, answertype }))
      .unwrap()
      .then((answer) => {
        console.log("Fetched answer:", answer);
        setContent(answer);
      })
      .catch((error) => {
        console.error("Error fetching admin answer:", error);
      });
  };

  const handleCancelComment = () => {
    setContent("");
  };

  return (
    <Box>
      <Box display="flex">
        <TextField
          multiline
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용 등록하세요"
          rows={2}
          fullWidth
        />

        {content.trim() && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              type="submit"
              onClick={handleCreateComment}
              //  sx={{ border: "none", color: colors.green }}
              sx={{commentButtonStyles }}
            >
              {loading ? "로딩..." : "등록"}
            </Button>
            <Button
              onClick={handleCancelComment}
              sx={{ border: "none", color: colors.darkBrown }}
            >
              취소
            </Button>
          </Box>
        )}
      </Box>
      {role === "ROLE_ADMIN" && (
        <Box sx={{ display: "flex", mt: 2 }}>
          <Button variant="outlined" color="primary" onClick={handleAdminClick}>
            Admin
          </Button>
          <AnswerModal
            open={modalOpen}
            onClose={handleModalClose}
            adminAnswers={adminAnswers}
            onSubmit={handleSubmitAnswer}
          />
        </Box>
      )}

      {error && (
        <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CreateCommentForm;
