/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ element, redirectIfLoggedIn = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken =
    useSelector((state) => state.login.access_token) ||
    localStorage.getItem("access_token");

  useEffect(() => {
    if (authToken && redirectIfLoggedIn) {
      // If user is logged in and tries to access the login page, redirect to homepage
      navigate("/");
    } else if (!authToken && !redirectIfLoggedIn) {
      // If user is not logged in and tries to access a protected page, redirect to login
      navigate("/api/user/login");
    }
  }, [authToken, navigate, redirectIfLoggedIn]);

  // Render the protected component only if conditions are met
  return (!authToken && redirectIfLoggedIn) ||
    (authToken && !redirectIfLoggedIn)
    ? element
    : null;
};

export default ProtectedRoute;
