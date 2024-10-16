import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isUsernameAvailable:true,
  usernameFailMessage: "",
  usernameSuccessMessage: "",
  codeSendSuccessMessage: "",
  codeSendFailMessage:"",
  verifySuccess: "",
  verifyCode: "",
  isError: false,
  emailSuccessMessage: null,
  emailFailMessage: null,
};


const BASE_URL = "http://localhost:8080/api";

//function: check Username duplicate //
export const checkUsername = createAsyncThunk(
  "auth/checkUsername",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/checkForDuplicateUsername`, {
        username});
      console.log("Slice check Username:",response.data);
      return response.data; //"Username is available";
    } catch (error) {
      console.error("Slice Error response:", error.response);
      return rejectWithValue(error.response?.data || "An error occurred.");
    }
  }
);

//function: check email duplicate //
export const checkEmailDup = createAsyncThunk(
  "auth/checkEmail",
  async ({email}, { rejectWithValue }) => {
   
    try {
      const response = await axios.post(
        `${BASE_URL}/user/checkForDuplicateEmail`,
        {email}
      );
      console.log("email response:", response)
      return response.data; // Assuming the API returns a message
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
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/sendVerificationCode",
        formData
      );
      console.log("sendVerificationCode:", response.data);
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
      state.usernameFailMessage = null;
      state.usernameSuccessMessage = null;
      state.emailSuccessMessage = null;
      state.emailFailMessage = null;
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
        state.usernameFailMessage = action.payload;
      })
      //desc:---------------------------------------------
      //desc: ------------check Email Dup---------------

      .addCase(checkEmailDup.fulfilled, (state, action) => {
        state.emailSuccessMessage = action.payload; // Success message
        state.emailFailMessage = null; // Clear error message
      })
      .addCase(checkEmailDup.rejected, (state, action) => {
        state.emailFailMessage = action.payload; // Error message
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
        console.log(action.payload);
        state.codeSendSuccessMessage = action.payload;
      })
      .addCase(sendVerificationCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.codeSendFailMessage = action.payload;

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
