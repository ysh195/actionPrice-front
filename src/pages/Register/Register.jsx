import React, { useState } from "react";

import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";

const Register = () => {
  const [verificationCode, setVerificationCode] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    verificationCode: "",
  });
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/sendVerificationCode",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.status === 200) {
        setIsCodeSent(true);
        alert("Verification code sent to your email!");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      alert("Failed to send verification code. Please try again.");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/checkVerificationCode",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          verificationCode: formData.verificationCode,
        }
      );

      if (response.status === 200) {
        setIsVerified(true);
        alert("Email verified successfully!");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("Invalid verification code. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("Please verify your email before submitting.");
      return;
    }
    try {
      // Replace with your registration API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/user/userRegisterForm",
        {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }
      );

      if (response.status === 201) {
        alert("Registration successful!");
        // Optionally reset the form or redirect the user
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  // const submit = async (e) => {
  //   e.preventDefault();
  //   await axios.post("http://localhost:8080/api/user/register", {
  //     username,
  //     email,
  //     password,
  //   });
  // };

  return (
    <div className="form">
      <h2 className="login-title">회원가입</h2>

      <form
        id="userRegisterForm"
        className="login-form"
        onSubmit={isCodeSent ? handleVerifyCode : handleSendCode}
      >
        <div>
          <input
            type="text"
            id="username"
            autoFocus
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            id="verification"
            name="verification code"
            placeholder="verification code"
            required
            onChange={(e) => setVerificationCode(e.target.value)}
            value={verificationCode}
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {isCodeSent && (
          <div>
            <label htmlFor="verificationCode">Verification Code:</label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn--form btn-login">
          {isCodeSent ? "Verify Code" : "Send Verification Code"}
        </button>
        {isVerified && (
          <div>
            <button
              className="btn btn--form btn-login"
              type="submit"
              onClick={handleSubmit}
            >
              회원가입
            </button>
          </div>
        )}
        <p className="have-account">
          이미 계정이 있으신가요?
          <Link className="move-link" to="/user/login">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
