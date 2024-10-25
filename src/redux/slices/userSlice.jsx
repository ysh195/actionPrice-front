import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAccount.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
