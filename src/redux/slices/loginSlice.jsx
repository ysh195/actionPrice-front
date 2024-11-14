import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosPublic } from "../apiConfig";

const initialState = {
  username: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
  isLoggedIn: false,
  access_token: "",
  role: "",
};


//function for login (POST request) //
export const login = createAsyncThunk(
  "auth/login",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(`/user/login`, formData);

      // Get access_token from response
      const { access_token, username, role } = response.data;

      if (access_token) {
        // Store token in localStorage and set Authorization header globally
        localStorage.setItem("access_token", access_token);
        console.log("setting access_token: ", access_token);
        localStorage.setItem("username", username);
        console.log("setting username: ", username);
        localStorage.setItem("role", role);
        console.log("setting role: ", role);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
      } else {
        return rejectWithValue("로그인에 실패했습니다. 정보를 확인하세요.");
      }
      console.log("Login Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      return rejectWithValue("로그인에 실패했습니다. 정보를 확인하세요.");
    }
  }
);

//function for logoutUser (POST request) //
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
   
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      axios.defaults.headers.common["Authorization"] = null;

      const response = await axiosPublic.post(`/user/logout`, {});
      console.log("logoutUser response status:", response.status);

      if (response.status === 200) {
        console.log("Logout successful");

        return response.data;
      } else {
        // Handle unexpected status
        return rejectWithValue("로그아웃에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error
      return rejectWithValue(
        error.response?.data || "로그아웃에 실패했습니다."
      );
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    autoLogin: (state) => {
      let access_token = localStorage.getItem("access_token");
      console.log("checking if there's token:", access_token);
      const username = localStorage.getItem("username");

      if (access_token) {
        state.isLoggedIn = true;
        state.access_token = access_token;
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
        state.role = action.payload.role;
        state.access_token = action.payload.access_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.username = null;
        state.role = null;
        state.access_token = null;
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
