import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: null, 
  isLoading: false,
  isError: false,
  errorMessage: "",
  isLoggedIn: false,
  token: "",
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Form Data:", formData);
      console.log(response);
      return response;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // API error response
      }
      return rejectWithValue(error.message); // General error
    }
  }
);

export const sendVerificationCode = createAsyncThunk(
  "auth/sendVerificationCode",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/sendVerificationCode",
        { username, email, password }
      );
      console.log(response);
      return response.data; // Adjust this based on your API response structure
    } catch (error) {
      // Create a fallback message if the error response is not available
      const errorMsg =
        error.response?.data?.message ||
        "An error occurred while sending the verification code.";
      return rejectWithValue(errorMsg);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async (
    { username, email, password, verificationCode },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/checkVerificationCode",
        { username, email, password, verificationCode }
      );

      // Return response data or a success message
      return response.data; // Adjust based on your API response
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Invalid verification code. Please try again.";
      return rejectWithValue(errorMsg);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  // { username, password }

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

      console.log("Login Response:", response.data);

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("username", response.data.username);

      console.log(response.data);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.token=""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Registration failed";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;

        state.username = action.payload;
        state.isLoggedIn = true;

        state.token = action.payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentUser = payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
