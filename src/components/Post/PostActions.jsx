/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Box, Divider, Alert, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../redux/slices/postSlice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const PostActions = React.memo(
  ({ postId, post_owner, onCommentClick, onEdit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logined_username = useSelector((state) => state.login.username);

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
        navigate("/api/contact-us/:pageNum/:keyword?");
      } else {
        console.log("Post deletion canceled.");
      }
    };
    //function: handleComment //
    const handleComment = () => {
      onCommentClick();
    };

    return (
      <>
        <Divider sx={{ margin: "16px 0" }} />

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
              sx={{ marginRight: 1 }}
            >
              목록보기
            </Button>
            <Button variant="outlined" color="primary" onClick={handleComment}>
              답글쓰기
            </Button>
          </Box>
          {logined_username === post_owner && (
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onEdit}
                sx={{ marginRight: 1 }}
              >
                글수정
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
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
