import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
  isLoggedIn: false,
  access_token: null,
  refresh_token: null,
};

export const login = createAsyncThunk(
  "auth/login",

  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      if (!response.data.access_token) {
        return thunkAPI.rejectWithValue(
          "로그인에 실패했습니다. 정보를 확인하세요."
        );
      }
      console.log("Login Response:", response);

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("username", response.data.username);

      console.log("login:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      const errorMsg =
        error.response?.data?.message || "로그인 실패. 정보를 확인하세요.";

      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.isLoggedIn = false;
      state.isError = false; // Reset error state
      state.errorMessage = ""; // Clear error message
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload.username;
        state.isLoggedIn = true;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
