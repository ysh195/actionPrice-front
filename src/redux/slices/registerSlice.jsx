/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
  isLoggedIn: false,
  token: "",
  isUsernameAvailable: false,
  usernameCheckResult: null,
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
//function: send Verification Code  //
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
//function: verify code //
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
//function: check Username  //
export const checkUsername = createAsyncThunk(
  "auth/checkUsername",
  async (
    { username, email, password, verificationCode },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/user/checkForDuplicateUsername", {
        username,
        email,
        password,
        verificationCode,
      });

      const result= response.data; // Successful response
      alert(result)
      return result;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          return rejectWithValue(
            "Username already exists. Please choose another one."
          );
        }
        console.log(error.response.data);
        // Check if there's a response from the server
        return rejectWithValue(error.response.data || "An error occurred.");
      }
      return rejectWithValue("Network error.");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.token = "";
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
      .addCase(checkUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = null; // Reset error on new request
      })
      .addCase(checkUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUsernameAvailable = true; // Store the result
        state.usernameCheckResult = action.payload; // Handle success
      })
      .addCase(checkUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isUsernameAvailable = false;
        state.isError = action.payload; // Store the error
      });
  },
});

export const {} = registerSlice.actions;
export default registerSlice.reducer;
