import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import "../Login/Form.css";
import {
  checkUsername,
  sendVerificationCode,
  verifyCode,
  clearMessages,
  checkEmailDup,
} from "../../redux/slices/verificationSlice";

import { registerUser } from "../../redux/slices/registerSlice";

import { Link, useNavigate } from "react-router-dom";

const RegTest = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    verificationCode: "",
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const verificationCodeRef = useRef(null);

  //get states from slice
  const {
    isUsernameAvailable,
    isLoading,
    verifySuccess,
    usernameErrorMessage,
    usernameSuccessMessage,
    emailSuccessMessage,
    emailErrorMessage,
  } = useSelector((state) => state.verification);

  const validateUsername = (username) => {
    if (!username) {
      setUsernameError("Username is required.");
    } else if (username.length < 3 || username.length > 20) {
      setUsernameError("Username must be between 3 and 20 characters.");
      ("Username must be at least 6 characters.");
    } else if (!isUsernameAvailable) {
      setUsernameError(usernameErrorMessage);
    } else {
      setUsernameError("");
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required.");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else {
      setPasswordError(""); // Corrected here to clear the password error
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
    if (!email) {
      setEmailError("Email is required.");
    } else if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validateVerificationCode = (verificationCode) => {
    if (isCodeSent && !verificationCode) {
      setVerificationCodeError("Verification code is required.");
    } else {
      setVerificationCodeError(""); // Clear the error if valid
    }
  };

  //prevent spaces from being typed

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevent space from being entered
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "username") {
      validateUsername(value);
      dispatch(checkUsername({ username: value }));
    } else if (name === "password") {
      validatePassword(value);
    } else if (name === "email") {
      validateEmail(value);
      dispatch(checkEmailDup({ email: value }));
    } else if (name === "verificationCode") {
      validateVerificationCode(value);
    }
    dispatch(clearMessages());
  };

  //function:send Verification Code //
  const handleSendCode = async (e) => {
    e.preventDefault();

    //todo: need to check validation before sending code to email
    // if (usernameError || emailError || passwordError) {
    //   alert("Please fix the errors before sending the verification code.");
    //   return;
    // }
    try {
      const sendCodeResult = await dispatch(
        sendVerificationCode(formData)
      ).unwrap();
      setIsCodeSent(true);
      console.log("handleSendCode", sendCodeResult);
      alert(sendCodeResult);
    } catch (error) {
      setIsCodeSent(false);
      console.error("Error sending verification code:", error);
      alert(error);
    }
  };

  //function:Verifying Code //
  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      const verifyCodeResult = await dispatch(verifyCode(formData)).unwrap();

      if (verifyCodeResult === "인증이 성공했습니다.") {
        setIsCodeVerified(true);
        alert(verifyCodeResult);
      } else {
        setIsCodeVerified(false);
        alert(verifyCodeResult);
        console.log("verifyCodeResult:", verifyCodeResult);
        // ("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.log("handleVerifyCode error:", error);
      // alert(error)
      setIsCodeVerified(false);
      alert("Invalid verification code. Please try again.");
    } finally {
      setVerificationCodeError("");
    }
  };

  //event handler: handle form Submit //
  const onRegisterButtonClickHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(registerUser(formData)).unwrap();

      alert("Registered successfully!"); // Alert on successful
      // Reset form fields
      setFormData({
        username: "",
        email: "",
        password: "",
        verificationCode: "",
      });
      // Navigate to the login page
      navigate("/api/user/login");
    } catch (error) {
      console.error("Registration failed:", error);

      setErrorMessage(
        error?.message || "Registration failed, please try again."
      );
      // Handle errors (already handled by redux state)
    }
  };

  return (
    <div className="form">
      <h2 className="form-title">회원가입</h2>
      <form
        id="userRegisterForm"
        className="auth-form"
        onSubmit={isCodeSent ? handleVerifyCode : handleSendCode}
      >
        <div className="verify-box">
          <input
            ref={usernameRef}
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={isCodeSent}
            required
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="error-text">
          {usernameSuccessMessage && (
            <div className="alert alert-success" style={{ color: "green" }}>
              {usernameSuccessMessage}
              <FaCheck />
            </div>
          )}
          {usernameErrorMessage && (
            <div className="alert alert-danger" style={{ color: "red" }}>
              {usernameErrorMessage}
            </div>
          )}
        </div>

        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          disabled={isCodeSent}
          required
          onKeyDown={handleKeyDown}
        />
        <div className="error-text">
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>

        <div className="verify-box">
          <input
            ref={emailRef}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isCodeSent}
            required
            onKeyDown={handleKeyDown}
          />
          <div className="error-text">
            {emailSuccessMessage && (
              <div className="alert alert-success">{emailSuccessMessage}</div>
            )}
            {emailErrorMessage && (
              <div className="alert alert-danger">{emailErrorMessage}</div>
            )}
          </div>
          <button
            className="send-code-button"
            type="submit"
            disabled={isCodeSent}
            style={{
              marginLeft: "10px",
              backgroundColor: isCodeSent ? "#d3d3d3" : "tomato", // Gray out button
              cursor: isCodeSent ? "not-allowed" : "pointer",
              color: isCodeSent ? "#666" : "#fff",
            }}
          >
            이메일 인증
          </button>
        </div>

        <div className="error-text">
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>

        {isCodeSent && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              ref={verificationCodeRef}
              type="text"
              name="verificationCode"
              placeholder="Enter verification code"
              value={formData.verificationCode}
              onChange={handleInputChange}
              required
              onKeyDown={handleKeyDown}
            />

            <button
              className="send-code-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Verify Code"}
            </button>
          </div>
        )}
        {isCodeSent && isCodeVerified === true && (
          <button
            className="btn btn--form btn-login"
            onClick={onRegisterButtonClickHandler}
            type="button"
          >
            Register
          </button>
        )}
        <div className="error-text"></div>
        <div>
          <span>이미 계정이 있으신가요? </span>
          <Link className="move-link" to="/api/user/login">
            로그인 하세요
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegTest;
