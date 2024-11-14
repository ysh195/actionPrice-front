/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Box, Divider } from "@mui/material";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../redux/slices/postSlice";
import Swal from "sweetalert2";

const PostActions = React.memo(
  ({
    postId,
    post_owner,
    onEdit,
    setIsCommentFormVisible,
    isCommentFormVisible,
  }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logined_username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    //function: handleDelete //
    const handleDelete = async () => {
      const { isConfirmed } = await Swal.fire({
        title: "잠깐!",
        text: "삭제된 게시글은 복구할 수 없습니다!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "삭제하기!",
        cancelButtonText: "취소",
      });

      if (isConfirmed) {
        const result = await dispatch(deletePost({ postId, logined_username }));
        Swal.fire({
          icon: result.error ? "error" : "success",
          text: result.error
            ? "게시글이 삭제에 실패되었습니다."
            : "게시글이 삭제 되었습니다.",
          timer: 2000,
        });
        if (!result.error) navigate("/api/contact-us");
      } else {
        console.log("Post deletion canceled.");
      }
    };

    return (
      <>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Button
              variant="outlined"
              onClick={() => navigate("/api/contact-us")}
              sx={{ border: "none" }}
            >
              목록보기
            </Button>
            {!isCommentFormVisible && (
              <Button
                variant="outlined"
                onClick={() => setIsCommentFormVisible(true)}
                sx={{ border: "none" }}
              >
                댓글 추가
              </Button>
            )}
          </Box>
          {(logined_username === post_owner || role === "ROLE_ADMIN") && (
            <Box>
              <Button
                color="secondary"
                onClick={onEdit}
                sx={{ border: "none" }}
              >
                글수정
              </Button>
              <Button
                color="error"
                onClick={handleDelete}
                sx={{ border: "none" }}
              >
                글삭제
              </Button>
            </Box>
          )}
        </Box>
        <Divider sx={{ margin: "16px 0" }} />
      </>
    );
  }
);
PostActions.displayName = "PostActions";
export default PostActions;
