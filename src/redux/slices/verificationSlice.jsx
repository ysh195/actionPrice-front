import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  usernameErrorMessage: "",
  usernameSuccessMessage: "",
  sendCode: "",
  verifySuccess: "",
  verifyCode: "",
  isError: false,
  emailSuccessMessage: null,
  emailErrorMessage: null,
};

//function: check Username duplicate //
export const checkUsername = createAsyncThunk(
  "auth/checkUsername",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/checkForDuplicateUsername", {
        username,
      });

      return response.data; //"Username is available";
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          return rejectWithValue(
            "Username already exists. Please choose another one."
          );
        }
        // Check if there's a response from the server
        return rejectWithValue(error.response.data || "An error occurred.");
      }
      return rejectWithValue("Network error.");
    }
  }
);

//function: check email duplicate //
export const checkEmailDup = createAsyncThunk(
  "auth/checkEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/checkForDuplicateEmail",
        { email }
      );
      return response.data.message; // Assuming the API returns a message
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Network error. Please try again.");
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("send Verification error:", error);
      const errorCode = error.response?.status; // Get the error status code
      let errorMessage;
      if (errorCode === 409) {
        errorMessage = "The email is already in use.";
      } else if (errorCode === 400) {
        errorMessage = "The email does not exist.";
      } else {
        errorMessage =
          error.response?.data ||
          "An error occurred while sending the verification code.";
      }

      return rejectWithValue(errorMessage);
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
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Invalid verification code. Please try again."
      );
    }
  }
);

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    clearMessages(state) {
      state.usernameErrorMessage = null;
      state.usernameSuccessMessage = null;
      state.emailSuccessMessage = null;
      state.emailErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //desc: -----------------checkUsername check--------------------
      .addCase(checkUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isUsernameAvailable = true;
        state.usernameSuccessMessage = action.payload; // Handle success
      })
      .addCase(checkUsername.rejected, (state, action) => {
        state.successMessage = null;
        state.isLoading = false;
        state.isError = true;
        state.isUsernameAvailable = false;
        state.usernameErrorMessage = action.payload; // Store the error
      })
      //desc:---------------------------------------------
      //desc: ------------check Email Dup---------------

      .addCase(checkEmailDup.fulfilled, (state, action) => {
        state.emailSuccessMessage = action.payload; // Success message
        state.emailErrorMessage = null; // Clear error message
      })
      .addCase(checkEmailDup.rejected, (state, action) => {
        state.emailErrorMessage = action.payload; // Error message
        state.emailSuccessMessage = null; // Clear success message
      })
      //desc:---------------------------------------------

      //desc: ------------sendVerificationCode---------------
      .addCase(sendVerificationCode.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(sendVerificationCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.sendCode = action.payload;
      })
      .addCase(sendVerificationCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      //desc:--------------------------------------------------------
      //desc: ------------verify Code---------------
      .addCase(verifyCode.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.verifySuccess = true;
        state.verifyCode = action.payload; // Set success message
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.verifySuccess = false; // Set error message  //
        state.verifyErrorMessage = action.payload;
      });
  },
});

export const { clearMessages } = verificationSlice.actions;
export default verificationSlice.reducer;
