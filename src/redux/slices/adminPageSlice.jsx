import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
const initialState = {
  userList: [],
  currentPageNum: 1,
  totalPageNum: 0, // 총 페이지 수
  loading: false,
  error: null,
};

const baseUrl = "http://localhost:8080/api";

//function for fetchUserList //
export const fetchUserList = createAsyncThunk(
  "admin/fetchUserList",
  async ({ pageNum = 0, keyword = "" }, { rejectWithValue }) => {
    try {
      let access_Token = localStorage.getItem("access_token");
      console.log("go adminPage - access_Token", access_Token);
      const response = await axios.get(`${baseUrl}/admin/userlist`, {
        params: { pageNum, keyword },
        headers: {
          Authorization: `Bearer ${access_Token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // Using params to build the query string
      });
      console.log("fetchUserList:", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: "error",
          title: "접근 금지",
          text: "접근 권한이 없습니다.",
        });
        return rejectWithValue("접근 권한이 없습니다.");
      }
      return rejectWithValue(error.response.data);
    }
  }
);

//function for blockUser (사용자를 차단하는 비동기 함수) //
export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (username) => {
    let access_Token = localStorage.getItem("access_token");
    if (!access_Token) {
      alert("You need to log in to block a user.");
      return;
    }
   
    try {
      const response = await axios.post(
        `${baseUrl}/admin/userlist/${username}/block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.data || !response.data.message) {
        throw new Error("Unexpected response format, check {}");
      }
      return {
        username,
        message: response.data.message,
        isBlocked: response.data.isBlocked,
      };
    } catch (error) {
      console.error("Error blocking user:", error);
      // Handle specific error cases or return a default error message
      return { error: error.message || "Failed to block user" };
    }
  }
);

//function for blockUser (사용자 리셋 비동기 함수) //
export const resetRefreshToken = createAsyncThunk(
  "admin/resetUser",
  async (username) => {
    let access_Token = localStorage.getItem("access_token");
    if (!access_Token) {
      alert("You need to log in to reset refresh token.");
      return;
    }
    try {
      const response = await axios.post(
        `${baseUrl}/admin/userlist/${username}/reset`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      // Check if the message exists in the response
      if (!response.data || !response.data.message) {
        throw new Error("No message returned from the server.");
      }
      return { username, message: response.data.message };
    } catch (error) {
      console.error("Error resetting refresh token:", error);
      // Return an error object to handle the failure
      return { error: error.message || "Failed to reset refresh token" };
    }
  }
);
const adminPageSlice = createSlice({
  name: "adminPage",
  initialState,
  reducers: {
    setCurrentPageNum: (state, action) => {
      state.currentPageNum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload.userList;
        state.totalPageNum = action.payload.totalPageNum;
        state.currentPageNum = action.payload.currentPageNum;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const user = state.userList.find(
          (user) => user.username === action.payload.username
        );
        if (user) {
          user.blocked = action.payload.isBlocked; // 차단 상태 업데이트
        }
      })
      .addCase(resetRefreshToken.fulfilled, (state, action) => {
        console.log(action.payload.message);
      });
  },
});

// 사용자 목록 선택기
export const selectUserList = (state) => state.adminPage;

export const { setCurrentPageNum } = adminPageSlice.actions;

// 슬라이스 리듀서 내보내기
export default adminPageSlice.reducer;
