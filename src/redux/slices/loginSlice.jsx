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
  refresh_token: null,
};

const BASE_URL = "http://localhost:8080/api";

export const login = createAsyncThunk(
  "auth/login",

  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      console.log("response:", response);

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
    autoLogin: (state) => {
      const accessToken = Cookies.get("access_token");
      const refreshToken = Cookies.get("refresh_token");
      const username = Cookies.get("username");

      console.log("Auto Login Check:", {
        accessToken,
        refreshToken,
        username,
      });

      if (accessToken && refreshToken && username) {
        state.isLoggedIn = true;
        state.access_token = accessToken;
        state.refresh_token = refreshToken;
        state.username = username;
      }
    },
    logout: (state) => {
      state.username = null;
      state.isLoggedIn = false;
      state.isError = false;
      state.errorMessage = "";

      // Clear cookies on logout
      Cookies.remove("REMEMBERME");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("username");
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

export const { logout, autoLogin } = loginSlice.actions;
export default loginSlice.reducer;
