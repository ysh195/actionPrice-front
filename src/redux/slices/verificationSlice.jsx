/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic } from "../apiConfig";

const initialState = {
  isLoading: false,
  isUsernameAvailable: true,
  usernameFailMessage: "",
  usernameSuccessMessage: "",
  codeSendSuccessMessage: "",
  codeSendFailMessage: "",
  verifySuccess: "",
  verifyCode: "",
  isError: false,
  emailSuccessMessage: null,
  emailFailMessage: null,
  userExists: false,
  userExistsMessage: "",
};


//function: check Username duplicate //
export const checkUsername = createAsyncThunk(
  "auth/checkUsername",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(
        `/user/checkForDuplicateUsername`,
        {
          username,
        }
      );
      console.log("Slice check Username:", response.data);

      return response.data; //"Username is available";
    } catch (error) {
      console.error("Slice Error response:", error.response);
      return rejectWithValue(
        error.response?.data || "오류가 발생했습니다. 다시 시도해 주세요."
      );
    }
  }
);

//function: check email duplicate //
export const checkEmailDup = createAsyncThunk(
  "auth/checkEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(`/user/checkForDuplicateEmail`, {
        email,
      });
      console.log("email response:", response);
      return response.data; // Assuming the API returns a message
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        "네트워크 오류가 발생했습니다. 다시 시도해 주세요."
      );
    }
  }
);

//function: send Verification Code  //
export const sendVerificationCode = createAsyncThunk(
  "auth/sendVerificationCode",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(
        `/user/sendVerificationCode`,
        formData
      );
      console.log("sendVerificationCode:", response);
      return response.data; //인증코드가 성공적으로 발송되었습니다.
    } catch (error) {
      console.log("send Verification error:", error);
      const errorCode = error.response?.status; // Get the error status code
      let errorMessage;
      if (errorCode === 409) {
        errorMessage = "해당 이메일은 이미 사용 중입니다.";
      } else if (errorCode === 400) {
        errorMessage = "해당 이메일은 존재하지 않습니다.";
      } else {
        errorMessage =
          error.response?.data ||
          "인증 코드를 전송하는 중 오류가 발생했습니다.";
      }

      return rejectWithValue(errorMessage);
    }
  }
);
//function: verify code //
export const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(
        `/user/checkVerificationCode`,
        formData
      );
      console.log("verifyCode:", response);
      return response.data.resultOfVerification;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "유효하지 않은 인증 코드입니다. 다시 시도해 주세요."
      );
    }
  }
);

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {},
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
    //desc:--------------------------------------------------------
  },
});

export const {} = verificationSlice.actions;
export default verificationSlice.reducer;
