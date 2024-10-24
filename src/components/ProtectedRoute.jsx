/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Assuming you're using Redux

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const authToken =
    useSelector((state) => state.login.access_token) ||
    localStorage.getItem("access_token");

  useEffect(() => {
    if (!authToken) {
      navigate("/api/user/login");
    }
  }, [authToken, navigate]);

  return authToken ? element : null;
};

export default ProtectedRoute;
