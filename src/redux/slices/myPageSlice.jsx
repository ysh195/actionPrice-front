import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../apiConfig";

const initialState = {
  loading: false,
  error: false,
  email: "",
  username: "",
  myPosts: [],
  totalPageNum: 0,
  currentPageNum: 1,
};

//functions for deleteAccount //
export const deleteAccount = createAsyncThunk(
  "user/deleteUser",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        `/mypage/${username}/deleteUser`,
        {}
      );

      console.log("delete user response:", response);
      if (response.status === 200) {
        console.log("delete account successful");
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        return response.data;
      } else {
        // Handle unexpected status
        return rejectWithValue("계정 삭제에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting account"
      );
    }
  }
);
//functions for getPersonalInfo //
export const getPersonalInfo = createAsyncThunk(
  "user/personalInfo",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(
        `/mypage/${username}/personalinfo`
      );
      console.log("personalInfo response:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching personal info"
      );
    }
  }
);
//functions for getMyPosts //
export const getMyPosts = createAsyncThunk(
  "posts/getMyPosts",
  async ({ username, keyword = "", pageNum = 0 }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/mypage/${username}/myposts`, {
        params: {
          keyword,
          pageNum,
        },
      });
      console.log("getMyPosts response:", response.data);
      return response.data;
    } catch (error) {
      console.log("getMyPosts error:", error);
      return rejectWithValue(error.response?.data || "Error fetching posts");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on new fetch
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.username = action.payload.username;
      })
      .addCase(getPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      })
      .addCase(getMyPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.myPosts = action.payload.postList;
        state.currentPageNum = action.payload.currentPageNum;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
