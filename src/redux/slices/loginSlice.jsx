import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  username: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
  isLoggedIn: false,
  access_token: null,
};

const BASE_URL = "http://localhost:8080/api";

export const login = createAsyncThunk(
  "auth/login",

  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`,
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // Setting Authorization header globally
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      if (!response.data.access_token) {
        return thunkAPI.rejectWithValue(
          "로그인에 실패했습니다. 정보를 확인하세요."
        );
      }
      // Check rememberMe to set tokens
      if (formData.rememberMe) {
        localStorage.setItem("access_token", response.data.access_token);
      } else {
        sessionStorage.setItem("access_token", response.data.access_token);
      }
      console.log("Login Response:", response);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      const errorMsg =
        error.response?.data?.message || "로그인 실패. 정보를 확인하세요.";

      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {

      const response = await axios.post(`${BASE_URL}/user/logout`);
      console.log("logoutUser response status:", response.status);

      if (response.status === 200) {
        console.log("Logout successful");

        Cookies.remove("REMEMBERME");
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");
        return response.data;
      } else {
        // Handle unexpected status
        return rejectWithValue("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error
      return rejectWithValue(error.response?.data || "Logout failed.");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    autoLogin: (state) => {
      const accessToken =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      const username =
        localStorage.getItem("username") || sessionStorage.getItem("username");

      if (accessToken || username) {
        state.isLoggedIn = true;
        state.access_token = accessToken;
        state.username = username;
      }
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
        state.isLoggedIn = true;
        state.username = action.payload.username;
        state.access_token = action.payload.access_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false; // Update login status
        state.isError = null; // Clear any errors
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.errorMessage = action.payload; // Set the error message
      });
  },
});

export const { autoLogin } = loginSlice.actions;
export default loginSlice.reducer;
