import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../pages/Login/Form.css";
import {
  registerUser,
  sendVerificationCode,
  verifyCode,
} from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const New = () => {
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
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

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
    let isValid = true;
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    setVerificationCodeError("");

    if (!formData.username) {
      setUsernameError("Username is required.");
      isValid = false;
    } else if (formData.username.length < 6) {
      setUsernameError("Username must be at least 6 characters.");
      isValid = false;
    }

    if (!formData.password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    }

    if (!formData.email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError("Email is not valid.");
      isValid = false;
    }

    if (isCodeSent && !formData.verificationCode) {
      setVerificationCodeError("Verification code is required.");
      isValid = false;
    }

    return isValid;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return; // Prevent submission if validation fails
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      alert("Registered successfully!");
      navigate("/api/user/login");
      setFormData({
        username: "",
        email: "",
        password: "",
        verificationCode: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage(
        reduxErrorMessage || "Registration failed, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Prevent sending code if validation fails
    }

    try {
      const response2 =await dispatch(sendVerificationCode(formData)).unwrap();
      console.log(response2);
        // if (response.status === 200) {
        //   setIsVerified(true);
        //   alert(response.data);
        // }
      setIsCodeSent(true);
      // alert("Verification code sent to your email!");
    } catch (error) {
      console.error("Error sending verification code:", error);
      setErrorMessage("Failed to send verification code.");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return; // Prevent verification if validation fails
    }

    try {
      const response = await dispatch(verifyCode(formData)).unwrap();
      if (response === "인증이 성공했습니다.") {
        alert("Verification successful!");
      } else {
        setErrorMessage("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Verification failed, please try again.");
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
        >
          <div>
            <input
              ref={usernameRef}
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
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
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
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
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
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
                name="verificationCode"
                placeholder="Enter verification code"
                value={formData.verificationCode}
                onChange={handleChange}
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
              회원가입 하세요
            </Link>
          </div>
        </form>
      </div> 
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     name="username"
    //     value={formData.username}
    //     onChange={handleChange}
    //     placeholder="Username"
    //   />
    //   {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}

    //   <input
    //     type="password"
    //     name="password"
    //     value={formData.password}
    //     onChange={handleChange}
    //     placeholder="Password"
    //   />
    //   {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

    //   <input
    //     type="email"
    //     name="email"
    //     value={formData.email}
    //     onChange={handleChange}
    //     placeholder="Email"
    //   />
    //   {emailError && <p style={{ color: "red" }}>{emailError}</p>}

    //   <button type="button" onClick={handleSendCode} disabled={loading}>
    //     Send Verification Code
    //   </button>

    //   {isCodeSent && (
    //     <>
    //       <input
    //         type="text"
    //         name="verificationCode"
    //         value={formData.verificationCode}
    //         onChange={handleChange}
    //         placeholder="Verification Code"
    //       />
    //       {verificationCodeError && (
    //         <p style={{ color: "red" }}>{verificationCodeError}</p>
    //       )}
    //       <button type="button" onClick={handleVerifyCode} disabled={loading}>
    //         Verify Code
    //       </button>
    //     </>
    //   )}

    //   <button type="submit" disabled={loading}>
    //     Register
    //   </button>
    //   {isError && <p style={{ color: "red" }}>{reduxErrorMessage}</p>}
    //   {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    //   <Link to="/api/user/login">Already have an account? Login here.</Link>
    // </form>
    
  );
};

export default New;
