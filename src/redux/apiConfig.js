/* eslint-disable no-unused-vars */
import axios from "axios";
import Swal from "sweetalert2";

// Create axios instance for protected requests
const axiosPrivate = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
// Request interceptor to add access token if it exists
axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
axiosPrivate.interceptors.response.use(
  (response) => {
    // response => response, // Pass through if response is successful

    // 응답에 새 accessToken이 있는지 확인하고 갱신
    if (response.data && response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // 액세스 토큰 만료 시 401 상태 확인
    // Check for 401 error, and that this request hasn't been retried
    if (error.response.status === 418 && !originalRequest._retry) {
      originalRequest._retry = true;

      const accessToken = localStorage.getItem("access_token");

      try {
        // 리프레시 토큰으로 새 액세스 토큰 요청
        // Request new access token

        const response = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        // 새 토큰을 로컬 스토리지에 저장
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("access_token", newAccessToken);
        // 실패했던 원래 요청을 새 토큰으로 재시도
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Token refresh failed: Show session expired alert

        Swal.fire({
          text: "Your session has expired. Please log in again.",
          icon: "error",
          confirmButtonText: "Log in",
        }).then(() => {
          // Clear localStorage and Redux state
          localStorage.removeItem("access_token");
          localStorage.removeItem("username");
          localStorage.removeItem("role");

          // Redirect to login page
          window.location.href = "http://localhost:8080/";
        });
      }
    } else if (error.response.status === 403) {
      Swal.fire({
        icon: "error",
        text: "접근 권한이 없습니다.",
      }).then(() => {
        window.location.href = "/";
      });
    }
    return Promise.reject(error); // Reject the promise with the error
  }
);

const axiosPublic = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
axiosPublic.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 418) {
        Swal.fire({
          icon: "error",
          text: "You need to log in to access this page.",
        });
      } else if (error.response.status === 403) {
        Swal.fire({
          icon: "error",
          text: "You don't have permission to access this page.",
        });
      }
    }
    return Promise.reject(error);
  }
);

export { axiosPrivate, axiosPublic };
