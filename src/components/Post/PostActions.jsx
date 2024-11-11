/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Box, Divider, Alert, Stack, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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

    //function: handleDelete //
    const handleDelete = async () => {
      if (!logined_username) {
        alert("You need to be logged in to delete a post.");
        return;
      }
      // Show confirmation popup
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this post!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
      // Check if the user confirmed the deletion
      if (confirmation.isConfirmed) {
        const result = await dispatch(deletePost({ postId, logined_username }));
        if (deletePost.fulfilled.match(result)) {
          console.log("Post deleted successfully:", result.payload);
          Swal.fire({
            icon: "success",
            text: "게시글이 삭제 되었습니다.",
            timer: 2000,
          });
        } else {
          console.error("Failed to delete post:", result.error);
        }
        navigate("/api/contact-us");
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
          {logined_username === post_owner && (
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
