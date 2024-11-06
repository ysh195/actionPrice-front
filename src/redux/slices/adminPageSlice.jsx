// src/slices/adminPageSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  userList: [],
  currentPageNum: 1,
  totalPageNum: 0, // 총 페이지 수
};

const baseUrl = "http://localhost:8080/api/admin";

//function for fetchUserList //
export const fetchUserList = createAsyncThunk(
  "admin/fetchUserList",
  async ({ pageNum = 0, keyword = "" }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/userlist`, {
        params: { pageNum, keyword }, // Using params to build the query string
      });
      console.log("fetchUserList:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user list"
      );
    }
  }
);

//function for blockUser (사용자를 차단하는 비동기 함수) //
export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (username) => {
    const access_Token = localStorage.getItem("access_token");
    if (!access_Token) {
      alert("You need to log in to update a post.");
      return;
    }

    const response = await axios.post(
      `${baseUrl}/userlist/${username}/block`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_Token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return {
      username,
      message: response.data.message,
      isBlocked: response.data.isBlocked,
    };
  }
);

//function for blockUser (사용자 리셋 비동기 함수) //
export const resetRefreshToken = createAsyncThunk(
  "admin/resetUser",
  async (username) => {
    const access_Token = localStorage.getItem("access_token");
    if (!access_Token) {
      alert("You need to log in to update a post.");
      return;
    }

    const response = await axios.post(
      `${baseUrl}/userlist/${username}/reset`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_Token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return { username, message: response.data.messege };
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
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload.userList;
        state.totalPageNum = action.payload.totalPageNum;
        state.currentPageNum = action.payload.currentPageNum;
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
