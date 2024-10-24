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
    const currentUser = useSelector((state) => state.login.username);


  const handleEdit = () => {
    navigate(`/api/post/${postId}/update`);
  };
  console.log(postId);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await dispatch(deletePost(postId));
      navigate("/api/contact-us");
    }
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
        {currentUser === username && (
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleEdit}
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
});
PostActions.displayName = "PostActions";
export default PostActions;
