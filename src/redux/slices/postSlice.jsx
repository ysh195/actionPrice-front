import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate, axiosPublic } from "../apiConfig";

const initialState = {
  postList: [],
  commentList: [],
  post: {},
  loading: false,
  error: null,
  currentPageNum: 0,
  totalPageNum: 0,
  listSize: 0,
};

//function: createPost //
// export const createPost = createAsyncThunk(
//   "posts/createPost",
//   async (postData, { rejectWithValue }) => {
//     let access_Token = localStorage.getItem("access_token");
//     console.log("slice post data:", postData);
//     if (!access_Token) {
//       console.log("there is no access token:", access_Token);
//       alert("You need to log in to write a post.");
//       return rejectWithValue("User not logged in");
//     }
//     try {
//       const response = await axios.post(`${API_URL}/post/create`, postData, {
//         headers: {
//           Authorization: `Bearer ${access_Token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });
//       console.log("post response:", response);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/post/create", postData);
      console.log("post response:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//function: fetchPosts //
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ pageNum = 0, keyword = "" }, { rejectWithValue }) => {
    // Default to 0 if no page is passed
    try {
      const response = await axiosPublic.get("/post/list", {
        params: { pageNum, keyword },
      });
      console.log("Fetched posts:", response.data);
      return response.data;
    } catch (error) {
      console.error("Fetch posts error:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

//function: fetchPostForUpdate //
export const fetchPostForUpdate = createAsyncThunk(
  "post/fetchPostForUpdate",
  async ({ postId, username }) => {
    const response = await axiosPrivate.get(
      `/post/${postId}/update/${username}`
    );
    return response.data;
  }
);

//function: fetchPostById //
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostDetails",
  async ({ postId, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/post/${postId}/detail`, {
        params: { page },
      });
      console.log("fetchPostById response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching post by ID:", error); // Log the error
      if (error.response && error.response.status === 403) {
        return rejectWithValue("접근 권한이 없습니다.");
      } else if (error.response.status === 418) {
        return rejectWithValue("다시 로그인해 주세요");
      } else if (error.response.status === 404) {
        return rejectWithValue("해당 글은 없은 개시글입니다");
      }

      return rejectWithValue(error.response.data);
    }
  }
);

//function: deletePost //
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, logined_username }, { rejectWithValue }) => {
    console.log("Post ID:", postId, "Logged-in Username:", logined_username);
    try {
      const response = await axiosPrivate.post(`/post/${postId}/delete`, {
        logined_username,
      });
      console.log("deletePost response:", response);
      return response.data;
    } catch (error) {
      console.log("deletePost error:", error);
      return rejectWithValue(error.response?.data || "Error deleting post");
    }
  }
);

// //function: updatePost //
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        `/post/${postId}/update`,
        postData
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
    setCurrentPage(state, action) {
      state.currentPageNum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //create post
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.postList = action.payload;
      })
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;

        state.postList = Array.isArray(action.payload.postList)
          ? action.payload.postList
          : [action.payload.postList];
        state.totalPageNum = action.payload.totalPageNum;
        state.currentPageNum = action.payload.currentPageNum;
        state.listSize = action.payload.listSize;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Edit post
      .addCase(updatePost.fulfilled, (state, action) => {
        // The updated post returned from the server
        const updatedPost = action.payload;
        console.log("updatedPost:", updatedPost);
        const index = state.postList.findIndex(
          (post) => post.postId === updatedPost.postId
        );
        if (index >= 0) {
          state.postList[index] = updatedPost;
        }
      })
      //fetchPostForUpdate
      .addCase(fetchPostForUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostForUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostForUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log("delete:", action.payload);
        const id = action.payload;
        state.postList = state.postList.filter((post) => post.postId !== id);
        console.log(action.payload);
      })
      //fetchPostById
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("ascdf:", action.payload);
        state.postOwner = action.payload.username;
        // Set error message
      });
  },
});

// Export actions and reducer
export const { clearError, clearPostDetail, setCurrentPage } =
  postSlice.actions;
export default postSlice.reducer;
