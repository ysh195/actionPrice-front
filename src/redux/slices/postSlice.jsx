/* eslint-disable no-empty-pattern */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postList: [],
  postDetail: null,
  loading: false,
  error: null,
  updateUrl: null,
};

const API_URL = "http://localhost:8080/api/post";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    console.log(postData);
    try {
      const response = await axios.post(`${API_URL}/create`, postData);
      console.log("post response:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/list`);
      console.log("post list:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors appropriately
    }
  }
);

export const onePostDetails = createAsyncThunk(
  "posts/fetchPostDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data; // Adjust based on the API response structure
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk("posts/updatePost", async (id) => {
  const response = await axios.put(`${API_URL}/${id}/update`, id);
  return response.data;
});

export const UpdatePostUrl = createAsyncThunk(
  "posts/fetchUpdatePostUrl",
  async (postId) => {
    const response = await axios.get(`${API_URL}/${postId}/update`);
    return response.data; // Adjust based on your API response structure
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`${API_URL}/${id}/delete`);
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
        console.log("postList", action.payload);
        // state.postList = action.payload;
            state.postList = Array.isArray(action.payload)
              ? action.payload
              : [action.payload];

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
        state.postList = state.postList.filter((post) => post.id !== id);
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
        state.error = action.error.message; // Set error message
      })
      .addCase(UpdatePostUrl.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdatePostUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.updateUrl = action.payload.data.url; // Adjust based on your response structure
      })
      .addCase(UpdatePostUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { clearError, clearPostDetail } = postSlice.actions;
export default postSlice.reducer;
