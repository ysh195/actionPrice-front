/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginForm from "./LoginForm";
import { colors } from "../../assets/assest";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.login);

  const validateInputs = () => {
    const newErrors = { username: "", password: "" };
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };


  const toggleShowPassword = () => {
    setShowPassword((prev) => {
      const newValue = !prev; // Toggle the value
      console.log("Toggled showPassword to:", newValue); // Log the new value
      return newValue;
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const formData = { username, password, rememberMe };
    try {
      const result = await dispatch(login(formData)).unwrap();
      localStorage.setItem("access_token", result.access_token);
      Swal.fire({
        title: "성공적으로 로그인되었습니다!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "입력된 정보가 올바르지 않습니다. 다시 시도해 주세요.",
        showConfirmButton: true,
      });
    }
  };
console.log("Current showPassword state:", showPassword);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "10px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", color: colors.hover1 }}>Login</h2>
        <LoginForm
          username={username}
          password={password}
          showPassword={showPassword}
          errors={errors}
          isLoading={isLoading}
          handleLogin={handleLogin}
          toggleShowPassword={toggleShowPassword}
          setUsername={setUsername}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          계정이 없으신가요?{" "}
          <Link to="/api/user/register" style={{ color: colors.button2 }}>
            해원가입 하세요
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
