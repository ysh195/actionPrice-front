/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ element, redirectIfLoggedIn = false }) => {
  const navigate = useNavigate();

  const access_token =

    localStorage.getItem("access_token");
   

  useEffect(() => {
    if (access_token && redirectIfLoggedIn) {
      // If user is logged in and tries to access the login page, redirect to homepage
      navigate("/");
    } else if (!access_token && !redirectIfLoggedIn) {
      // If user is not logged in and tries to access a protected page, redirect to login
      navigate("/api/user/login");
    }
  }, [access_token, navigate, redirectIfLoggedIn]);

  // Render the protected component only if conditions are met
  return (!access_token && redirectIfLoggedIn) ||
    (access_token && !redirectIfLoggedIn)
    ? element
    : null;
};

export default ProtectedRoute;
