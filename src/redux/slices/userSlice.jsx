import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  email: "",
  username: "",
  myPosts: [],
};

const BASE_URL = "http://localhost:8080/api";

export const deleteAccount = createAsyncThunk(
  "user/deleteUser",
  async (username, { rejectWithValue }) => {
    try {
      const access_Token = localStorage.getItem("access_token");
      if (!access_Token) {
        alert("You need to log in to delete your account.");
        return rejectWithValue("User not logged in");
      }
      const response = await axios.post(
        `${BASE_URL}/mypage/${username}/deleteUser`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
          },
        }
      );
      console.log("delete user response:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting account"
      );
    }
  }
);

export const getPersonalInfo = createAsyncThunk(
  "user/personalInfo",
  async (username, { rejectWithValue }) => {
    const access_Token = localStorage.getItem("access_token");

    try {
      const response = await axios.get(
        `${BASE_URL}/mypage/${username}/personalinfo`,
        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
          },
        }
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

export const getMyPosts = createAsyncThunk(
  "posts/getMyPosts",
  async ({ username, keyword, pageNum }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/mypage/${username}/myposts`,
        {
          params: {
            keyword: keyword || undefined,
            pageNum: pageNum || 0,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log("getMyPosts response:", response.data);
      return response.data.postList;
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
        state.myPosts = action.payload;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
