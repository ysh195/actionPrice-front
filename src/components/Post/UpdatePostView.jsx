/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, fetchPostForUpdate, updatePost } from "../../redux/slices/postSlice";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import PostHeader from "./PostHeader";
import Swal from "sweetalert2";
import { colors } from "../../assets/assest";

const UpdatePostView = () => {
 const { postId, username } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  const { post } = useSelector((state) => state.post);
  const [title, setTitle] = useState(post.title || "");
  const [content, setContent] = useState(post.content || "");


  console.log("check post in PostDetailPage:", post);
 useEffect(() => {
   dispatch(fetchPostForUpdate({ postId, username }));
 }, [dispatch, postId, username]);

  // Update title and content when post changes
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleUpdatePost = async () => {
    if (!title || !content) {
      setError("제목과 내용을 모두 입력하세요."); // Ensure title and content are not empty
      return;
    }

    const postData = { title, content, username:post.username };
    try {
      const result = await dispatch(
        updatePost({ postId: Number(postId), postData })
      );
      console.log("handleUpdatePost result", result);
      if (updatePost.fulfilled.match(result)) {
        Swal.fire({
          icon: "success",
          text: "게시글 수정이 완료되었습니다.",
          timer: 2000,
        });
        navigate(`/api/post/${postId}/detail`);
      } else {
        setError(result.payload || "Failed to update post.");
      }
    } catch (err) {
      console.error("게시글 업데이트에 실패했습니다", err);
      Swal.fire({
        icon: "error",
        text: "게시글 업데이트에 실패했습니다.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <Box
      sx={{
        width: "80%",
        margin: "auto",
        marginTop: "30px",
        padding: 2,
        textAlign: "center",
        boxShadow: 2,
        backgroundColor: "white",
      }}
    >
      <Paper sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          게시글 수정
        </Typography>
        <PostHeader post_owner={username} createdAt={post.createdAt} />
        <TextField
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "lightgray",
              },
              "&:hover fieldset": {
                borderColor: colors.tableHead,
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.button2,
              },
            },
          }}
        />
        <TextField
          label="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={12}
          fullWidth
          variant="outlined"
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "lightgray",
              },
              "&:hover fieldset": {
                borderColor: colors.tableHead,
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.button2,
              },
            },
          }}
        />
        {error && <Typography color="error">{error}</Typography>}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdatePost}
            sx={{ marginRight: 1 }}
          >
            수정하기
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => window.history.back()}
          >
            취소
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdatePostView;
