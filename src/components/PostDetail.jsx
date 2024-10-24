import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { onePostDetails } from "../redux/slices/postSlice"; // Thunk to fetch post details
import { CircularProgress, Typography } from "@mui/material";

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { postDetail, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(onePostDetails(postId)); // Fetch post details when the component mounts
  }, [dispatch, postId]);

  console.log(postDetail);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{`Error: ${error}`}</Typography>;

  return (
    <div>
      <Typography variant="h4">{postDetail.title}</Typography>
      <Typography variant="body1">{postDetail.content}</Typography>
    </div>
  );
};

export default PostDetail;
