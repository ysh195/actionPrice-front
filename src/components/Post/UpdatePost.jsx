/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, updatePost } from "../../redux/slices/postSlice";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import PostHeader from "./PostHeader";
import Swal from "sweetalert2";

const UpdatePost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { post } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const username = useSelector((state) => state.login.username);

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleUpdatePost = async () => {
    try {
      const postData = { title, content, username };
      const result = await dispatch(updatePost({ postId, postData }));
      console.log(result);
      if (updatePost.fulfilled.match(result)) {
        Swal.fire({
          icon: "success",
          text: "게시글 수정이 완료되었습니다.",
          timer: 2000,
        });
        navigate(`/api/post/${postId}/detail`);
      } else {
        setError(result.payload);
      }
    } catch (err) {
      console.err("게시글 업데이트에 실패했습니다", error);
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
        <PostHeader username={post.username} createdAt={post.createdAt} />
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
                borderColor: "#C5705D",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#CB6040",
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
                borderColor: "#C5705D",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#CB6040",
              },
            },
          }}
        />
        {error && <Typography color="error">{error}</Typography>}
        {username === post.username && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained" // Changed to contained for better visibility
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
        )}
      </Paper>
    </Box>
  );
};

export default UpdatePost;
