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
        formData
      );

      // Set Authorization header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      console.log("Login Response:", response);

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("username", response.data.username);

      console.log(response);
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Login failed. Please check your informations.";

      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("access_token") ?? "";
      const response = await axios.get("http://localhost:8080/api/mypage", {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.access_token = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload;
        state.isLoggedIn = true;
        state.access_token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
