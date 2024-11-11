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
import { adminAnswers } from "../../assets/assest";
import Swal from "sweetalert2";

const CreateCommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.comment);
  const username = localStorage.getItem("username");
  const [content, setContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const role = localStorage.getItem("role");

  console.log("CreateCommentForm is rendered");

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
      <Box display="flex" alignItems="center">
        <TextField
          multiline
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용 등록하세요"
          rows={2}
          fullWidth
        />

        {role === "ROLE_ADMIN" && (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAdminClick}
            >
              Admin
            </Button>
            <AnswerModal
              open={modalOpen}
              onClose={handleModalClose}
              adminAnswers={adminAnswers}
              onSubmit={handleSubmitAnswer}
            />
          </>
        )}
        {content.trim() && (
          <>
            <Button
              type="submit"
              color="primary"
              onClick={handleCreateComment}
              sx={{ border: "none" }}
            >
              {loading ? "로딩..." : "등럭"}
            </Button>
            <Button
              color="secondary"
              onClick={handleCancelComment}
              sx={{ border: "none" }}
            >
              취소
            </Button>
          </>
        )}
      </Box>
      {error && (
        <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CreateCommentForm;
