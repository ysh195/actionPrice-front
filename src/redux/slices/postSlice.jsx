/* eslint-disable no-empty-pattern */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postList: [],
  postDetail: null,
  loading: false,
  error: null,
};

const API_URL = "http://localhost:8080/api/post";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    console.log(postData);
    const response = await axios.post(`${API_URL}/createPost`, postData);
    console.log(response);
    return response.data; // Assuming the response contains the created post
    // return response.data.data.message;
  }
);

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${API_URL}/list`);
  return response.data; // Assuming your API returns an object with a "content" property
});

export const onePostDetails = createAsyncThunk(
  "posts/fetchPostDetails",
  async ({ id }) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Adjust based on the API response structure
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, postData }) => {
    const response = await axios.put(`${API_URL}/${id}/update`, postData);
    return response.data; // Assuming the response contains the updated post
    // return response.data.data.message;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`${API_URL}/${id}/deletePost`);
  return id; // Return the deleted post's id
  //  return response.data.data.message;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPostDetail: (state) => {
      state.postDetail = null; // Action to clear post detail
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.postList = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create post
      .addCase(createPost.fulfilled, (state, action) => {
        state.postList.push(action.payload); // Add the new post to the postList
      })
      // Edit post
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const index = state.postList.findIndex(
          (post) => post.id === updatedPost.id
        );
        if (index >= 0) {
          state.postList[index] = updatedPost;
        }
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        state.postList = state.postList.filter(
          (post) => post.id !== id
        );
      })
      .addCase(onePostDetails.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(onePostDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.postDetail = action.payload; // Set post data
      })
      .addCase(onePostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; ; // Set error message
      });
  },
});

// Export actions and reducer
export const { clearError, clearPostDetail } = postSlice.actions;
export default postSlice.reducer;
