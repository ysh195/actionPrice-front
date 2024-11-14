import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate, axiosPublic } from "../apiConfig";

const initialState = {
  commentList: [],
  loading: false,
  error: null,
  currentPageNum: 0,
  totalPageNum: 0,
  listSize: 0,
};

//function: createComment //
export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ postId, username, content }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(`/post/${postId}/detail`, {
        username,
        content,
      });
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
      const response = await axiosPrivate.post(
        `/post/${postId}/detail/${commentId}/update`,
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
      const response = await axiosPrivate.post(
        `/post/${postId}/detail/${commentId}/delete`,
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
  async ({ postId, page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      let access_Token = localStorage.getItem("access_token");
      let response;
      if (access_Token === null) {
        response = await axiosPublic.get(`/post/comments`, {
          params: { postId, page, size },
        });
      } else {
        response = await axiosPrivate.get(`/post/comments`, {
          params: { postId, page, size },
        });
      }
      console.log("fetchComments response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch comments"
      );
    }
  }
);

//function: Get admin Answers //
export const fetchAdminAnswers = createAsyncThunk(
  "comments/fetchAdminAnswers",
  async ({ postId, answertype }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(
        `/post/${postId}/comment/admin/${answertype}`
      );
      console.log("fetchAdminAnswers response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching admin answers:",
        error.response?.data || error
      );
      return rejectWithValue(error.response?.data || error.message);
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
      })

      .addCase(fetchAdminAnswers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminAnswers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload; // Add the fetched comments to the state
      })
      .addCase(fetchAdminAnswers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture error message
      });
  },
});

export const { addComment, setCommentCurrentPage, resetComments } =
  commentSlice.actions;

export default commentSlice.reducer;
