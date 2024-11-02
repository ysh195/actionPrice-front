// src/slices/adminPageSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  userList: [], // 사용자 목록
  currentPageNum: 1, // 현재 페이지 번호
  currentPageSize: 0, // 현재 페이지에 존재하는 사용자 수
  itemSizePerPage: 10, // 페이지당 사용자 수
  listSize: 0, // 총 사용자 수
  totalPageNum: 0, // 총 페이지 수
  hasNext: false, // 다음 페이지 여부
  keyword: "", // 검색 키워드
};

const baseUrl = "http://localhost:8080/api/admin";

//사용자 목록을 가져오는 비동기 함수
// export const fetchUserList = createAsyncThunk('admin/fetchUserList', async ({ pageNum, keyword }) => {
//   const response = await axios.get(
//     `${baseUrl}/userlist?pageNum=${pageNum}&keyword=${keyword}`
// );
// console.log("fetchUserList:",response.data);
//   return response.data; // JSON 응답 구조를 그대로 반환
// });

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

// 사용자를 차단하는 비동기 함수
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

// 사용자 리셋 비동기 함수
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

// adminPageSlice 정의
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
        state.totalPageNum = action.payload.totalPages;
        state.currentPageNum = action.payload.currentPageNum;
      })
      // .addCase(fetchUserList.fulfilled, (state, action) => {
      //   const {
      //     userList,
      //     currentPageNum,
      //     currentPageSize,
      //     listSize,
      //     totalPageNum,
      //     hasNext,
      //     keyword,
      //   } = action.payload;
      //   state.userList = userList; // 사용자 목록 업데이트
      //   state.currentPageNum = currentPageNum; // 현재 페이지 번호 업데이트
      //   state.currentPageSize = currentPageSize; // 현재 페이지의 사용자 수 업데이트
      //   state.listSize = listSize; // 총 사용자 수 업데이트
      //   state.totalPageNum = totalPageNum; // 총 페이지 수 업데이트
      //   state.hasNext = hasNext; // 다음 페이지 여부 업데이트
      //   state.keyword = keyword; // 검색 키워드 업데이트
      // })
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
