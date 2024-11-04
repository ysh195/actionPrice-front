/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  commentList: [],
  loading: false,
  error: null,
  currentPageNum: 0,
  totalPageNum: 0,
  listSize: 0,
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
      console.log("create comment API Response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//function: updateComment //
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ postId, commentId, username, content }, { rejectWithValue }) => {
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

//function: deleteComment //
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ postId, commentId, username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${postId}/detail/${commentId}/delete`,
        { username }
      );
      console.log("deleteComment response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting comment:", error);
      return rejectWithValue(
        error.response?.data || "Failed to delete comment"
      );
    }
  }
);
//function: fetchComments //
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ postId, page=0, size=10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/comments`, {
        params: { postId, page, size },
      });
      console.log("fetchComments response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch comments"
      );
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.commentList.push(action.payload); // Safely push new comment
    },
    setCommentCurrentPage: (state, action) => {
      state.currentPageNum = action.payload; // Set the current page explicitly
    },
    resetComments(state) {
      state.commentList = [];
      state.totalPageNum = 0;
      state.currentPageNum = 0;
    },
  },
  extraReducers: (builder) => {
    builder

      //create Comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.commentList.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //update Comment
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
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
      //delete Comment
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
        state.error = action.payload;
      })
      //fetch Comment
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload.commentList)) {
          state.commentList = action.payload.commentList;
        } else {
          console.error(
            "commentList is not an array:",
            action.payload.commentList
          );
        }
        state.totalPageNum = action.payload.totalPageNum;
        state.currentPageNum = action.payload.currentPageNum;
        state.listSize = action.payload.listSize;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addComment, setCommentCurrentPage, resetComments } =
  commentSlice.actions;

export default commentSlice.reducer;
