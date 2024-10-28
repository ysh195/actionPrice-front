/* eslint-disable no-empty-pattern */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postList: [],
  post: "",
  loading: false,
  error: null,
};

const API_URL = "http://localhost:8080/api/post";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    console.log(postData);
    try {
      const access_Token = localStorage.getItem("access_token");
      if (!access_Token) {
        alert("You need to log in to write a post.");
        return rejectWithValue("User not logged in");
      }
      const response = await axios.post(`${API_URL}/create`, postData, {
        headers: {
          Authorization: `Bearer ${access_Token}`,
        },
      });
      console.log("post response:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const fetchPosts = createAsyncThunk(
//   "posts/fetchPosts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/list`);
//       console.log("post list:", response);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data); // Handle errors appropriately
//     }
//   }
// );

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (page = 0, { rejectWithValue }) => {
    // Default to 0 if no page is passed
    try {
      const response = await axios.get(`${API_URL}/list`, { params: { page } });
      console.log("post list:", response);
      return response.data;
    } catch (error) {
      console.error("Fetch posts error:", error); // More detailed logging
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostDetails",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${postId}/detail`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, logined_username }, { rejectWithValue }) => {
    console.log("Post ID:", postId, "Logged-in Username:", logined_username);
    try {
      const access_Token = localStorage.getItem("access_token");
      if (!access_Token) {
        alert("You need to log in to update a post.");
        return;
      }
      const response = await axios.post(
        `${API_URL}/${postId}/delete`,
        { logined_username },
        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
          },
        }
      );
      console.log("deletePost response:", response);
      // Check if deletion was successful
      if (response.status === 200) {
        return postId; // Return the deleted post's id
      } else {
        throw new Error("Failed to delete the post");
      }
    } catch (error) {
      console.log("deletePost error:", error);
      return rejectWithValue(error.response?.data || "Error deleting post");
    }
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const access_Token = localStorage.getItem("access_token");
      if (!access_Token) {
        alert("You need to log in to update a post.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/${postId}/update`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_Token}`,
          },
        }
      );
      console.log("updatePost response:", response);
      return response.data;
    } catch (error) {
      console.log("updatePost error:", error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPostDetail: (state) => {
      state.post = null; // Action to clear post detail
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
        state.loading = false;
        // state.postList.push(action.payload);
        const postsToAdd = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        state.postList.push(...postsToAdd);
      })
      // Edit post
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const index = state.postList.findIndex(
          (post) => post.postId === updatedPost.postId
        );
        if (index >= 0) {
          state.postList[index] = updatedPost;
        }
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        state.postList = state.postList.filter((post) => post.postId !== id);
        console.log(action.payload);
      })
      //fetchPostById
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        console.log("aaaa", action.payload);
        state.post = action.payload; // Set post data
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      });
  },
});

// Export actions and reducer
export const { clearError, clearPostDetail } = postSlice.actions;
export default postSlice.reducer;
