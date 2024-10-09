import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Form.css";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const verificationCodeRef = useRef(null);
  const navigate = useNavigate();

  //error messages
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    if (!username) {
      setUsernameError("Username is required.");
    } else if (username.length < 6) {
      setUsernameError("Username must be at least 6 characters.");
    } else {
      setUsernameError("");
    }
    setUsername(username);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    if (!password) {
      setPasswordError("Password is required.");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else {
      setPasswordError("");
    }
    setPassword(password);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError("Email is required.");
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
    setEmail(email);
  };

  const handleVerificationCodeChange = (e) => {
    const verificationCode = e.target.value;
    if (isCodeSent && !verificationCode) {
      setVerificationCodeError("Verification code is required.");
    } else {
      setVerificationCodeError("");
    }
    setVerificationCode(verificationCode);
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (usernameError || passwordError || verificationCodeError) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/sendVerificationCode",
        { username, email, password }
      );
      if (response.status === 200) {
        setIsCodeSent(true);
        alert("Verification code sent to your email!");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      setErrorMessage(errorMsg);
      setIsCodeSent(false); // Hide the Send Code button if sending fails
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (usernameError || passwordError || verificationCodeError) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/checkVerificationCode",
        { username, email, password, verificationCode }
      );
      console.log(response);
      if (response.data === "인증이 성공했습니다.") {
        // if (response.data.verified === true) {
        setIsVerified(true);
        alert(response.data);
      } else {
        setIsVerified(false); // Verification fails
        setErrorMessage("Invalid verification code. Please try again.");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      ("Invalid verification code. Please try again.");
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
      setVerificationCodeError("");
    }
  };

  const onRegisterButtonClickHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (usernameError || passwordError || verificationCodeError) {
      setLoading(false);
      return;
    }

    const formData = { username, password, email, verificationCode };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/api/user/login");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
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
        <div>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <div className="error-text">
            {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
          </div>
        </div>

        <div>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <div className="error-text">
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
        </div>

        <div className="verify-box">
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button
            className="send-code-button"
            type="submit"
            disabled={loading || isCodeSent}
            style={{ marginLeft: "10px" }}
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
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              required
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
            onClick={onRegisterButtonClickHandler}
            type="button"
          >
            Register
          </button>
        )}
        <div className="error-text">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <div>
          <span>이미 계정이 있으신가요? </span>
          <Link className="move-link" to="/api/user/login">
            회원가입 하세요
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
