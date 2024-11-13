/* eslint-disable no-unused-vars */
import axios from "axios";
import Swal from "sweetalert2";


// Create axios instance for protected requests
const axiosPrivate = axios.create({
  baseURL: "http://localhost:8080/api",
});
// Request interceptor to add token only for protected routes
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
axiosPrivate.interceptors.response.use(
  (response) => response, // If response is successful, return it
  async (error) => {
   if (error.response) {
     if (error.response.status === 401) {
       // 401 error handling logic
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
         window.location.href = "/api/user/login";
       });
     } else if (error.response.status === 403) {
       Swal.fire({
         icon: "error",
         text: "You don't have permission to access this resource.",
       });
     }
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
      if (error.response.status === 401) {
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
