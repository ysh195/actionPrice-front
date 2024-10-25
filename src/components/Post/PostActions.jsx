/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../redux/slices/postSlice";
import { useSelector } from "react-redux";

const PostActions = React.memo(({ postId, username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logined_username = useSelector((state) => state.login.username);
  console.log("logined_username:",logined_username);

  const handleEdit = () => {
    navigate(`/api/post/${postId}/update`);
  };

  const handleDelete = async () => {
    if (!logined_username) {
      alert("You need to be logged in to delete a post.");
      return;
    }
    const result = await dispatch(deletePost({ postId, logined_username }));
    if (deletePost.fulfilled.match(result)) {
      console.log("Post deleted successfully:", result.payload);
      // You can redirect or update the UI accordingly
    } else {
      console.error("Failed to delete post:", result.error);
      // Handle the error accordingly
    }

    navigate("/api/contact-us");
  };

  const handleComment = () => {
    // 답글 작성 로직
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
        {/* {logined_username === username && ( */}
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleEdit}
              sx={{ marginRight: 1 }}
            >
              글수정
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
            >
              글삭제
            </Button>
          </Box>
        {/* )} */}
      </Box>
      <Divider sx={{ margin: "16px 0" }} />
    </>
  );
});
PostActions.displayName = "PostActions";
export default PostActions;
