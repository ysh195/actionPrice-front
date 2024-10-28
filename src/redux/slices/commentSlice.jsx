/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  commentList: [],
  loading: false,
  error: null,
};

const API_URL = "http://localhost:8080/api/post";

export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async ({ postId, page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/comments`, {
        params: { postId, page, size },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log("fetchCommentsByPostId response:", response);
      return response.data; // Ensure this returns the Page object
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, username, content }, { rejectWithValue }) => {
    console.log("getting addComment datas:", postId, username, content);
    try {
      const response = await axios.post(
        `${API_URL}/${postId}/detail`,
        { postId, username, content },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("addComment response:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.content; // Assuming payload has a content array
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        // state.comments.push(action.payload);
        const commentToAdd = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        state.commentList.push(...commentToAdd);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
