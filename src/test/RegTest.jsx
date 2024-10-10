import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../pages/Login/Form.css";
import {
  checkUsername,
  registerUser,
  sendVerificationCode,
  verifyCode,
} from "../redux/slices/authSlice"; // import the asyncThunk

import { Link, useNavigate } from "react-router-dom";

const RegTest = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    verificationCode: "",
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const verificationCodeRef = useRef(null);
  const {
    isLoading,
    isError,
    errorMessage: reduxErrorMessage,
  } = useSelector((state) => state.auth);

  const validateForm = () => {
    let errors = {};

    // Username validation
    if (!formData.username) {
      errors.username = "Username is required.";
    } else if (formData.username.length < 6) {
      console.log(errors)
      errors.username = "Username must be at least 6 characters.";
    } else if (!isUsernameAvailable) {
      errors.username = "Username is already taken.";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is not valid.";
    }

    // Verification code validation
    if (isCodeSent && !formData.verificationCode) {
      errors.verificationCode = "Verification code is required.";
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    const errors = validateForm();
    if (e.target.name === "username") setUsernameError(errors.username || "");
    if (e.target.name === "password") setPasswordError(errors.password || "");
    if (e.target.name === "email") setEmailError(errors.email || "");
    if (e.target.name === "verificationCode")
      setVerificationCodeError(errors.verificationCode || "");
  };

  const handleCheckUsername = async () => {
    try {
      const response = await dispatch(
        checkUsername(formData.username)
      ).unwrap();
      if (response.message === "Username is available.") {
        setUsernameError(""); // Clear error if available
        setIsUsernameAvailable(true); // Set username as available
      }
    } catch (error) {
      setUsernameError(error); // Set error message if taken
      setIsUsernameAvailable(false); // Set username as not available
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setUsernameError(errors.username || "");
    setPasswordError(errors.password || "");
    setEmailError(errors.email || "");
    setVerificationCodeError(errors.verificationCode || "");

    if (Object.keys(errors).length > 0) return;
    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      alert("Registered successfully!"); // Alert on successful registration
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
        reduxErrorMessage || "Registration failed, please try again."
      );
      // Handle errors (already handled by redux state)
    } finally {
      setLoading(false);
    }
  };

  //function:send Verification Code //

  const handleSendCode = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setEmailError(errors.email || "");

    if (Object.keys(errors).length > 0) return;

    try {
      await dispatch(sendVerificationCode(formData)).unwrap();
      setIsCodeSent(true);
      alert("Verification code sent to your email!");
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };

  //function:Verifying Code //
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateForm();
    setVerificationCodeError(errors.verificationCode || "");

    if (Object.keys(errors).length > 0) return;

    try {
      const response = await dispatch(verifyCode(formData)).unwrap(); // Unwrap to get the response directly
      console.log(response);
      if (response === "인증이 성공했습니다.") {
        setIsVerified(true);
        alert(response);
      } else {
        setIsVerified(false);
        setErrorMessage("Invalid verification code. Please try again.");
        alert(response);
      }
    } catch (error) {
      setErrorMessage(error); // Set error message from thunk
      console.log(error);
      alert("Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
      setVerificationCodeError("");
    }
  };

  return (
    <div className="form">
      <h2 className="form-title">회원가입</h2>
      <form
        id="userRegisterForm"
        className="auth-form"
        onSubmit={isCodeSent ? handleVerifyCode : handleSendCode}
      ><div className="verify-box">
        <input
          ref={usernameRef}
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          // required
        />
        <button
          className="send-code-button"
          type="button"
          onClick={handleCheckUsername}
          style={{ marginLeft: "10px" }}
        >
          Check Availability
        </button>
        </div>
        <div className="error-text">
          {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
        </div>

        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
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
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            className="send-code-button"
            type="submit"
            disabled={loading || isCodeSent}
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

        {/* Show verification code input and button only after code is sent */}
        {isCodeSent && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              ref={verificationCodeRef}
              type="text"
              name="verificationCode"
              placeholder="Enter verification code"
              value={formData.verificationCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="error-text">
              {verificationCodeError && (
                <p style={{ color: "red" }}>{verificationCodeError}</p>
              )}
            </div>

            <button
              className="send-code-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Verify Code"}
            </button>
          </div>
        )}
        {isCodeSent && isVerified === true && (
          <button
            className="btn btn--form btn-login"
            onClick={handleSubmit}
            type="button"
          >
            Register
          </button>
        )}
        <div className="error-text">
          {isError && <p style={{ color: "red" }}>{reduxErrorMessage}</p>}
        </div>
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
