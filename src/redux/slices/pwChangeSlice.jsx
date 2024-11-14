/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../apiConfig";

const initialState = {
  loading: false,
  error: false,
  isPasswordChanged: false,
  passwordChangedMessage: "",
  userExists: false,
  userExistsMessage: "",
  userVerificationStatus: null,
  userVerificationMessage: "",
  passwordChangeStatus: null, // null, 'success', or 'error'
  passwordChangeMessage: "",
};

//function for checkUserExists //
export const checkUserExists = createAsyncThunk(
  "user/checkUserExists",

  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(`/user/checkUserExists`, {
        username,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : error.message
      );
    }
  }
);

//function for sendVerificationCodeForChangingPW //

export const sendVerificationCodeForChangingPW = createAsyncThunk(
  "user/sendVerificationCodeForChangingPW",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(
        `/user/sendVerificationCodeForChangingPW`,
        formData
      );
      return response.data; // Success message from the server
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle known conflict status
        return rejectWithValue(
          "이메일 또는 사용자명을 확인하고 다시 시도해주세요."
        );
      }
      // Handle other errors
      return rejectWithValue("인증 코드를 전송하는 중 오류가 발생했습니다.");
    }
  }
);

//function for changePassword //

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(`/user/changePassword`, {
        username,
        password,
      });
      return response.data; // Expecting a success message if password change is successful
    } catch (error) {
      return rejectWithValue("Changing password failed. Please try again.");
    }
  }
);

const pwChangeSlice = createSlice({
  name: "PwChange",
  initialState,
  reducers: {
    resetUserExistsStatus(state) {
      state.exists = false;
      state.error = null;
    },
    clearUserVerificationStatus: (state) => {
      state.userVerificationStatus = null;
      state.userVerificationMessage = "";
    },
    clearPasswordChangeStatus: (state) => {
      state.passwordChangeStatus = null;
      state.passwordChangeMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

      //desc:--------------------------------------------------------
      //desc: ------------checkUserExists---------------

      .addCase(checkUserExists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserExists.fulfilled, (state, action) => {
        state.loading = false;
        state.userExists = true;
        state.userExistsMessage = action.payload === "the user exists"; // Adjust based on your response
      })
      .addCase(checkUserExists.rejected, (state, action) => {
        state.loading = false;
        state.userExists = false;
        state.error = action.payload || "Error checking user existence.";
      })
      .addCase(sendVerificationCodeForChangingPW.pending, (state) => {
        state.loading = true;
        state.userVerificationStatus = null;
        state.userVerificationMessage = "";
      })
      .addCase(sendVerificationCodeForChangingPW.fulfilled, (state, action) => {
        state.loading = false;
        state.userVerificationStatus = "success";
        state.userVerificationMessage = action.payload;
      })
      .addCase(sendVerificationCodeForChangingPW.rejected, (state, action) => {
        state.loading = false;
        state.userVerificationStatus = "error";
        state.userVerificationMessage =
          action.payload || "Unexpected error occurred.";
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.passwordChangeStatus = null;
        state.passwordChangeMessage = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordChangeStatus = "success";
        state.passwordChangeMessage = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.passwordChangeStatus = "error";
        state.passwordChangeMessage =
          action.payload || "Unexpected error occurred.";
      });
  },
});

export const {
  resetUserExistsStatus,
  clearUserVerificationStatus,
  clearPasswordChangeStatus,
} = pwChangeSlice.actions;
export default pwChangeSlice.reducer;
