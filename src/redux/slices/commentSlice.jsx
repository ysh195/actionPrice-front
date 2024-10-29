/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  commentList: [],
  loading: false,
  error: null,
};

const API_URL = "http://localhost:8080/api/post";

//function: createComment //
export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ postId, username, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${postId}/detail`,
        { username, content },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("create comment API Response:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (
    { postId, commentId, username, content },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/${postId}/detail/${commentId}/update`,
        {
          username,
          content,
        }
      );
      console.log("updateComment response:", response);
      return response.data;
    } catch (error) {
      console.error("Error updating comment:", error);
      return rejectWithValue(
        error.response?.data || "Failed to update comment"
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ postId, commentId, logined_username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${postId}/detail/${commentId}/delete`,
        {
          data: { logined_username }, // Pass the username in the request body
        }
      );
      console.log("deleteComment response:", response);
  
      return response.data;
     
    } catch (error) {
      console.error("Error deleting comment:", error);
      return rejectWithValue(
        error.response?.data || "Failed to delete comment"
      );
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        console.log("createComment payload", action.payload);
        state.commentList.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        console.log("updatedComment", action.payload);
        const updatedComment = action.payload;
        const index = state.commentList.findIndex(
          (comment) => comment.id === updatedComment.id
        ); // Find the index of the updated comment
        if (index !== -1) {
          state.commentList[index] = updatedComment;
        }
      })
      .addCase(updateComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        // Remove the deleted comment from the state
        state.commentList = state.commentList.filter(
          (comment) => comment.id !== action.payload.commentId
        );
      })
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
